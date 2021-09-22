export enum Languages {
  SK = 'sk',
  EN = 'en',
}

/**
 * Returns default language
 * @returns string sk
 */
const getDefault = (): Languages => {
  return Languages.SK;
};

export default {
  getDefault,
};
