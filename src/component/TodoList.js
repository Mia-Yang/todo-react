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
        this.postTodoInServer(newTodo)
    }

    postTodoInServer = (newTodo) => {
        fetch(`http://localhost:3001/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    removeTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id),
        })
        this.removeTodoInServer(id);
    }

    removeTodoInServer = (id) => {
        fetch(`http://localhost:3001/todos/${id}` , {
            method: 'DELETE'
        })
    }

    updatedTodoInServer = (id, updatedTodo) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        })
        .then(res => res.json())
        .then(data => console.log(data,"updated"))
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
        const todo = this.state.todos.filter(todo => todo.id === id)[0];
        const updatedTodo = {
            completed: todo.completed
        }
        this.updatedTodoInServer(id,updatedTodo) 
    }

    editContent = (id, newText) => {
        this.updatedTodoInServer(id,{text: newText})
    }

    clearAll = () => {
        this.state.todos.map(item => item.id).forEach(id => this.removeTodoInServer(id));
        this.setState({
            todos: [],
        })
    }

    render() {
        const todos = this.state.todos;
        return(
           <div> 
                 <AddTodo addTodo={this.addTodo} clearAll={this.clearAll} />
                 <ul className={"todo-list"}>
                     {todos.map(todo => (
                     <TodoItem 
                        key={todo.id} 
                        id={todo.id}
                        text={todo.text} 
                        completed={todo.completed}
                        removeTodo={() => this.removeTodo(todo.id)}
                        toggleTodo={this.toggleTodo.bind(this,todo.id)}
                        editContent={this.editContent.bind(this)}
                     />
                     ))}
                 </ul>
           </div>
   )
}
}
export default TodoList;