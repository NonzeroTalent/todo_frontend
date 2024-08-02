"use client";
import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:8000/todo/todos');
    //const response = await fetch('fastapi_router:8000/todo/todos/',{cache:"no-store",mode: 'no-cors'});
    const data = await response.json();
    setTodos(data.todos);
  };

  const addTodo = async (todo) => {
    console.log(312, todo)
    const response = await fetch('http://localhost:8000/todo/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    if (newTodo) fetchTodos()
    setIsEditing(false)
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/todo/todo?id=${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (updatedTodo, editId) => {
    updatedTodo["id"] = editId 
    let temp_body = JSON.stringify(updatedTodo)
    console.log("habibati", temp_body)

    const response = await fetch(`http://localhost:8000/todo/todo?item_id=${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: temp_body,
    });
    const newTodo = await response.json();
    // setTodos([...todos, newTodo]);
    fetchTodos()
    setIsEditing(false)
  };

  return (
    <div>
      <h1>Todo App</h1>
      {isEditing?(<h2>Edit Todo Item</h2>):(<h2>Create Todo Item</h2>)}
      
      <TodoForm addTodo={isEditing?((todo) => updateTodo(todo, editId)):(addTodo)} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={(todoId)=>{setEditId(todoId); setIsEditing(!isEditing) }} />
    </div>
  );
};

export default Home;