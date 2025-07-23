// src/components/todos/TodoList.tsx
// Displays the list of todos.

import { useTodos } from "../hooks/useTodos";
import "./TodoList.css";
import type { ToDo } from "../types"; // Import ToDo type for explicit typing

// This component now accepts a 'listId' prop
export function TodoList({ listId }: { listId: number }) {
  // <--- CRUCIAL: Add listId prop here
  const {
    todos,
    isLoading,
    isError,
    error,
    updateTodo,
    deleteTodo,
    isDeleting,
  } = useTodos(listId); // <--- CRUCIAL: Pass listId to useTodos hook here

  const handleToggle = (id: number) => {
    const todoToUpdate = (todos || []).find((todo: ToDo) => todo.id === id);
    if (todoToUpdate) {
      updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed });
    }
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    return <p>Error loading todos: {error?.message || "Unknown error"}</p>;
  }

  const sortedTodos = [...(todos || [])].sort((a: ToDo, b: ToDo) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <ul className="todo-list">
      {sortedTodos.length === 0 ? (
        <p className="no-todos-message">
          No todos in this list yet. Add one above!
        </p>
      ) : (
        sortedTodos.map((todo: ToDo) => (
          <li
            key={todo.id}
            className={`todo-item ${
              todo.completed ? "todo-item-completed" : ""
            }`}
          >
            <div className="todo-item-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="todo-item-checkbox"
              />
              <span className="todo-item-title">{todo.title}</span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={isDeleting}
              className="todo-item-delete-button"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
