type ITagName = keyof HTMLElementTagNameMap;

type IMemDOM = null | {
    key?: string | number ;
    type: ITagName;
    props: any;
    el: HTMLElement;
}


type GenericObject = {
    [key: string]: any;
};


interface IWidgetProps extends GenericObject {
    children?: string | HTMLElement[];
    className?: string;
}

