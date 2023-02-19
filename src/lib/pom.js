class StateEventBus {
    listeners = [];
    addEventListener(fn) {
        this.listeners.push(fn);
    }
    triggerStateChange() {
        this.listeners.forEach(fn => fn());
    }
}

const seBus = new StateEventBus();

export function Widget(type, props = {}) {
    const { key = null, ...restProps } = props;
    return { type, props: restProps, key: key || type };
}


const isVDOMObj = (obj) => Array.isArray(obj) && obj.every(o => !!o.type);

export function render(element, target) {
    let oldDOM = [];
    function doRenderLoop(component, target, prevDOM) {
        let newDOM = [];
        if(typeof component === "string") {
            newDOM = component;
            target.innerHTML = component;
        }else if(component instanceof Component) {
            let result = component.render();
            if(result.type) result = [result];
            return doRenderLoop(result, target, prevDOM);
        }else if(isVDOMObj(component)) {
            component.forEach((componentInstance, index) => {
                const addElement = (instance, index) => {
                    const el = createElement(instance.type, instance.props);
                    target.appendChild(el);
                    let children =  instance.props?.children ? doRenderLoop(instance.props?.children, el, prevDOM?.[index]?.children || []): null;
                    newDOM[index] = {...componentInstance, children, el };
                    return el;
                }
                if(prevDOM && prevDOM[index]) {
                    const oldComponentInstance = prevDOM[index];
                    if(oldComponentInstance.key === componentInstance.key){
                        updateAttrs(prevDOM[index].el, componentInstance.props);
                        const el = prevDOM[index].el;
                        let children = componentInstance.props?.children ? doRenderLoop(componentInstance.props?.children, el, prevDOM?.[index]?.children || []) : null;
                        newDOM[index] = {...componentInstance, children, el };
                    }else {
                        console.log("removing:", oldComponentInstance.el);
                        target.removeChild(oldComponentInstance.el);
                        addElement(componentInstance, index);
                    }
                }else {
                    addElement(componentInstance, index);
                }
            });
        }
        return newDOM;
    }

    const doIt = () => {
        const newDOM = doRenderLoop(element, target, oldDOM);
        oldDOM = newDOM;
    }
    seBus.addEventListener(doIt);
    doIt();
}

const stateUpdated = () => {
    seBus.triggerStateChange();
};

/**
 *
 * @param {String} type - type of widget
 * @param {Object} props - props for the widget
 * @returns {HTMLElement}
 */
// export function Widget(type: keyof HTMLElementTagNameMap, props: IWidgetProps = {}): HTMLElement {
export function createElement(type, props = {}) {
    const el = document.createElement(type);
    updateAttrs(el, props);
    return el;
}

function updateAttrs(element, attrs){
    const { children, ...restProps } = attrs;
    if(typeof children === "string"){
        element.innerHTML = children;
    }
    for(let [key, value] of Object.entries(restProps)){
        element[key] = value;
    }
}

export class Component {
    state = null;
    setState = (cb) => {
        this.state = cb(this.state);
        stateUpdated();
    }
    render() {
        return null;
    }
}

