const TodoList = ({ todos, deleteTodo, updateTodo }) => {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.name}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              disabled
            />
            <span>{todo.day}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;