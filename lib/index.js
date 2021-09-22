"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./helpers/config");
var hasher_1 = require("./helpers/hasher");
var string_1 = require("./helpers/string");
var html_1 = require("./helpers/html");
var validator_1 = require("./helpers/validator");
var transactionType_1 = require("./helpers/transactionType");
var language_1 = require("./helpers/language");
var storeType_1 = require("./helpers/storeType");
var constants_1 = require("./constants");
var VubEcard = /** @class */ (function () {
    /**
     * Initialize VubEcard
     * @param clientId
     * @param storeKey
     * @param options
     */
    function VubEcard(clientId, storeKey, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.config = {};
        this.error = '';
        /**
         * Returs clientsId
         * @returns string clientId
         */
        this.getClientId = function () {
            return _this.config.get('clientId');
        };
        /**
         * Returns storeKey
         * @returns string storeKey
         */
        this.getStoreKey = function () {
            return _this.config.get('storeKey');
        };
        /**
         * returns rror message from validator
         * @returns string
         */
        this.getError = function () { return _this.error; };
        /**
         * Sets order ID and total order price to VubEcard object
         * @param orderId
         * @param orderAmount
         */
        this.setOrder = function (orderId, orderAmount) {
            if (orderId) {
                _this.config.set('orderId', orderId);
            }
            if (orderAmount) {
                _this.config.set('orderAmount', Math.abs(orderAmount));
            }
        };
        /**
         * Sets callback url to redirect to after successfull payment
         * @param url
         */
        this.setCallbackSuccessUrl = function (url) {
            if (!string_1.default.validateUrl(url)) {
                throw Error('Callback success url is invalid');
            }
            _this.config.set('callbackSuccessUrl', url);
        };
        /**
         * Sets callback url to redirect to when some error occures while payment
         * @param url
         */
        this.setCallbackErrorUrl = function (url) {
            if (!string_1.default.validateUrl(url)) {
                throw Error('Callback error url is invalid');
            }
            _this.config.set('callbackErrorUrl', url);
        };
        /**
         * Returns object o fields and their values needed for hash calculation
         * @returns object
         */
        this.generatePlainHashObject = function () {
            var hashObject = {};
            var configHashFields = [
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
                '|',
                'currency',
                'storeKey',
            ];
            configHashFields.forEach(function (fieldName) {
                hashObject[fieldName] = string_1.default.replaceSpecialChars(_this.config.get(fieldName) || '');
            });
            return hashObject;
        };
        /**
         * Validates if required option values are provided
         * @param config config value
         */
        this.validate = function () {
            var config = _this.config.get();
            var isValid = validator_1.default.validateRequest(config);
            _this.error = validator_1.default.getError();
            return isValid;
        };
        /**
         * Returns gateway URL based enviroment (production/test)
         * @returns string
         */
        this.getGatewayUrl = function () {
            if (_this.config.get('test')) {
                return constants_1.GATEWAY_TEST_URL;
            }
            return constants_1.GATEWAY_URL;
        };
        /**
         * Validate response data
         * @param responseData
         * @returns boolean
         */
        this.validateResponse = function (responseData) {
            if (responseData === void 0) { responseData = {}; }
            var config = _this.config.get();
            var isValid = validator_1.default.validateResponse(responseData, config);
            _this.error = validator_1.default.getError();
            return isValid;
        };
        /**
         * Generates hidden inputs for payment form
         * @param optionalHiddenInputsAttributes array of objects representing input attributes
         * @returns
         */
        this.generateHiddenInputs = function (optionalHiddenInputsAttributes) {
            var hiddenInputs = [
                { name: 'encoding', value: 'utf-8', type: 'text' },
                { name: 'hash', value: hasher_1.default.hashValueFromObject(_this.generatePlainHashObject()) },
                { name: 'hashAlgorithm', value: _this.config.get('hashAlgorithm', constants_1.HASH_ALGORITHM_VER_2) },
            ];
            var inputConfigNameToValue = {
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
            Object.keys(inputConfigNameToValue).forEach(function (key) {
                return hiddenInputs.push({ name: key, value: _this.config.get(inputConfigNameToValue[key], '') });
            });
            if (optionalHiddenInputsAttributes) {
                optionalHiddenInputsAttributes.forEach(function (inputAttributes) {
                    if ((inputAttributes === null || inputAttributes === void 0 ? void 0 : inputAttributes.name) && (inputAttributes === null || inputAttributes === void 0 ? void 0 : inputAttributes.value)) {
                        hiddenInputs.push(__assign({}, inputAttributes));
                    }
                });
            }
            var inputStrig = '';
            hiddenInputs.forEach(function (inputAttributes) {
                inputStrig += html_1.default.hiddenInput(inputAttributes);
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
        this.generateForm = function (optionalHiddenInputsAttributes, formHtmlAttributes, buttonHtmlAttributes) {
            if (formHtmlAttributes === void 0) { formHtmlAttributes = {}; }
            if (buttonHtmlAttributes === void 0) { buttonHtmlAttributes = {}; }
            _this.validate();
            var form = '';
            form += html_1.default.formOpen(__assign({ method: 'POST', action: _this.getGatewayUrl() }, formHtmlAttributes));
            form += _this.generateHiddenInputs(optionalHiddenInputsAttributes);
            form += html_1.default.input(__assign({ type: 'submit', value: 'Objednaj' }, buttonHtmlAttributes));
            form += html_1.default.formClose();
            return form;
        };
        this.config = new config_1.default(__assign(__assign({}, options), { clientId: clientId, storeKey: storeKey, rnd: string_1.default.random(20) }));
        if (!this.config.get('currency')) {
            this.config.set('currency', constants_1.DEFAULT_CURRENCY_CODE);
        }
        if (!this.config.get('transactionType')) {
            this.config.set('transactionType', transactionType_1.default.getDefault());
        }
        if (!this.config.get('language')) {
            this.config.set('language', language_1.default.getDefault());
        }
        if (!this.config.get('storeType')) {
            this.config.set('storeType', storeType_1.default.getDefault());
        }
    }
    return VubEcard;
}());
exports.default = VubEcard;
