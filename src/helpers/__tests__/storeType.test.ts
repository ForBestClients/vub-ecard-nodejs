import StoreType, { StoreTypes } from '../storeType';

test('default value', () => {
  expect(StoreType.getDefault()).toBe(StoreTypes.Secure3DPayHosting);
});
