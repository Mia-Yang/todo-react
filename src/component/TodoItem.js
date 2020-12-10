import React from 'react';

class TodoItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            editatble: true
        }
    }
    render() {
        const { text, id } = this.props;
        return(
            <li className={this.props.completed?"finished":''}>
                <input type="checkbox" defaultChecked={this.props.completed}  onChange={this.props.toggleTodo} /> 
                <span onFocus={this.props.editContent} className={id}> {text} </span>
                <button onClick={this.props.removeTodo} >✖️</button>
            </li>
        )
    }
}
export default TodoItem