"use client";

import { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);
  const [day, setDay] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ name, completed, day });
    setName('');
    setCompleted(false);
    setDay(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <input
        type="number"
        placeholder="Day"
        value={day}
        onChange={(e) => setDay(Number(e.target.value))}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;