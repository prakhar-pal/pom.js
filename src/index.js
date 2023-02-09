import "./styles.scss";
import Todo, { TodoV2 } from "./Todo";
import { clearChildren, render, Widget } from "./lib";


/**
 * 1. Add todo
 * 2. Edit todo
 * 3. Delete todo
 */
let newTodoId = 2;

const app = document.getElementById("app");

const newTodoInput = document.createElement("input");
const newTodoSubmit = document.createElement("button");
const todoListContainer = document.createElement("ul");

class TodosApp {

  todos = [{ id: 1, text: "Todo 1", isEdit: false }];

  constructor() {
    let previousTodos = this.todos;
    setInterval(() => {
      if (previousTodos !== this.todos) {
        this.renderTodos();
      }
      previousTodos = this.todos;
    }, 100)
  }

  updateTodo = (id, value) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.text = value;
      todo.isEdit = false;
    }
    this.todos = [...this.todos];
  }

  handleDeleteTodo = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  onEditToggle = (id) => {
    this.todos = this.todos.map((_todo) => ({
      ..._todo,
      isEdit: _todo.id === id
    }));
  }

  addTodo = () => {
    if (newTodoInput.value) {
      this.todos = [...this.todos, { id: newTodoId, text: newTodoInput.value }];
      newTodoId++;
    }
    newTodoInput.value = "";
  }

  renderTodos = () => {
    clearChildren(todoListContainer);
    const { handleDeleteTodo, onEditToggle, updateTodo } = this;
    this.todos.forEach((todo) => {
      todoListContainer.appendChild(Todo({ todo, handleDeleteTodo, onEditToggle, updateTodo }));
    });
  }
}

(function setup() {
  newTodoInput.autocomplete = "off";
  todoListContainer.style.listStyleType = "none";
  newTodoSubmit.innerHTML = "Add New Todo";
  app.appendChild(newTodoInput);
  app.appendChild(newTodoSubmit);
  app.appendChild(todoListContainer);
  const todoApp = new TodosApp();
  todoApp.renderTodos();
  newTodoSubmit.onclick = todoApp.addTodo;
})();


let todos = [{ id: 1, text: "Todo 1", isEdit: false }];

const TodoAppV2 = () => {

  let previousTodos = todos;

  setInterval(() => {
    if(todos !== previousTodos) {
      previousTodos = todos;
      renderTodoAppV2();
    }
  },100);

  const updateTodo = (id, value) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.text = value;
      todo.isEdit = false;
      todos = [...todos];
    }
  }

  const onEditToggle = (id) => {
    todos = todos.map((_todo) => ({
      ..._todo,
      isEdit: _todo.id === id
    }));
  }

  const handleDeleteTodo = id => {
    todos = todos.filter(todo => todo.id !== id); 
  }

  return Widget("div", {
    className: "todo-container",
    children: [
      Widget("h3", {
        children: "Todo App2"
      }),
      Widget("div", {
        className: "todo-form",
        children: [
          Widget("input", {
            id: "todo-input",
            autoComplete: "off",
            style: {
              listStyleType: "none"
            },
          }),
          Widget("button", {
            children: "Add new Todo",
            onclick: function() {
              const newTodoInput = document.getElementById("todo-input");
              if (newTodoInput.value) {
                todos = [...todos, { id: newTodoId, text: newTodoInput.value }];
                newTodoId++;
                console.log("new todos are:", todos);
              }
              newTodoInput.value = "";
            }
          })
        ]
      }),
      Widget("ul", {
        children: todos.map(todo => TodoV2({ todo, updateTodo, handleDeleteTodo, onEditToggle }))
      })
    ]
  });
}

function renderTodoAppV2(){
  render(TodoAppV2(), document.getElementById("app-2"));
}

renderTodoAppV2();
