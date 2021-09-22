"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shajs = require("sha.js");
var constants_1 = require("../constants");
/**
 * Hashes value using sha512 and encoding it using base64
 * @param value
 * @returns string base64 encoded hashed value
 */
var hashValue = function (value) {
    if (!value) {
        return '';
    }
    var hashedValue = shajs('sha512').update(value).digest('hex');
    var buffer = Buffer.from(hashedValue, 'hex');
    return buffer.toString('base64');
};
/**
 * Creates hashed string from provided object using hashValue() function
 * @param object object of fields to hash
 * @returns
 */
var hashValueFromObject = function (object) {
    if (object === void 0) { object = {}; }
    if (!object) {
        return '';
    }
    var objectString = Object.keys(object)
        .map(function (key) { return object[key]; })
        .join(constants_1.HASH_PARAM_DELIMETER);
    console.log(objectString);
    return hashValue(objectString);
};
exports.default = {
    hashValue: hashValue,
    hashValueFromObject: hashValueFromObject,
};
