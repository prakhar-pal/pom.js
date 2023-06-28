import Component from "./Component";
import { IMemDOM, GenericObject } from "./types";
import isEqual from 'lodash.isequal';

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

function updateAttrs(element?: HTMLElement, attrs: GenericObject = {}) {
    if(!element) return;
    const { children, ...restProps } = attrs;
    if (typeof children === "string") {
        element.innerHTML = children;
    }
    for (let [key, value] of Object.entries(restProps)) {
        // @ts-ignore
        element[key] = value;
    }
}

const isVDOMObj = (obj: IMemDOM) => {
    const validVDOM = (o: IMemDOM) => (typeof o === "string" || (o as GenericObject).type);  // @todo - remove as
    if(!obj) return false;
    else if(Array.isArray(obj)) {
        return obj.every(o => o && validVDOM(o));
    }else {
        return validVDOM(obj);
    }    
}

function componentToVdom(component: IMemDOM | typeof Component): IMemDOM[] {
    let result: IMemDOM[] = [];
    if (component instanceof Component) {
        let _result = component.render();
        if (!_result) return null;
        result = Array.isArray(_result) ? _result : [_result];
    } else {
        if (component instanceof Component) {
            const widgetTree = component.render();
            result = [widgetTree];
        } else {
            result = [component as IMemDOM];
        }
    }
    return result;
}


function doRenderLoop(component: IMemDOM, target: HTMLElement, prevDOM: IMemDOM[]): IMemDOM[] {
    let newDOM: IMemDOM[] = [];
    const traversedVDOM = prevDOM.map(() => false);
    const vdoms = Array.isArray(component) ? component.map(c => componentToVdom(c)).flat(1): componentToVdom(component);
    if (vdoms && vdoms.every(vdom => isVDOMObj(vdom))) {
        vdoms.forEach((vdom, index) => {
            const addElement = (instance: IMemDOM, index: number) => {
                let el = instance?.el,
                    isNew = false;
                if(!el) {
                    isNew = true;
                    el = createElement(instance.type, instance.props);
                    target.appendChild(el);
                }
                let children = instance.props?.children ? doRenderLoop(instance.props?.children, el, isNew ? [] : prevDOM?.[index]?.props?.children || []) : null;
                newDOM[index] = { ...instance, props: {...instance.props, children}, el } // as IMemDOM; // @todo - remove as
                return el;
            }
            if (prevDOM && prevDOM[index]) {
                traversedVDOM[index] = true;
                const oldVdom = prevDOM[index];
                if (oldVdom && vdom) {
                    let el = prevDOM[index]?.el;
                    if(oldVdom.key === vdom.key) {
                        // same component
                        if(prevDOM[index]?.el && !isEqual(prevDOM[index].props, vdom.props)){
                            updateAttrs(prevDOM?.[index]?.el, vdom.props);
                        }
                        addElement({ el: oldVdom?.el, ...vdom }, index);
                    } else {
                        oldVdom?.el && target.removeChild(oldVdom?.el);
                        el = addElement(vdom, index);
                    }
                } else {
                    if(oldVdom?.el) {
                        target.removeChild(oldVdom.el);
                    }
                    addElement(vdom, index);
                }
            } else {
                addElement(vdom, index);
            }
        });

        traversedVDOM.forEach((isTraversed, index) => {
            // remove untraversed children
            if(!isTraversed) {
                const el = prevDOM[index]?.el;
                if(el) {
                    target.removeChild(el);
                };
            }
        });
    }
    return newDOM;
}

export default doRenderLoop;
