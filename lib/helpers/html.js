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
/**
 * Build HTML opening tag according to provided inputs.
 * @param tagName
 * @param attributes
 * @returns
 */
var tagOpen = function (tagName, attributes) {
    if (!tagName) {
        return '';
    }
    var html = "<" + tagName;
    if (attributes) {
        html += " " + buildAttributes(attributes);
    }
    html += '>';
    return html;
};
/**
 * Build HTML closing tag according to provided HTML tag name.
 * @param tagName
 * @returns
 */
var tagClose = function (tagName) {
    if (tagName) {
        return "</" + tagName + ">";
    }
    return '';
};
/**
 * Builds HTML for opening form tag. Shorcut for calling tagOpen with corresponding tag name
 * @param attributes
 * @returns
 */
var formOpen = function (attributes) {
    return tagOpen('form', attributes);
};
/**
 * Builds HTML for closing form tag. Shorcut for calling tagOpen with corresponding tag name
 * @returns
 */
var formClose = function () {
    return tagClose('form');
};
/**
 * Builds HTML input
 * @param attributes
 * @returns
 */
var input = function (attributes) {
    var html = '<input';
    if (attributes) {
        html += " " + buildAttributes(attributes);
    }
    html += ' />';
    return html;
};
/**
 * Calls self::input method. Builds hidden HTML input
 * @param attributes
 * @returns
 */
var hiddenInput = function (attributes) {
    if (attributes === void 0) { attributes = {}; }
    return input(__assign(__assign({}, attributes), { type: 'hidden' }));
};
/**
 * Concats provided array into readeable html attributes string.
 * @example From array of ['style'=>'color:white', 'title'=>'test'] creates resulting string style="color:white" title="test"
 * @param attributes
 * @returns
 */
var buildAttributes = function (attributes) {
    var stringAttributesArray = [];
    if (attributes) {
        stringAttributesArray = Object.keys(attributes).map(function (key) { return key + "=\"" + attributes[key] + "\""; });
    }
    return stringAttributesArray.join(' ');
};
exports.default = {
    tagOpen: tagOpen,
    tagClose: tagClose,
    formOpen: formOpen,
    formClose: formClose,
    input: input,
    hiddenInput: hiddenInput,
};
