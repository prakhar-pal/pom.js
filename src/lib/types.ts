export type ITagName = string;

export type IMemDOM = null | GenericObject & {
    key: string | number ;
    type: ITagName;
    props: any;
    el?: HTMLElement;
}

export type GenericObject = {
    [key: string]: any;
};

export interface IWidgetProps extends GenericObject {
    children?: string | HTMLElement[];
    className?: string;
}

export type IPomElement = IMemDOM | IMemDOM[];
