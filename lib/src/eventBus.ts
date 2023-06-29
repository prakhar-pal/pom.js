export class EventBus {
    listeners: Function[] = [];
    addChangeHandler(fn: Function) {
        this.listeners.push(fn);
    }
    removeChangeHandler(fn: Function) {
        this.listeners = this.listeners.filter(listener => listener !== fn);
    }
}
export class StateEventBus extends EventBus {
    stateUpdated() {
        this.listeners.forEach(fn => fn());
    }
}

const stateEventBus = new StateEventBus();

export { stateEventBus };
