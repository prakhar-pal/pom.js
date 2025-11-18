import Widget from "./Widget";
import { stateEventBus } from "./eventBus";
import { IComponent, StateCbFn, IMemDOM } from "./types";

class Component<T> implements IComponent {
    state: T;
    setState = (cb: StateCbFn<T>) => {
        this.state = cb(this.state);
        stateEventBus.stateUpdated();
    }
    render(): IMemDOM {
        return Widget('', { });
    }
}

export default Component;