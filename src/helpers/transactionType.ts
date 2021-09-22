export enum TransactionTypes {
  Auth = 'Auth',
  PreAuth = 'PreAuth',
}

/**
 * Returns default transaction type
 * @returns string Auth
 */
const getDefault = (): TransactionTypes => {
  return TransactionTypes.Auth;
};

export default {
  getDefault,
};
