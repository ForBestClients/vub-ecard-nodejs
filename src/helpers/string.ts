/**
 * Replacing special characters from input value. Special chars are "\" and "|"
 *
 * @param string value
 * @return string value Cleared from special chars
 */
const replaceSpecialChars = (value: string): string => {
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
const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/){1}' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(url);
};

/**
 * Generates random string of provided length
 * @param length
 * @returns string random string
 */
const random = (length: number = 10): string => {
  let stringLength: number = length;
  if (stringLength < 1) {
    stringLength = 10;
  }

  const chars: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  return [...Array(stringLength)].map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default {
  replaceSpecialChars,
  validateUrl,
  random,
};
