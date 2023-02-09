import "./styles.scss";
import Todo from "./Todo";
import { render, Widget } from "./lib";


/**
 * 1. Add todo
 * 2. Edit todo
 * 3. Delete todo
 */
let newTodoId = 2;
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
        children: "Todo App"
      }),
      Widget("small", { children: "Manage Your Todos :)"}),
      Widget("hr"),
      Widget("div", {
        className: "todo-form",
        children: [
          Widget("input", {
            id: "todo-input",
            autoComplete: "off",
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
        children: todos.map(todo => Todo({ todo, updateTodo, handleDeleteTodo, onEditToggle }))
      })
    ]
  });
}

function renderTodoAppV2(){
  render(TodoAppV2(), document.getElementById("app"));
}

renderTodoAppV2();
