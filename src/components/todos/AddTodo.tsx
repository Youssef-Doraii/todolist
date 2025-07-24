// src/components/todos/AddTodo.tsx

import React, { useState } from "react";
import { useTodos } from "../../hooks/useTodos"; // Make sure to import useTodos
import "./AddTodo.css"; // Ensure this CSS file exists for styling

interface AddTodoProps {
  listId: number;
  defaultSection?: string; // Optional section for the todo
}

export function AddTodo({ listId, defaultSection }: AddTodoProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  // Destructure addTodo from useTodos
  const { addTodo, isAdding } = useTodos(listId); // Pass listId here

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      // CORRECTED LINE: Pass an object with 'title' and 'section'
      addTodo({ title: newTodoTitle.trim(), section: defaultSection });
      setNewTodoTitle("");
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder={
          defaultSection
            ? `Add new item to ${defaultSection}...`
            : "Add new todo..."
        }
        className="add-todo-input"
        disabled={isAdding}
      />
      <button type="submit" className="add-todo-button" disabled={isAdding}>
        {isAdding ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}
