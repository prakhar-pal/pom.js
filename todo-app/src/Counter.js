import { Component, render, Widget } from "@lawki/pom.js";

class Counter extends Component {

    state = { counter: 0, counterHistory: [] }

    handleCounterChange = value => this.setState(state => {
        const newCounter = state.counter + value;
        return {...state, counter: newCounter, counterHistory: [...state.counterHistory, newCounter]};
    });
    handleIncrement = () => this.handleCounterChange(1);
    handleDecrement = () => this.handleCounterChange(-1);
    handleAddDate = () => this.setState(state => ({...state, dates: [...state.dates,(new Date())] }));
    deleteDate = index => this.setState(state => {
        state.counterHistory.splice(index, 1);
        return { ...state, counterHistory: [...state.counterHistory] };
    })
    render = () => {
        const { counter, counterHistory } = this.state;

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
                        Widget("h1", { innerHTML: "Counter History" }),
                        counterHistory.length > 0 ? Widget("ul", {
                            children: counterHistory.map((counter, index) => Widget("li", {
                                key: counter,
                                children: [
                                    Widget("span", { innerHTML: counter }),
                                    Widget("button", { innerHTML: 'delete', onclick: () => this.deleteDate(index)})
                                ]
                            }))
                        }): Widget("div", { innerHTML: "No Recent changes!"})
                    ]
                })
            ]
        });
    }
}

render(new Counter(), document.getElementById("counter-app"));
