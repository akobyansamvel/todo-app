import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from './types';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Все</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Активные</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Выполненные</button>
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} filter={filter} />
      
      <button onClick={clearCompleted} disabled={todos.every(todo => !todo.completed)}>
        Очистить выполненные задачи
      </button>

      <p>Активные задачи: {activeCount}</p>
    </div>
  );
};

export default App;
