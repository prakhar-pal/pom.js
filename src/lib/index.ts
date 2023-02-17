/**
 * @method clearChildren - to remove all the children of element
 * @param {HTMLElement} element
 */
export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * @method render - render a component on target
 * @param {HTMLElement} Component
 * @param {HTMLElement } target
 */

export function render(Component: HTMLElement, target: HTMLElement) {
    console.assert(!!target, "Target is required");
    console.assert(!!Component, "Root component is required");
    clearChildren(target);
    target.appendChild(Component);
}

/**
 *
 * @param {String} type - type of widget
 * @param {Object} props - props for the widget
 * @returns {HTMLElement}
 */
export function Widget(type: keyof HTMLElementTagNameMap, props: IWidgetProps = {}): HTMLElement {
    const el = document.createElement(type);
    const { children, className, id, ...restProps } = props;
    if(typeof children === "string"){
        el.innerHTML = children;
    }else if(children && Array.isArray(children)){
        children?.forEach(child => {
            el.appendChild(child);
        });
    }
    for(let [key, value] of Object.entries(restProps)){
        el[key] = value;
    }
    return el;
}
