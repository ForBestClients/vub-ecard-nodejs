export interface HtmlAttributes {
    [index: string]: string | undefined;
}
export interface InputAttributes extends HtmlAttributes {
    name: string;
    value: string;
}
declare const _default: {
    tagOpen: (tagName: string, attributes?: HtmlAttributes | undefined) => string;
    tagClose: (tagName: string) => string;
    formOpen: (attributes?: HtmlAttributes | undefined) => string;
    formClose: () => string;
    input: (attributes?: HtmlAttributes | undefined) => string;
    hiddenInput: (attributes?: HtmlAttributes) => string;
};
export default _default;
