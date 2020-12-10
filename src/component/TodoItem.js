import React from 'react';

class TodoItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            editatble: true
        }
    }
    render() {
        const { text, removeTodo, toggleTodo, editContent } = this.props;
        return(
            <li>
                <input type="checkbox" onClick={ toggleTodo} /> 
                <span onFocus={editContent} > {text} </span>
                <button onClick={removeTodo} >✖️</button>
            </li>
        )
    }
}
export default TodoItem