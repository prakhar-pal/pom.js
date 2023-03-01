export declare type ITagName = string;
export declare type IMemDOM = null | GenericObject & {
    key: string | number;
    type: ITagName;
    props: any;
    el?: HTMLElement;
};
export declare type GenericObject = {
    [key: string]: any;
};
export interface IWidgetProps extends GenericObject {
    children?: string | HTMLElement[];
    className?: string;
}
export declare type IPomElement = IMemDOM | IMemDOM[];
