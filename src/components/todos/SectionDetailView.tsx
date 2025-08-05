import { useTodos } from "../../hooks/useTodos";
import "./SectionDetailView.css";

interface SectionDetailViewProps {
  listId: number;
  listName: string;
  sectionName: string;
  onBackToList: () => void;
}

export function SectionDetailView({
  listId,
  listName,
  sectionName,
  onBackToList,
}: SectionDetailViewProps) {
  const { todos, isLoading, isError, error, updateTodo, deleteTodo, addTodo } =
    useTodos(listId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  // Filter todos for this section and sort (completed at bottom)
  const sectionTodos = (todos || [])
    .filter((todo) => (todo.section || "Uncategorized") === sectionName)
    .sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });

  const completedCount = sectionTodos.filter((t) => t.completed).length;

  return (
    <div className="section-detail-container">
      <div className="section-breadcrumb">
        <button className="back-button" onClick={onBackToList}>
          ← Back to {listName}
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="section-title">{sectionName}</span>
      </div>
      <div className="section-header">
        <h2>{sectionName}</h2>
        <span className="section-progress">
          {completedCount}/{sectionTodos.length} Completed
        </span>
      </div>
      <ul className="section-todo-list">
        {sectionTodos.map((todo) => (
          <li
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            key={todo.id}
          >
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
        className="add-item-button"
        onClick={() => {
          const title = prompt(`Add new item to "${sectionName}":`);
          if (title && title.trim())
            addTodo({ title: title.trim(), section: sectionName });
        }}
      >
        + Add Item
      </button>
    </div>
  );
}
