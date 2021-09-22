import * as shajs from 'sha.js';
import { HASH_PARAM_DELIMETER } from '../constants';

/**
 * Hashes value using sha512 and encoding it using base64
 * @param value
 * @returns string base64 encoded hashed value
 */
const hashValue = (value: string): string => {
  if (!value) {
    return '';
  }
  const hashedValue = shajs('sha512').update(value).digest('hex');
  const buffer = Buffer.from(hashedValue, 'hex');
  return buffer.toString('base64');
};

/**
 * Creates hashed string from provided object using hashValue() function
 * @param object object of fields to hash
 * @returns
 */
const hashValueFromObject = (object: any = {}): string => {
  if (!object) {
    return '';
  }

  const objectString = Object.keys(object)
    .map((key: any) => object[key])
    .join(HASH_PARAM_DELIMETER);

  return hashValue(objectString);
};

export default {
  hashValue,
  hashValueFromObject,
};
