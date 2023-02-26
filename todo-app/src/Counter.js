import { Component, render, Widget } from "../../src/lib/pom";

class Counter extends Component {

    state = { counter: 0, dates: [] }

    handleCounterChange = value => this.setState(state => ({...state, counter: state.counter + value}));
    handleIncrement = () => this.handleCounterChange(1);
    handleDecrement = () => this.handleCounterChange(-1);
    handleAddDate = () => this.setState(state => ({...state, dates: [...state.dates,(new Date())] }));
    render = () => {
        const { counter, dates } = this.state;
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
                }),
                Widget("div", {
                    children: [
                        Widget("h1", { innerHTML: "Dates List" }),
                        Widget("button", {
                            innerHTML: "Add Dates",
                            onclick: this.handleAddDate
                        }),
                        Widget("ul", {
                            children: dates.map((date, index) => Widget("li", { innerHTML: date, key: index }))
                        })
                    ]
                })
            ]
        });
    }
}

render(new Counter(), document.getElementById("counter-app"));
