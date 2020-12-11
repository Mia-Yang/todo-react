import React from 'react'
import EditableTodoSpan from './EditableTodoSpan'

class TodoItem extends React.Component {
  render() {
    const { text, id } = this.props
    return (
      <li className={this.props.completed ? 'finished' : ''}>
        <input
          type="checkbox"
          checked={this.props.completed}
          onChange={this.props.toggleTodo}
        />
        <EditableTodoSpan
          type={text}
          value={text}
          editContent={this.props.editContent}
          id={id}
        />
        <button onClick={this.props.removeTodo} className={'del'}>
          ✖️
        </button>
      </li>
    )
  }
}
export default TodoItem
