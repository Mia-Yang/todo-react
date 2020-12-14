import React from 'react';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim().length === 0) {
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: this.state.text.trim(),
      completed: false,
    };

    this.props.addTodo(newTodo);
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Plan your life"
            onChange={this.handleInput}
            value={this.state.text}
            data-testid="inputbox"
          />
          <button className={'add-btn'} data-testid="addTodoButton">
            ➕
          </button>
        </form>
        <button
          onClick={this.props.clearAll}
          className={'clear'}
          data-testid="clearButton"
        >
          Clear All
        </button>
      </div>
    );
  }
}

export default AddTodo;
