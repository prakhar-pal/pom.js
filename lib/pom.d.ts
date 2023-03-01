import { IMemDOM, GenericObject, IPomElement } from "./types";
export declare function Widget(type: string, props?: GenericObject): IMemDOM;
export declare function render(element: IPomElement[], target: HTMLElement): void;
/**
 *
 * @param {String} type - type of widget
 * @param {Object} props - props for the widget
 * @returns {HTMLElement}
 */
export declare function createElement(type: string, props?: GenericObject): HTMLElement;
declare type StateCbFn<T> = (state: T) => T;
interface IComponent {
    render: () => IPomElement;
}
export declare class Component<T> implements IComponent {
    state: T;
    setState: (cb: StateCbFn<T>) => void;
    render(): IPomElement;
}
export {};
