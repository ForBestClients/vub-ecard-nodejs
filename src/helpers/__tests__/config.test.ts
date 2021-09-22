import Config from '../config';

describe('base config operations', () => {
  const configOptions = {
    clientId: 'test123',
    storeKey: 2345,
  };

  test('get config values', () => {
    const config = new Config(configOptions);
    expect(config.get()).toMatchObject(configOptions);
  });

  test('get value', () => {
    const config = new Config(configOptions);
    expect(config.get('clientId')).toBe('test123');
  });

  test('get default value', () => {
    const config = new Config(configOptions);
    expect(config.get('nonExistingKey', 'defaultValue')).toBe('defaultValue');
  });

  test('get default default value', () => {
    const config = new Config(configOptions);
    expect(config.get('nonExistingKey')).toBeNull();
  });

  test('get missing value', () => {
    const config = new Config(configOptions);
    expect(config.get('randomKey')).toBeNull();
  });

  test('set value', () => {
    const config = new Config(configOptions);
    config.set('currency', 'EUR');
    expect(config.get('currency')).toBe('EUR');
  });
});
