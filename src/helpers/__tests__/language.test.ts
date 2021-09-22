import Language, { Languages } from '../language';

test('default value', () => {
  expect(Language.getDefault()).toBe(Languages.SK);
});
