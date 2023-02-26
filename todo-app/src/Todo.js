import { Widget } from "@lawki/pom.js";

/**
 * Features of Todo component
 * 1. Delete todo
 * 2. Update todo
 *  a. using update button
 *  b. by pressing enter
 */

export function Todo ({ todo, updateTodo, handleDeleteTodo, onEditToggle }) {
    const el = todo.isEdit ? Widget("input", {
        value: todo.text,
        onkeydown: event => {
            if(event.keyCode === 13){
                updateTodo(todo.id, el.value);
            }
        }
    }): Widget("span", { children: todo.text });

    const w = Widget("li", {
        onclick: () => {
            w.classList.toggle("active");
        },
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
    return w;
}

export default Todo;
