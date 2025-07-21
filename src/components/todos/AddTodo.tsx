// src/components/todos/AddTodo.tsx
// Lets the user add a new task.

import { useState } from "react";
import { useTodos } from "../../hooks/useTodos"; // NEW IMPORT: Use your custom hook

export function AddTodo() {
  const [title, setTitle] = useState("");
  const { addTodo, isAdding } = useTodos(); // Call the hook to get addTodo function and its loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    addTodo({ title, completed: false }); // Call addTodo from the hook
    setTitle(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAdding} // Disable input while adding a todo
      />
      <button type="submit" disabled={isAdding}>
        {" "}
        {/* Disable button while adding */}
        {isAdding ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
