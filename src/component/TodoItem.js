import React from 'react';
import EditableText from './EditableText'

class TodoItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value: props.text
        }
    }
    render() {
        const { text,id } = this.props;
        return(
            <li className={this.props.completed?"finished":''}>
                <input type="checkbox" checked={this.props.completed}  onChange={this.props.toggleTodo} /> 
                <EditableText type={text} value={text} editContent={this.props.editContent} id={id}/>
                {/* <span contentEditable onBlur={this.props.editContent} value={this.state.value}> {text} </span> */}
                <button onClick={this.props.removeTodo} className={"del"}>✖️</button>
            </li>
        )
    }
}
export default TodoItem