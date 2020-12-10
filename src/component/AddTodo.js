import React from 'react'
import TodoHeader from './TodoHeader'

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: '',
        }
    }
    handleInput = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // 添加进json-server


        this.setState({
            text: '',
        })
    }

    handleClearAll = () => {
        //清空json-server
        //清空state

    }

    render(){
        return(
            <div>
                <TodoHeader />
                <form onSubmit={this.handleSubmit}>
                <input
                   type="text"
                   placeholder="Plan your life"
                   onChange={this.handleInput}
                   value={this.state.text}
                />
                    <button>➕</button>
                </form>
                <button onClick={this.handleClearAll}>Clear All</button>
            </div>
        )
    }
}

export default AddTodo;