import Hasher from '../hasher';

test('hash value', () => {
  const hashedValue = Hasher.hashValue('testvalue');
  expect(hashedValue).toBe('VIAy4+Ea741kt0Ngjnqf6TAFC3vI0ysc//+UmgB119erxunk29u0j3pUZiinSFflP2w+iQ65W97DKJF83RjL2w==');
});

test('hash value from object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  };
  expect(Hasher.hashValueFromObject(obj)).toBe(
    'MtcTzObxK5aFs881dW/8jEfTjg0oW8gS/x173UaT35l7NTRzQadMs61SlSujiMFyL/Qlj4DpjmXwJlkUbvormA==',
  );
});
