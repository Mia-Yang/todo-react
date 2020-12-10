import React from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

class TodoList extends React.Component{
    state={
        todos:[],
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
            console.log(this.state)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

render() {
    const todos = this.state.todos;
    return(
       <div>
           <AddTodo />
           <ul>
           {todos.map((todo,index) => (
               <TodoItem text={todo.text} key={index} />
           ))}
           </ul>
       </div>
   )
}
}
export default TodoList;