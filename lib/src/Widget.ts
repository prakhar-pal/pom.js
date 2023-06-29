import { GenericObject, IMemDOM } from "./types";

function Widget(type: string, props: GenericObject = {}): IMemDOM {
    const { key = null, ...restProps } = props;
    return { type, props: restProps, key: key || type };
}

export default Widget;
