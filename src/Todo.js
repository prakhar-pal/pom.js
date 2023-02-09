import { Widget } from "./lib";

export function TodoV2 ({ todo, updateTodo, handleDeleteTodo, onEditToggle }) {
    const el = todo.isEdit ? Widget("input", {
        value: todo.text
    }): Widget("span", { children: todo.text });
    return Widget("li", {
        children: [
            el,
            Widget("button", {
                children: "Delete",
                onclick: () => handleDeleteTodo(todo.id)
            }),
            Widget("button", {
                children: todo.isEdit ? "Update": "Edit",
                onclick: () => {
                    if(todo.isEdit) {
                        updateTodo(todo.id, el.value);
                    }else {
                        onEditToggle(todo.id);
                    }
                }
            })
        ]
    });
}

const Todo = ({ todo, updateTodo, handleDeleteTodo, onEditToggle }) => {
    const todoEl = document.createElement("li");

    if (todo.isEdit) {
        // add input box in case of editing
        const input = document.createElement("input");
        input.value = todo.text;
        input.onkeydown = (event) => {
            if (event.keyCode === 13) {
                updateTodo(todo.id, input.value);
            }
        }
        todoEl.appendChild(input);
    }else {
        // show todo text
        const span = document.createElement("span");
        span.innerHTML = todo.text;
        todoEl.appendChild(span);
    }

    // add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = () => handleDeleteTodo(todo.id);
    todoEl.appendChild(deleteBtn);

    // add edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "edit";
    editBtn.onclick = () => onEditToggle(todo.id);
    todoEl.appendChild(deleteBtn);
    todoEl.appendChild(editBtn);
    
    return todoEl;
}

export default Todo;
