import { IMap, INormalizeError, PartialOptional, RazorpayPaginationOptions } from "./api";

export declare namespace Webhooks {
    interface RazorpayWebhookBaseRequestBody {
        /**
         * The URL where you receive the webhook payload when an event is triggered.
         */
        url: string;
        /**
         * This is the email address to which notifications must be sent in case of webhook failure.
         */
        alert_email?: string;
        /**
         * A secret for the webhook endpoint that is used to validate that the webhook is from Razorpay.
         */
        secret?: string;
        /**
         * The required events from the list of Active Events.
         */
        events: any;
        /**
         * Indicates the status of webhook.
         */
        active?: string;
      }

    interface RazorpayWebhookCreateRequestBody extends RazorpayWebhookBaseRequestBody { }

    interface RazorpayWebhookUpdateRequestBody extends RazorpayWebhookBaseRequestBody { }

    interface RazorpayWebhook extends RazorpayWebhookBaseRequestBody {
        /**
         * The unique identifier of the created webhook.
         */
        id: string;
        /**
         *  Indicates the type of entity
         */
        entity: string;
        /**
         * The unique identifier generated by Razorpay for the sub-merchant who will receive the webhooks. For example, in this case, it will be `account_id` passed in the API URL.
         */
        owner_id: string;
        owner_type: string;
        context: string[];
        disabled_at: number;
        service: boolean;
        /**
         * This attribute is set to `true` if a secret password has been set for the webhook endpoint. If no secret is sent in the request, this parameter does not appear in the response code.
         */
        secret_exists: boolean;
        /**
         * Unix timestamp, when the webhook was created.
         */
        created_at: number;
        updated_at: number;
    }
}

declare function webhooks(api: any): {
    /**
     * Creates a webhook
     *
     * @param params - Check [doc](https://razorpay.com/docs/api/partners/webhooks/#create-a-webhook) for required params
     * @param accountId - The unique identifier of the account. 
     */
    create(params: Webhooks.RazorpayWebhookCreateRequestBody, accountId?: string): Promise<Webhooks.RazorpayWebhook>
    create(params: Webhooks.RazorpayWebhookCreateRequestBody, accountId: string | null, callback: (err: INormalizeError | null, data: Webhooks.RazorpayWebhook) => void): void;
    /**
    * Fetches a webhook
    *
    * @param webhookId -  The unique identifier of the webhook whose details are to be retrieved.
    * @param accountId - The unique identifier of the account.
    *
    */
    fetch(webhookId:string, accountId: string): Promise<Webhooks.RazorpayWebhook>
    fetch(webhookId:string, accountId: string, callback: (err: INormalizeError | null, data: Webhooks.RazorpayWebhook) => void): void;
    /**
    * Fetch all webhooks
    *
    * @param accountId - The unique identifier of the account.
    * 
    */
     all(params?: RazorpayPaginationOptions, accountId?: string, ): Promise<{
        entity: string,
        items: Array<Webhooks.RazorpayWebhook>
    }>
    all(params: RazorpayPaginationOptions, accountId: string | null, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Webhooks.RazorpayWebhook>
    }) => void): void;        
    /**
    * Update an account
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/partners/webhooks/#update-a-webhook) for required params
    * @param webhookId - The unique identifier of the webhook whose details are to be retrieved.
    * @param accountId - The unique identifier of the account.
    */
    edit(params: Webhooks.RazorpayWebhookUpdateRequestBody, webhookId: string, accountId?: string, ): Promise<Webhooks.RazorpayWebhook>
    edit(params: Webhooks.RazorpayWebhookUpdateRequestBody, webhookId: string, accountId: string | null,  callback: (err: INormalizeError | null, data: Webhooks.RazorpayWebhook) => void): void;
    /**
    * Delete an webhook
    *
    * @param webhookId - The unique identifier of the webhook whose details are to be retrieved.
    * @param accountId - The unique identifier of the account.
    * 
    */
    delete(webhookId: string, accountId: string): Promise<[]>
    delete(webhookId: string, accountId: string, callback: (err: INormalizeError | null, data: []) => void): void;
}

export default webhooks