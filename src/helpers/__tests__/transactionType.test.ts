import TransactionType, { TransactionTypes } from '../transactionType';

test('default value', () => {
  expect(TransactionType.getDefault()).toBe(TransactionTypes.Auth);
});
