// src/components/todos/TodoList.tsx
// Displays the list of todos, now grouped by section.

import { useTodos } from "../../hooks/useTodos";
import "./TodoList.css";
import type { ToDo } from "../../types";

// Helper to group todos by section
interface GroupedTodos {
  [section: string]: ToDo[];
}

export function TodoList({ listId }: { listId: number }) {
  const {
    todos,
    isLoading,
    isError,
    error,
    updateTodo,
    deleteTodo,
    isDeleting,
    addTodo,
  } = useTodos(listId);

  const handleToggle = (id: number) => {
    // <--- This function
    const todoToUpdate = (todos || []).find((todo: ToDo) => todo.id === id);
    if (todoToUpdate) {
      updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed });
    }
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleAddItem = (section: string) => {
    const newItemTitle = prompt(`Add new item to "${section}":`);
    if (newItemTitle && newItemTitle.trim()) {
      addTodo({ title: newItemTitle.trim(), section: section });
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading todos...</p>;
  }

  if (isError) {
    return (
      <p className="error-message">
        Error loading todos: {error?.message || "Unknown error"}
      </p>
    );
  }

  const groupedTodos: GroupedTodos = (todos || []).reduce((acc, todo) => {
    const sectionName = todo.section || "Uncategorized";
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(todo);
    return acc;
  }, {} as GroupedTodos);

  const sortedSectionNames = Object.keys(groupedTodos).sort();

  return (
    <div className="todo-list-sections-container">
      {sortedSectionNames.length === 0 && (todos || []).length === 0 ? (
        <p className="no-todos-message">No items in this list yet. Add one!</p>
      ) : (
        <div className="todo-sections-grid">
          {sortedSectionNames.map((sectionName) => {
            const sectionTodos = groupedTodos[sectionName];
            const completedCount = sectionTodos.filter(
              (todo) => todo.completed
            ).length;
            const totalCount = sectionTodos.length;

            return (
              <div key={sectionName} className="todo-section-card">
                <div className="todo-section-header">
                  <input
                    type="checkbox"
                    checked={completedCount === totalCount && totalCount > 0}
                    onChange={() => {
                      /* Implement toggle all in section later */
                    }}
                    className="section-checkbox"
                  />
                  <h3 className="todo-section-title">{sectionName}</h3>
                  <span className="todo-section-progress">
                    {completedCount}/{totalCount} Done
                  </span>
                </div>
                <ul className="todo-items-list">
                  {sectionTodos
                    .sort((a: ToDo, b: ToDo) => {
                      if (a.completed && !b.completed) return 1;
                      if (!a.completed && b.completed) return -1;
                      return 0;
                    })
                    .map((todo: ToDo) => (
                      <li key={todo.id} className="todo-item">
                        <div className="todo-item-left">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                            className="todo-item-checkbox" /* Add a class for styling if needed */
                          />
                          <span
                            className="todo-item-dot"
                            style={{
                              backgroundColor: todo.completed
                                ? "lightgray"
                                : "orange",
                            }}
                          ></span>
                          <span
                            className={`todo-item-title ${
                              todo.completed ? "completed" : ""
                            }`}
                          >
                            {todo.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(todo.id)}
                          disabled={isDeleting}
                          className="todo-item-delete-btn"
                        >
                          X
                        </button>
                      </li>
                    ))}
                </ul>
                <button
                  onClick={() => handleAddItem(sectionName)}
                  className="add-item-button"
                >
                  + Add Item
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
