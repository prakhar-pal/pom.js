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
    const {key = null, ...restProps} = props;
    return { type, props: restProps, key };
}

export function render(component, target) {
    let oldDOM = null;
    function doRender(component, target, prevDOM) {
        let newDOM = null;
        if(typeof component === "string") {
            newDOM = component;
            target.innerHTML = component;
        }else if(component instanceof Component) {
            let result = component.render();
            return doRender(result, target, prevDOM);
        }else if(component.type && component.props) {
            if(prevDOM && prevDOM[component.key]) {
                updateAttrs(prevDOM[component.key], component.props);
            }else {
                // remove previous DOM Nodes
                for(let [type, props] of (prevDOM ? Object.entries(prevDOM) : [])){
                    console.log({ type, props });
                    target.removeChild(props.el);
                }
                let parentEl = target;
                if(component.type){
                    parentEl = createElement(component.type, component.props);
                    target.appendChild(parentEl);
                }
                newDOM = Object.assign({}, newDOM, { [component.type]: {
                    ...component,
                    el: parentEl
                }});
                return newDOM;
            }
        }
        return newDOM;
    }

    const doIt = () => {
        oldDOM = doRender(component, target, oldDOM);
        console.log("new DOM:", oldDOM);
    }
    seBus.addEventListener(doIt);
    doIt();
}

const stateUpdated = () => {
    console.log("state has been updated");
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
    const { children, className, id, ...restProps } = attrs;
    if(typeof children === "string"){
        element.innerHTML = children;
    }else if(children && Array.isArray(children)){
        children?.forEach(child => {
            element.appendChild(createElement(child));
        });
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

