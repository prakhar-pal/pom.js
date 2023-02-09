import "./styles.css";
import Todo from "./Todo";

/**
 * @method clearBox - to remove all the children of element
 * @param {HTMLElement} element 
 */
function clearBox(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

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
      if(previousTodos !== this.todos) {
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
    clearBox(todoListContainer);
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
