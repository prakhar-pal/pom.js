import { Widget, Component } from "@lawki/pom.js";

/**
 * Features of Todo component
 * 1. Delete todo
 * 2. Update todo
 *  a. using update button
 *  b. by pressing enter
 */

class Todo extends Component {
    state = { updatedTodo: '' };
    constructor({ todo, updateTodo, handleDeleteTodo, onEditToggle }) {
        super();
        this.props = { todo, updateTodo, handleDeleteTodo, onEditToggle };
    }

    onChangeTodo = event => {
        this.setState(() => ({ updatedTodo: event.target.value }));
    }

    handleUpdateOrEdit = () => {
        const { todo, updateTodo, onEditToggle } = this.props;
        const { updatedTodo } = this.state;
        if(todo.isEdit) {
            updateTodo(todo.id, updatedTodo);
            this.setState(() => ({ updatedTodo: ''}));
        } else {
            onEditToggle(todo.id);
            this.setState(() => ({ updatedTodo: todo.text }));
        }
    }

    render () {
        const { todo, updateTodo, handleDeleteTodo } = this.props;
        const { updatedTodo } = this.state;
        const el = todo.isEdit ? Widget("input", {
            value: updatedTodo,
            oninput: this.onChangeTodo,
            onkeydown: event => {
                if(event.keyCode === 13){
                    updateTodo(todo.id, event.target.value);
                }
            }
        }): Widget("span", { children: todo.text });

        const w = Widget("li", {
            children: [
                el,
                Widget("button", {
                    children: "Delete",
                    onclick: () => handleDeleteTodo(todo.id)
                }),
                Widget("button", {
                    children: todo.isEdit ? "Update": "Edit",
                    onclick: this.handleUpdateOrEdit
                })
            ]
        });
        return w;
    }
}

export default Todo;
