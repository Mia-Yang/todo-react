import React from 'react';

function TodoItem() {
    const { item, removeTodo, toggleTodo, editContent } = this.props;
    return(
        <li>
            <input type="checkbox" onClick={ toggleTodo} /> 
            <span onFocus={editContent} className="single-line" contentEditable={true}> 1{item} </span>
            <button onclick={removeTodo} className="del">✖️</button>
        </li>
    )
}
export default TodoItem