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
