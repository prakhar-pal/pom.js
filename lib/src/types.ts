export type ITagName = string;

export interface IMemDOM extends GenericObject {
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


export type StateCbFn<T> = (state: T) => T;

export interface IComponent {
    render: () => IMemDOM;
}

