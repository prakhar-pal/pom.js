import "./styles.scss";
import Todo from "./Todo";
import { Component, render, Widget } from "@lawki/pom.js";


/**
 * 1. Add todo
 * 2. Edit todo
 * 3. Delete todo
 */
let newTodoId = 2;
const initiailTodos = [{ id: 1, text: "Todo 1", isEdit: false }];

class TodoAppV2 extends Component{

  state = { todos: initiailTodos };

  updateTodo = (id, value) => {
    const { todos } = this.state;
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.text = value;
      todo.isEdit = false;
      const newTodos = [...todos];
      this.setState(() => ({ todos: newTodos }));
    }
  }

  onEditToggle = (id) => {
    const { todos } = this.state;
    let newTodos = todos.map((_todo) => ({
      ..._todo,
      isEdit: _todo.id === id
    }));
    this.setState(() => ({ todos: newTodos }));
  }

  handleDeleteTodo = id => {
    const { todos } = this.state;
    let newTodos = todos.filter(todo => todo.id !== id); 
    this.setState(() => ({ todos: newTodos }));
  }

  handleAddTodo = event => {
    event?.preventDefault?.();
    const { todos } = this.state;
    const newTodoInput = document.getElementById("todo-input");
    if (newTodoInput.value) {
      let newTodos = [...todos, { id: newTodoId, text: newTodoInput.value }];
      newTodoId++;
      this.setState(() => ({ todos: newTodos }));
    }
    newTodoInput.value = "";
  }

  render () {
    const { todos } = this.state;
    return Widget("div", {
      className: "todo-container",
      children: [
        Widget("h3", {
          children: "Todo App"
        }),
        Widget("small", { children: "Manage Your Todos :)"}),
        Widget("hr"),
        Widget("form", {
          onsubmit: this.handleAddTodo,
          className: "todo-form",
          children: [
            Widget("input", {
              id: "todo-input",
              autoComplete: "off",
            }),
            Widget("button", {
              children: "Add new Todo",
              onclick: this.handleAddTodo
            })
          ]
        }),
        Widget("ol", {
          children: todos.map(todo => {
            return new Todo({
              todo,
              updateTodo: this.updateTodo,
              handleDeleteTodo: this.handleDeleteTodo,
              onEditToggle: this.onEditToggle
            });
          })
        }),
      ]
    });
  }
}

const app = new TodoAppV2();
const el = document.getElementById("app");
render(app, el);
