import React from 'react';
import { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  filter: 'all' | 'active' | 'completed';
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, filter }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <span onClick={() => toggleTodo(todo.id)}>{todo.title}</span>
          <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
