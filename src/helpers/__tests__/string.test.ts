import Strings from '../string';

describe('replace special chars', () => {
  test('string without special chars', () => {
    const value = Strings.replaceSpecialChars('test');
    expect(value).toBe('test');
  });

  test('string with special char', () => {
    const value = Strings.replaceSpecialChars('test|string');
    expect(value).toBe('test\\|string');
  });

  test('string with special char', () => {
    const value = Strings.replaceSpecialChars('test\\string');
    expect(value).toBe('test\\\\string');
  });

  test('string with multiple special char', () => {
    const value = Strings.replaceSpecialChars('test\\long|string');
    expect(value).toBe('test\\\\long\\|string');
  });
});

describe('url format validation', () => {
  test('valid https url', () => {
    expect(Strings.validateUrl('https://www.forbestclients.com')).toBeTruthy();
  });
  test('valid https url with query', () => {
    expect(Strings.validateUrl('https://www.forbestclients.com?query=value')).toBeTruthy();
  });
  test('valid http url', () => {
    expect(Strings.validateUrl('http://www.forbestclients.com')).toBeTruthy();
  });
  test('valid http url with query', () => {
    expect(Strings.validateUrl('http://www.forbestclients.com?query=value')).toBeTruthy();
  });
  test('invalid url', () => {
    expect(Strings.validateUrl('forbestclients.com')).toBeFalsy();
  });
});

describe('random string validation', () => {
  test('default length', () => {
    const randomString = Strings.random();
    expect(randomString.length).toBe(10);
  });

  test('length of 20', () => {
    const randomString = Strings.random(20);
    expect(randomString.length).toBe(20);
  });

  test('negative length', () => {
    const randomString = Strings.random(-10);
    expect(randomString.length).toBe(10);
  });
});
