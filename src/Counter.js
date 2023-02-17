import { Component, render, Widget } from "./lib/pom";

class Counter extends Component {
    state = { counter: 0 }
    constructor() {
        super();
        setInterval(() => {
            this.setState(state => ({...state, counter: state.counter+1 }));
        }, 1000);
    }
    render = () => {
        const { counter } = this.state;
        return Widget('div', {
            innerHTML: counter
        });
    }
}

render(new Counter(), document.getElementById("counter-app"));
