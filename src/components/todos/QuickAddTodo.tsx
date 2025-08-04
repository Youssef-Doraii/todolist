import React, { useState } from "react";

interface QuickAddTodoProps {
  onAdd: (title: string) => void;
}

export const QuickAddTodo: React.FC<QuickAddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-add-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new item..."
        className="quick-add-input"
      />
      <button type="submit" className="quick-add-button">
        Add
      </button>
    </form>
  );
};
