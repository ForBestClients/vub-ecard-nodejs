export interface ConfigOption {
  [key: string]: any;
}

class Config {
  config: ConfigOption = {};

  constructor(options: ConfigOption = {}) {
    // load options
    this.load(options);
  }

  /**
   * Loads provided config values
   * @param options config values
   */
  load = (options: ConfigOption = {}) => {
    if (options) {
      this.config = { ...this.config, ...options };
    }
  };

  /**
   * Sets new property to config or updates alrady set property
   * @param key config property name
   * @param value config property name
   */
  set = (key: string, value: any) => {
    this.config = { ...this.config, ...{ [key]: value } };
  };

  /**
   * Returns config object or value for requested key id specified
   * @param key name of property we want to get value of
   * @param defaultValue
   * @returns config object or value property for specified key
   */
  get = (key?: string, defaultValue: any = null): ConfigOption => {
    if (!key) {
      return this.config;
    }

    return key && this.config.hasOwnProperty(key) ? this.config[key] : defaultValue;
  };
}

export default Config;
