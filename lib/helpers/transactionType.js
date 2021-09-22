"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypes = void 0;
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes["Auth"] = "Auth";
    TransactionTypes["PreAuth"] = "PreAuth";
})(TransactionTypes = exports.TransactionTypes || (exports.TransactionTypes = {}));
/**
 * Returns default transaction type
 * @returns string Auth
 */
var getDefault = function () {
    return TransactionTypes.Auth;
};
exports.default = {
    getDefault: getDefault,
};
