import React from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            todos:[],
        }
    }
    
    componentDidMount(){
        fetch("http://localhost:3001/todos", {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                todos: data,
            });
        })
    }

    addTodo = (newTodo) => {
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
    }

    removeTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id),
        })
        fetch(`http://localhost:3001/todos/${id}` , {
            method: 'DELETE'
          })
    }

    toggleTodo = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                  todo.completed = !todo.completed;
                }
                return todo;
            })
        });
        const todo = this.state.todos.filter(todo => todo.id === id);
        const updatedTodo = {
            completed: !todo.completed
        }
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        })
        .then(res => res.json())
    }

render() {
    const todos = this.state.todos;
    return(
       <div> 
           <AddTodo addTodo={this.addTodo} />
           <ul>
           {todos.map(todo => (
               <TodoItem 
                   key={todo.id} 
                   id={todo.id}
                   text={todo.text} 
                   completed={todo.completed}
                   removeTodo={this.removeTodo.bind(this,todo.id)}
                   toggleTodo={this.toggleTodo.bind(this,todo.id)}
                   editContent={this.editContent}
               />
           ))}
           </ul>
       </div>
   )
}
}
export default TodoList;