"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replacing special characters from input value. Special chars are "\" and "|"
 *
 * @param string value
 * @return string value Cleared from special chars
 */
var replaceSpecialChars = function (value) {
    if (typeof value === 'string') {
        return value.replace('\\', '\\\\').replace('|', '\\|');
    }
    return value;
};
/**
 * Validates if provided url is url
 * @param string url
 * @returns boolean true|false
 */
var validateUrl = function (url) {
    var pattern = new RegExp('^(https?:\\/\\/){1}' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
};
/**
 * Generates random string of provided length
 * @param length
 * @returns string random string
 */
var random = function (length) {
    if (length === void 0) { length = 10; }
    var stringLength = length;
    if (stringLength < 1) {
        stringLength = 10;
    }
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    return __spreadArray([], Array(stringLength), true).map(function () { return chars[Math.floor(Math.random() * chars.length)]; }).join('');
};
exports.default = {
    replaceSpecialChars: replaceSpecialChars,
    validateUrl: validateUrl,
    random: random,
};
