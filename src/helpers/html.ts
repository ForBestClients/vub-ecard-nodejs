export interface HtmlAttributes {
  [index: string]: string | undefined;
}

export interface InputAttributes extends HtmlAttributes {
  name: string;
  value: string;
}

/**
 * Build HTML opening tag according to provided inputs.
 * @param tagName
 * @param attributes
 * @returns
 */
const tagOpen = (tagName: string, attributes?: HtmlAttributes): string => {
  if (!tagName) {
    return '';
  }

  let html = `<${tagName}`;
  if (attributes) {
    html += ` ${buildAttributes(attributes)}`;
  }
  html += '>';

  return html;
};

/**
 * Build HTML closing tag according to provided HTML tag name.
 * @param tagName
 * @returns
 */
const tagClose = (tagName: string): string => {
  if (tagName) {
    return `</${tagName}>`;
  }

  return '';
};

/**
 * Builds HTML for opening form tag. Shorcut for calling tagOpen with corresponding tag name
 * @param attributes
 * @returns
 */
const formOpen = (attributes?: HtmlAttributes): string => {
  return tagOpen('form', attributes);
};

/**
 * Builds HTML for closing form tag. Shorcut for calling tagOpen with corresponding tag name
 * @returns
 */
const formClose = (): string => {
  return tagClose('form');
};

/**
 * Builds HTML input
 * @param attributes
 * @returns
 */
const input = (attributes?: HtmlAttributes): string => {
  let html = '<input';
  if (attributes) {
    html += ` ${buildAttributes(attributes)}`;
  }
  html += ' />';

  return html;
};

/**
 * Calls self::input method. Builds hidden HTML input
 * @param attributes
 * @returns
 */
const hiddenInput = (attributes: HtmlAttributes = {}): string => {
  return input({ ...attributes, ...{ type: 'hidden' } });
};

/**
 * Concats provided array into readeable html attributes string.
 * @example From array of ['style'=>'color:white', 'title'=>'test'] creates resulting string style="color:white" title="test"
 * @param attributes
 * @returns
 */
const buildAttributes = (attributes?: HtmlAttributes): string => {
  let stringAttributesArray: string[] = [];

  if (attributes) {
    stringAttributesArray = Object.keys(attributes).map((key) => `${key}="${attributes[key]}"`);
  }

  return stringAttributesArray.join(' ');
};

export default {
  tagOpen,
  tagClose,
  formOpen,
  formClose,
  input,
  hiddenInput,
};
