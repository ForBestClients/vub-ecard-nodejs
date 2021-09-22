"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
var Languages;
(function (Languages) {
    Languages["SK"] = "sk";
    Languages["EN"] = "en";
})(Languages = exports.Languages || (exports.Languages = {}));
/**
 * Returns default language
 * @returns string sk
 */
var getDefault = function () {
    return Languages.SK;
};
exports.default = {
    getDefault: getDefault,
};
