# Installation
> `npm install --save @types/imagemin`

# Summary
This package contains type definitions for imagemin (https://github.com/imagemin/imagemin#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/imagemin.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/imagemin/index.d.ts)
````ts
// Type definitions for imagemin 8.0
// Project: https://github.com/imagemin/imagemin#readme
// Definitions by: Romain Faust <https://github.com/romain-faust>
//                 Jeff Chan <https://github.com/hkjeffchan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

/**
 * @async
 */
declare function imagemin(input: ReadonlyArray<string>, options?: Options): Promise<Result[]>;

declare namespace imagemin {
    /**
     * @async
     */
    function buffer(input: Buffer, options?: BufferOptions): Promise<Buffer>;
}

export type Plugin = (input: Buffer) => Promise<Buffer>;

export interface Options {
    destination?: string | undefined;
    plugins: ReadonlyArray<Plugin>;
    glob?: boolean | undefined;
}

export interface Result {
    data: Buffer;
    sourcePath: string;
    destinationPath: string;
}

export interface BufferOptions {
    plugins: ReadonlyArray<Plugin>;
}

export default imagemin;

````

### Additional Details
 * Last updated: Wed, 08 Feb 2023 19:03:02 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)
 * Global values: none

# Credits
These definitions were written by [Romain Faust](https://github.com/romain-faust), and [Jeff Chan](https://github.com/hkjeffchan).
