import Config, { ConfigOption } from './helpers/config';
import Hasher from './helpers/hasher';
import Strings from './helpers/string';
import Html, { HtmlAttributes, InputAttributes } from './helpers/html';
import Validator from './helpers/validator';
import TransactionType from './helpers/transactionType';
import Language from './helpers/language';
import StoreType from './helpers/storeType';

import { DEFAULT_CURRENCY_CODE, GATEWAY_TEST_URL, GATEWAY_URL, HASH_ALGORITHM_VER_2 } from './constants';

class VubEcard {
  config: ConfigOption = {};
  error = '';
  /**
   * Initialize VubEcard
   * @param clientId
   * @param storeKey
   * @param options
   */
  constructor(clientId: string, storeKey: string, options: ConfigOption = {}) {
    this.config = new Config({ ...options, ...{ clientId, storeKey, rnd: Strings.random(20) } });

    if (!this.config.get('currency')) {
      this.config.set('currency', DEFAULT_CURRENCY_CODE);
    }

    if (!this.config.get('transactionType')) {
      this.config.set('transactionType', TransactionType.getDefault());
    }

    if (!this.config.get('language')) {
      this.config.set('language', Language.getDefault());
    }

    if (!this.config.get('storeType')) {
      this.config.set('storeType', StoreType.getDefault());
    }
  }
  /**
   * Returs clientsId
   * @returns string clientId
   */
  getClientId = (): ConfigOption => {
    return this.config.get('clientId');
  };
  /**
   * Returns storeKey
   * @returns string storeKey
   */
  getStoreKey = (): ConfigOption => {
    return this.config.get('storeKey');
  };
  /**
   * returns rror message from validator
   * @returns string
   */
  getError = (): string => this.error;
  /**
   * Sets order ID and total order price to VubEcard object
   * @param orderId
   * @param orderAmount
   */
  setOrder = (orderId: string, orderAmount: number): void => {
    if (orderId) {
      this.config.set('orderId', orderId);
    }

    if (orderAmount) {
      this.config.set('orderAmount', Math.abs(orderAmount));
    }
  };
  /**
   * Sets callback url to redirect to after successfull payment
   * @param url
   */
  setCallbackSuccessUrl = (url: string): void => {
    if (!Strings.validateUrl(url)) {
      throw Error('Callback success url is invalid');
    }

    this.config.set('callbackSuccessUrl', url);
  };
  /**
   * Sets callback url to redirect to when some error occures while payment
   * @param url
   */
  setCallbackErrorUrl = (url: string): void => {
    if (!Strings.validateUrl(url)) {
      throw Error('Callback error url is invalid');
    }

    this.config.set('callbackErrorUrl', url);
  };
  /**
   * Returns object o fields and their values needed for hash calculation
   * @returns object
   */
  generatePlainHashObject = (): any => {
    const hashObject: any = {};
    const configHashFields = [
      'clientId',
      'orderId',
      'orderAmount',
      'callbackSuccessUrl',
      'callbackErrorUrl',
      'transactionType',
      'instalment',
      'rnd',
      'msAuthType',
      'msKey',
      '|', // will be replaced by "|"
      'currency',
      'storeKey',
    ];
    configHashFields.forEach((fieldName) => {
      hashObject[fieldName] = Strings.replaceSpecialChars(this.config.get(fieldName) || '');
    });
    return hashObject;
  };
  /**
   * Validates if required option values are provided
   * @param config config value
   */
  validate = (): boolean => {
    const config = this.config.get();
    const isValid = Validator.validateRequest(config);

    this.error = Validator.getError();

    return isValid;
  };
  /**
   * Returns gateway URL based enviroment (production/test)
   * @returns string
   */
  getGatewayUrl = (): string => {
    if (this.config.get('test')) {
      return GATEWAY_TEST_URL;
    }

    return GATEWAY_URL;
  };
  /**
   * Validate response data
   * @param responseData
   * @returns boolean
   */
  validateResponse = (responseData: any = {}): boolean => {
    const config = this.config.get();
    const isValid = Validator.validateResponse(responseData, config);

    this.error = Validator.getError();

    return isValid;
  };
  /**
   * Generates hidden inputs for payment form
   * @param optionalHiddenInputsAttributes array of objects representing input attributes
   * @returns
   */
  generateHiddenInputs = (optionalHiddenInputsAttributes?: InputAttributes[]) => {
    const hiddenInputs = [
      { name: 'encoding', value: 'utf-8', type: 'text' },
      { name: 'hash', value: Hasher.hashValueFromObject(this.generatePlainHashObject()) },
      { name: 'hashAlgorithm', value: this.config.get('hashAlgorithm', HASH_ALGORITHM_VER_2) },
    ];

    const inputConfigNameToValue: { [index: string]: string } = {
      clientid: 'clientId',
      amount: 'orderAmount',
      oid: 'orderId',
      okUrl: 'callbackSuccessUrl',
      failUrl: 'callbackErrorUrl',
      trantype: 'transactionType',
      instalment: 'instalment',
      currency: 'currency',
      rnd: 'rnd',
      storetype: 'storeType',
      lang: 'language',
    };

    Object.keys(inputConfigNameToValue).forEach((key) =>
      hiddenInputs.push({ name: key, value: this.config.get(inputConfigNameToValue[key], '') }),
    );

    if (optionalHiddenInputsAttributes) {
      optionalHiddenInputsAttributes.forEach((inputAttributes) => {
        if (inputAttributes?.name && inputAttributes?.value) {
          hiddenInputs.push({ ...inputAttributes });
        }
      });
    }

    let inputStrig = '';
    hiddenInputs.forEach((inputAttributes) => {
      inputStrig += Html.hiddenInput(inputAttributes);
    });

    return inputStrig;
  };
  /**
   * Generates payment form
   * @param optionalHiddenInputsAttributes
   * @param formHtmlAttributes
   * @param buttonHtmlAttributes
   * @returns
   */
  generateForm = (
    optionalHiddenInputsAttributes?: InputAttributes[],
    formHtmlAttributes: HtmlAttributes = {},
    buttonHtmlAttributes: HtmlAttributes = {},
  ) => {
    this.validate();
    let form = '';
    form += Html.formOpen({ ...{ method: 'POST', action: this.getGatewayUrl() }, ...formHtmlAttributes });
    form += this.generateHiddenInputs(optionalHiddenInputsAttributes);
    form += Html.input({ ...{ type: 'submit', value: 'Objednaj' }, ...buttonHtmlAttributes });
    form += Html.formClose();

    return form;
  };
}

export default VubEcard;
