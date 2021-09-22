import { ConfigOption } from './config';
import Strings from './string';
import Hasher from './hasher';

import { APPROVED_RESPONSE } from '../constants/response';
import { HASH_ALGORITHM_VER_2, HASH_PARAM_DELIMETER } from '../constants';

let error: any = null;

const getError = (): any => error;

const validateRequest = (config: ConfigOption = {}): boolean => {
  try {
    if (!config?.clientId) {
      throw Error('Client ID is not set');
    }
    if (!config?.storeKey) {
      throw Error('Store Key is not set');
    }
    if (!config?.orderId) {
      throw Error('Order ID is not set');
    }
    if (!config?.orderAmount) {
      throw Error('Order Amount is not set');
    }
  } catch (err: any) {
    error = err.message;
    return false;
  }

  return true;
};

const validateResponse = (response: any = {}, config: ConfigOption = {}): boolean => {
  const validateResponseParams = (requiredParams: any, responseData: any): boolean => {
    requiredParams.forEach((parameter: string): any => {
      if (!responseData[parameter]) {
        if (parameter === 'oid' && !responseData?.ReturnOid) {
          throw new Error('Missing required parameter "oid / ReturnOid" in response');
        } else {
          throw new Error(`Missing required parameter "${parameter}" in response`);
        }
      }
    });

    return true;
  };

  const validateHashValue = (responseData: any): boolean => {
    if (
      !(responseData?.HASHPARAMS && responseData?.HASHPARAMSVAL && responseData?.HASH && responseData?.hashAlgorithm)
    ) {
      throw new Error('Missing one of hash parameters. [HASHPARAMS, HASHPARAMSVAL, HASH, hashAlgorithm]');
    }

    const hashParams: string = responseData?.HASHPARAMS;
    const hashParam: string = responseData?.HASH;
    let hashParamsVal: string = responseData?.HASHPARAMSVAL;

    let paramsVal = '';
    let escapedStoreKey = '';
    let hashVal = '';
    let hash = '';

    if (responseData?.hashAlgorithm === HASH_ALGORITHM_VER_2) {
      const parsedHashParams: string[] = hashParams.split(HASH_PARAM_DELIMETER);

      parsedHashParams.forEach((parsedHashParam: string) => {
        if (!responseData[parsedHashParam]) {
          paramsVal += HASH_PARAM_DELIMETER;
          return true;
        }

        paramsVal = paramsVal + Strings.replaceSpecialChars(responseData[parsedHashParam] || '') + HASH_PARAM_DELIMETER;
      });

      escapedStoreKey = Strings.replaceSpecialChars(config?.storeKey);
      hashVal = paramsVal + escapedStoreKey;
      hash = Hasher.hashValue(hashVal);
    }

    hashParamsVal += HASH_PARAM_DELIMETER + escapedStoreKey;

    if (hashVal === hashParamsVal && hashParam === hash) {
      return true;
    }

    return false;
  };

  const validateStatusCode = (responseData: any): boolean => {
    const mdStatus = +responseData?.mdStatus || 0;
    const procReturnCode: string = responseData?.ProcReturnCode;

    if (
      mdStatus === 1 ||
      mdStatus === 2 ||
      mdStatus === 3 ||
      mdStatus === 4 ||
      (!mdStatus && procReturnCode === '00')
    ) {
      if (responseData?.Response && responseData?.Response === APPROVED_RESPONSE) {
        return true;
      }
    }

    if (responseData?.ErrMsg) {
      error = responseData?.ErrMsg;
    }

    return false;
  };

  try {
    if (!validateResponseParams(['clientid', 'oid', 'Response'], response)) {
      throw new Error('The digital signature is not valid. Required Paramaters are missing');
    }

    if (response?.clientid !== config?.clientId) {
      throw new Error('Incorrect Client Id');
    }

    if (!validateHashValue(response)) {
      throw new Error('Incorrect hash value');
    }

    if (!validateStatusCode(response)) {
      throw new Error('Incorect status code: ' + getError());
    }
  } catch (err: any) {
    error = err.message;
    return false;
  }

  return true;
};

export default {
  validateRequest,
  validateResponse,
  getError,
};
