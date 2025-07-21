// src/components/todos/TodoList.tsx
// Displays the list of todos.

import { useTodos } from "../../hooks/useTodos"; // NEW IMPORT: Use your custom hook

export function TodoList() {
  // Destructure data and mutation functions from the useTodos hook
  const {
    todos,
    isLoading,
    isError,
    error,
    updateTodo, // Function to update a todo's status
    deleteTodo, // Function to delete a todo
    isDeleting, // State to show if a delete operation is in progress
  } = useTodos();

  // Function to handle toggling a todo's completion status
  const handleToggle = (id: number) => {
    const todoToUpdate = todos?.find((todo) => todo.id === id);
    if (todoToUpdate) {
      // Call updateTodo from the hook with the modified todo object
      updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed });
    }
  };

  // Function to handle deleting a todo
  const handleDelete = (id: number) => {
    deleteTodo(id); // Call deleteTodo function from the hook
  };

  // --- Conditional Rendering for Loading and Error States ---
  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    // Display a more informative error message
    return <p>Error loading todos: {error?.message || "Unknown error"}</p>;
  }

  // Ensure todos is not null or undefined before sorting
  const sortedTodos = [...(todos || [])].sort((a, b) => {
    // Sort completed tasks to the bottom
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <ul>
      {sortedTodos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: 10 }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span style={{ marginLeft: 8 }}>{todo.title}</span>
          <button
            onClick={() => handleDelete(todo.id)}
            disabled={isDeleting} // Disable button while a delete operation is pending
            style={{ marginLeft: 12 }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
