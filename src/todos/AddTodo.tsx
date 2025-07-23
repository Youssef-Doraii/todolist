// Lets the user add a new task.

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import "./AddTodo.css";

// This component now accepts a 'listId' prop
export function AddTodo({ listId }: { listId: number }) {
  const [title, setTitle] = useState("");
  const { addTodo, isAdding } = useTodos(listId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAdding}
        className="add-todo-input"
      />
      <button type="submit" disabled={isAdding} className="add-todo-button">
        {isAdding ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
