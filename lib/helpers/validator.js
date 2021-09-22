"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("./string");
var hasher_1 = require("./hasher");
var response_1 = require("../constants/response");
var constants_1 = require("../constants");
var error = null;
var getError = function () { return error; };
var validateRequest = function (config) {
    if (config === void 0) { config = {}; }
    try {
        if (!(config === null || config === void 0 ? void 0 : config.clientId)) {
            throw Error('Client ID is not set');
        }
        if (!(config === null || config === void 0 ? void 0 : config.storeKey)) {
            throw Error('Store Key is not set');
        }
        if (!(config === null || config === void 0 ? void 0 : config.orderId)) {
            throw Error('Order ID is not set');
        }
        if (!(config === null || config === void 0 ? void 0 : config.orderAmount)) {
            throw Error('Order Amount is not set');
        }
    }
    catch (err) {
        error = err.message;
        return false;
    }
    return true;
};
var validateResponse = function (response, config) {
    if (response === void 0) { response = {}; }
    if (config === void 0) { config = {}; }
    var validateResponseParams = function (requiredParams, responseData) {
        requiredParams.forEach(function (parameter) {
            if (!responseData[parameter]) {
                if (parameter === 'oid' && !(responseData === null || responseData === void 0 ? void 0 : responseData.ReturnOid)) {
                    throw new Error('Missing required parameter "oid / ReturnOid" in response');
                }
                else {
                    throw new Error("Missing required parameter \"" + parameter + "\" in response");
                }
            }
        });
        return true;
    };
    var validateHashValue = function (responseData) {
        if (!((responseData === null || responseData === void 0 ? void 0 : responseData.HASHPARAMS) && (responseData === null || responseData === void 0 ? void 0 : responseData.HASHPARAMSVAL) && (responseData === null || responseData === void 0 ? void 0 : responseData.HASH) && (responseData === null || responseData === void 0 ? void 0 : responseData.hashAlgorithm))) {
            throw new Error('Missing one of hash parameters. [HASHPARAMS, HASHPARAMSVAL, HASH, hashAlgorithm]');
        }
        var hashParams = responseData === null || responseData === void 0 ? void 0 : responseData.HASHPARAMS;
        var hashParam = responseData === null || responseData === void 0 ? void 0 : responseData.HASH;
        var hashParamsVal = responseData === null || responseData === void 0 ? void 0 : responseData.HASHPARAMSVAL;
        var paramsVal = '';
        var escapedStoreKey = '';
        var hashVal = '';
        var hash = '';
        if ((responseData === null || responseData === void 0 ? void 0 : responseData.hashAlgorithm) === constants_1.HASH_ALGORITHM_VER_2) {
            var parsedHashParams = hashParams.split(constants_1.HASH_PARAM_DELIMETER);
            parsedHashParams.forEach(function (parsedHashParam) {
                if (!responseData[parsedHashParam]) {
                    paramsVal += constants_1.HASH_PARAM_DELIMETER;
                    return true;
                }
                paramsVal = paramsVal + string_1.default.replaceSpecialChars(responseData[parsedHashParam] || '') + constants_1.HASH_PARAM_DELIMETER;
            });
            escapedStoreKey = string_1.default.replaceSpecialChars(config === null || config === void 0 ? void 0 : config.storeKey);
            hashVal = paramsVal + escapedStoreKey;
            hash = hasher_1.default.hashValue(hashVal);
        }
        hashParamsVal += constants_1.HASH_PARAM_DELIMETER + escapedStoreKey;
        if (hashVal === hashParamsVal && hashParam === hash) {
            return true;
        }
        return false;
    };
    var validateStatusCode = function (responseData) {
        var mdStatus = +(responseData === null || responseData === void 0 ? void 0 : responseData.mdStatus) || 0;
        var procReturnCode = responseData === null || responseData === void 0 ? void 0 : responseData.ProcReturnCode;
        if (mdStatus === 1 ||
            mdStatus === 2 ||
            mdStatus === 3 ||
            mdStatus === 4 ||
            (!mdStatus && procReturnCode === '00')) {
            if ((responseData === null || responseData === void 0 ? void 0 : responseData.Response) && (responseData === null || responseData === void 0 ? void 0 : responseData.Response) === response_1.APPROVED_RESPONSE) {
                return true;
            }
        }
        if (responseData === null || responseData === void 0 ? void 0 : responseData.ErrMsg) {
            error = responseData === null || responseData === void 0 ? void 0 : responseData.ErrMsg;
        }
        return false;
    };
    try {
        if (!validateResponseParams(['clientid', 'oid', 'Response'], response)) {
            throw new Error('The digital signature is not valid. Required Paramaters are missing');
        }
        if ((response === null || response === void 0 ? void 0 : response.clientid) !== (config === null || config === void 0 ? void 0 : config.clientId)) {
            throw new Error('Incorrect Client Id');
        }
        if (!validateHashValue(response)) {
            throw new Error('Incorrect hash value');
        }
        if (!validateStatusCode(response)) {
            throw new Error('Incorect status code: ' + getError());
        }
    }
    catch (err) {
        error = err.message;
        return false;
    }
    return true;
};
exports.default = {
    validateRequest: validateRequest,
    validateResponse: validateResponse,
    getError: getError,
};
