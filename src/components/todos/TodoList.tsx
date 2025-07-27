import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import "./TodoList.css";

interface TodoListProps {
  listId: number;
  listName: string;
  onGoBack: () => void;
  onAddSubList: () => void;
  onViewSection: (sectionName: string) => void;
}

export function TodoList({
  listId,
  listName,
  onGoBack,
  onAddSubList,
  onViewSection,
}: TodoListProps) {
  const [filter, setFilter] = useState<"all" | "completed">("all");
  const { todos, isLoading, isError, error, updateTodo, deleteTodo } =
    useTodos(listId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const groupedTodos = (todos || []).reduce(
    (acc: Record<string, any[]>, todo) => {
      const section = todo.section || "Uncategorized";
      if (!acc[section]) acc[section] = [];
      acc[section].push(todo);
      return acc;
    },
    {}
  );

  const sortedSections = Object.keys(groupedTodos).sort();

  return (
    <div className="todo-list-sections-container">
      <div
        className="list-detail-header"
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <button className="back-button" onClick={onGoBack}>
          ← Go Back
        </button>
        <h2 className="main-title" style={{ flex: 1 }}>
          {listName}
        </h2>
        <div className="list-actions" style={{ display: "flex", gap: 8 }}>
          <button className="create-list-button" onClick={onAddSubList}>
            Add Sub List
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button
          className={`filter-btn${filter === "all" ? " active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn${filter === "completed" ? " active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="todo-sections-grid">
        {sortedSections.map((section) => {
          const sectionTodos = groupedTodos[section].filter((todo) =>
            filter === "all" ? true : todo.completed
          );
          const completedCount = groupedTodos[section].filter(
            (t) => t.completed
          ).length;
          const todosToShow = sectionTodos.slice(0, 3);

          return (
            <div className="todo-section-card" key={section}>
              <div className="todo-section-header">
                <input type="checkbox" disabled />
                <span className="todo-section-title">{section}</span>
                <span className="todo-section-progress">
                  {completedCount}/{groupedTodos[section].length} Completed
                </span>
              </div>
              <ul className="todo-items-list">
                {todosToShow.map((todo) => (
                  <li className="todo-item" key={todo.id}>
                    <span>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          updateTodo({ ...todo, completed: !todo.completed })
                        }
                      />
                      <span
                        className="todo-item-dot"
                        style={{ background: "#f48c06" }}
                      ></span>
                      <span
                        className={`todo-item-title${
                          todo.completed ? " completed" : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                    </span>
                    <button
                      className="todo-item-delete-btn"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="view-all-btn"
                onClick={() => onViewSection(section)}
                style={{ marginTop: 8 }}
              >
                View All
              </button>
            </div>
          );
        })}
      </div>
      <div className="pagination-placeholder">Pagination Placeholder</div>
    </div>
  );
}
