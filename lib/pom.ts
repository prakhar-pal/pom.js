import isEqual from 'lodash.isequal';
import { IMemDOM, GenericObject, IPomElement } from "./types";


class StateEventBus {
    listeners: Function[] = [];
    addChangeHandler(fn: Function) {
        this.listeners.push(fn);
    }
    removeChangeHandler(fn: Function) {
        this.listeners = this.listeners.filter(listener => listener !== fn);
    }
    stateUpdated() {
        this.listeners.forEach(fn => fn());
    }
}

const stateEventBus = new StateEventBus();

export function Widget(type: string, props: GenericObject = {}): IMemDOM {
    const { key = null, ...restProps } = props;
    return { type, props: restProps, key: key || type };
}


const isVDOMObj = (obj: IPomElement[]) => 
    obj && Array.isArray(obj) &&
    obj.every(o => o && (typeof o === "string" || (o as GenericObject).type)); // @todo - remove as

function doRenderLoop(component: IPomElement[], target: HTMLElement, prevDOM: IMemDOM[]): IMemDOM[] {
    let newDOM: IMemDOM[] = [];
    if (component instanceof Component) {
        let _result = component.render();
        let result: IMemDOM[] = [];
        if (!_result) return null;
        else if (!Array.isArray(_result) && typeof _result !== "string") result = [_result];
        return doRenderLoop(result, target, prevDOM);
    } else if (component && isVDOMObj(component as IMemDOM[])) { // @todo - remove as
        (component as IMemDOM[]).forEach((componentInstance, index) => { // @todo - remove as
            const addElement = (instance: IMemDOM, index: number) => {
                const el = createElement(instance.type, instance.props);
                target.appendChild(el);
                let children = instance.props?.children ? doRenderLoop(instance.props?.children, el, prevDOM?.[index]?.children || []) : null;
                newDOM[index] = { ...componentInstance, children, el } as IMemDOM; // @todo - remove as
                return el;
            }
            if (prevDOM && prevDOM[index]) {
                const oldComponentInstance = prevDOM[index];
                if (oldComponentInstance && componentInstance && oldComponentInstance.key === componentInstance.key) {
                    if(prevDOM[index]?.el && !isEqual(prevDOM[index].props, componentInstance.props)){
                        updateAttrs(prevDOM?.[index]?.el, componentInstance.props);
                    } 
                    const el = prevDOM[index]?.el;
                    let children = componentInstance.props?.children && el ? doRenderLoop(componentInstance.props?.children, el, prevDOM?.[index]?.children || []) : null;
                    newDOM[index] = { ...componentInstance, children, el };
                } else {
                    if(oldComponentInstance?.el) {
                        target.removeChild(oldComponentInstance.el);
                    }
                    addElement(componentInstance, index);
                }
            } else {
                addElement(componentInstance, index);
            }
        });
    }
    return newDOM;
}

export function render(element: IPomElement[], target: HTMLElement) {
    let oldDOM: IMemDOM[] = [];
   

    const updateVDOM = () => {
        const newDOM = doRenderLoop(element, target, oldDOM);
        oldDOM = newDOM;
    }
    stateEventBus.addChangeHandler(updateVDOM);
    stateEventBus.stateUpdated();
}

const stateUpdated = () => {
    stateEventBus.stateUpdated();
};

/**
 *
 * @param {String} type - type of widget
 * @param {Object} props - props for the widget
 * @returns {HTMLElement}
 */
export function createElement(type: string, props: GenericObject = {}): HTMLElement {
    const el = document.createElement(type);
    updateAttrs(el, props);
    return el;
}

function updateAttrs(element?: HTMLElement, attrs?: GenericObject) {
    if(!element) return;
    attrs = attrs || {};
    const { children, ...restProps } = attrs;
    if (typeof children === "string") {
        element.innerHTML = children;
    }
    for (let [key, value] of Object.entries(restProps)) {
        // @ts-ignore
        element[key] = value;
    }
}

type StateCbFn<T> = (state: T) => T;

interface IComponent {
    render: () => IPomElement;
}
export class Component<T> implements IComponent {
    state: T;
    setState = (cb: StateCbFn<T>) => {
        this.state = cb(this.state);
        stateUpdated();
    }
    render(): IPomElement {
        return Widget('', { });
    }
}

