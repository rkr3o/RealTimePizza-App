"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WT = void 0;
const transport_js_1 = require("../transport.js");
const websocket_constructor_js_1 = require("./websocket-constructor.js");
const engine_io_parser_1 = require("engine.io-parser");
const debug_1 = __importDefault(require("debug")); // debug()
const debug = (0, debug_1.default)("engine.io-client:webtransport"); // debug()
function shouldIncludeBinaryHeader(packet, encoded) {
    // 48 === "0".charCodeAt(0) (OPEN packet type)
    // 54 === "6".charCodeAt(0) (NOOP packet type)
    return (packet.type === "message" &&
        typeof packet.data !== "string" &&
        encoded[0] >= 48 &&
        encoded[0] <= 54);
}
class WT extends transport_js_1.Transport {
    get name() {
        return "webtransport";
    }
    doOpen() {
        // @ts-ignore
        if (typeof WebTransport !== "function") {
            return;
        }
        // @ts-ignore
        this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        this.transport.closed
            .then(() => {
            debug("transport closed gracefully");
            this.onClose();
        })
            .catch((err) => {
            debug("transport closed due to %s", err);
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then((stream) => {
                const reader = stream.readable.getReader();
                this.writer = stream.writable.getWriter();
                let binaryFlag;
                const read = () => {
                    reader
                        .read()
                        .then(({ done, value }) => {
                        if (done) {
                            debug("session is closed");
                            return;
                        }
                        debug("received chunk: %o", value);
                        if (!binaryFlag && value.byteLength === 1 && value[0] === 54) {
                            binaryFlag = true;
                        }
                        else {
                            // TODO expose binarytype
                            this.onPacket((0, engine_io_parser_1.decodePacketFromBinary)(value, binaryFlag, "arraybuffer"));
                            binaryFlag = false;
                        }
                        read();
                    })
                        .catch((err) => {
                        debug("an error occurred while reading: %s", err);
                    });
                };
                read();
                const handshake = this.query.sid ? `0{"sid":"${this.query.sid}"}` : "0";
                this.writer
                    .write(new TextEncoder().encode(handshake))
                    .then(() => this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, engine_io_parser_1.encodePacketToBinary)(packet, (data) => {
                if (shouldIncludeBinaryHeader(packet, data)) {
                    debug("writing binary header");
                    this.writer.write(Uint8Array.of(54));
                }
                debug("writing chunk: %o", data);
                this.writer.write(data).then(() => {
                    if (lastPacket) {
                        (0, websocket_constructor_js_1.nextTick)(() => {
                            this.writable = true;
                            this.emitReserved("drain");
                        }, this.setTimeoutFn);
                    }
                });
            });
        }
    }
    doClose() {
        var _a;
        (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.WT = WT;
