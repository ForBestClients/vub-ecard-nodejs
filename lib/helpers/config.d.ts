export interface ConfigOption {
    [key: string]: any;
}
declare class Config {
    config: ConfigOption;
    constructor(options?: ConfigOption);
    /**
     * Loads provided config values
     * @param options config values
     */
    load: (options?: ConfigOption) => void;
    /**
     * Sets new property to config or updates alrady set property
     * @param key config property name
     * @param value config property name
     */
    set: (key: string, value: any) => void;
    /**
     * Returns config object or value for requested key id specified
     * @param key name of property we want to get value of
     * @param defaultValue
     * @returns config object or value property for specified key
     */
    get: (key?: string | undefined, defaultValue?: any) => ConfigOption;
}
export default Config;
