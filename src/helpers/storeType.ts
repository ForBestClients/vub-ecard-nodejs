export enum StoreTypes {
  PayHosting = 'pay_hosting',
  Secure3DPay = '3d_pay',
  Secure3D = '3d',
  Secure3DPayHosting = '3d_pay_hosting',
}

/**
 * Returns default store type
 * @returns string 3d_pay_hosting
 */
const getDefault = (): StoreTypes => {
  return StoreTypes.Secure3DPayHosting;
};

export default {
  getDefault,
};
