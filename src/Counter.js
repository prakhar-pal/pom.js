import { Component, render, Widget } from "./lib/pom";

class Counter extends Component {
    state = { counter: 0 }
    constructor() {
        super();
        setInterval(() => {
            // this.setState(state => ({...state, counter: state.counter+1 }));
        }, 1000);
    }

    handleCounterChange = value => this.setState(state => ({...state, counter: state.counter + value}));
    handleIncrement = () => this.handleCounterChange(1);
    handleDecrement = () => this.handleCounterChange(-1);
    render = () => {
        const { counter } = this.state;
        return Widget("div", {
            className: "counter-app-container",
            children: [
                Widget("span", { 
                    innerHTML: counter,
                }),
                Widget("div", {
                    children: [
                        Widget("button", {
                            innerHTML: "+",
                            onclick: this.handleIncrement
                        }),
                        Widget("button", {
                            innerHTML: "-",
                            onclick: this.handleDecrement
                        }),
                    ]
                })
            ]
        });
    }
}

render(new Counter(), document.getElementById("counter-app"));
