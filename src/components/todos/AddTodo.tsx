import React, { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import "./AddTodo.css";

interface AddTodoProps {
  listId: number;
  defaultSection?: string;
}

export function AddTodo({ listId, defaultSection }: AddTodoProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { addTodo, isAdding } = useTodos(listId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
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
