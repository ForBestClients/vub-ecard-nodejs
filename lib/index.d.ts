import { ConfigOption } from './helpers/config';
import { HtmlAttributes, InputAttributes } from './helpers/html';
declare class VubEcard {
    config: ConfigOption;
    error: string;
    /**
     * Initialize VubEcard
     * @param clientId
     * @param storeKey
     * @param options
     */
    constructor(clientId: string, storeKey: string, options?: ConfigOption);
    /**
     * Returs clientsId
     * @returns string clientId
     */
    getClientId: () => ConfigOption;
    /**
     * Returns storeKey
     * @returns string storeKey
     */
    getStoreKey: () => ConfigOption;
    /**
     * returns rror message from validator
     * @returns string
     */
    getError: () => string;
    /**
     * Sets order ID and total order price to VubEcard object
     * @param orderId
     * @param orderAmount
     */
    setOrder: (orderId: string, orderAmount: number) => void;
    /**
     * Sets callback url to redirect to after successfull payment
     * @param url
     */
    setCallbackSuccessUrl: (url: string) => void;
    /**
     * Sets callback url to redirect to when some error occures while payment
     * @param url
     */
    setCallbackErrorUrl: (url: string) => void;
    /**
     * Returns object o fields and their values needed for hash calculation
     * @returns object
     */
    generatePlainHashObject: () => any;
    /**
     * Validates if required option values are provided
     * @param config config value
     */
    validate: () => boolean;
    /**
     * Returns gateway URL based enviroment (production/test)
     * @returns string
     */
    getGatewayUrl: () => string;
    /**
     * Validate response data
     * @param responseData
     * @returns boolean
     */
    validateResponse: (responseData?: any) => boolean;
    /**
     * Generates hidden inputs for payment form
     * @param optionalHiddenInputsAttributes array of objects representing input attributes
     * @returns
     */
    generateHiddenInputs: (optionalHiddenInputsAttributes?: InputAttributes[] | undefined) => string;
    /**
     * Generates payment form
     * @param optionalHiddenInputsAttributes
     * @param formHtmlAttributes
     * @param buttonHtmlAttributes
     * @returns
     */
    generateForm: (optionalHiddenInputsAttributes?: InputAttributes[] | undefined, formHtmlAttributes?: HtmlAttributes, buttonHtmlAttributes?: HtmlAttributes) => string;
}
export default VubEcard;
