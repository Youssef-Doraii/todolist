import { useQuery } from "@tanstack/react-query";
import { getTodoLists, getAllTodos } from "../../api/todos";
import type { TodoListCategory, ToDo } from "../../types";
import "./ListDashboard.css";

interface ListDashboardProps {
  onSelectList: (id: number, name: string) => void;
  onAddCategory: () => void;
}

export function ListDashboard({
  onSelectList,
  onAddCategory,
}: ListDashboardProps) {
  const {
    data: lists,
    isLoading,
    isError,
    error,
  } = useQuery<TodoListCategory[]>({
    queryKey: ["todoLists"],
    queryFn: getTodoLists,
  });
  const { data: todos } = useQuery<ToDo[]>({
    queryKey: ["allTodos"],
    queryFn: getAllTodos,
  });

  if (isLoading) return <p>Loading your lists...</p>;
  if (isError)
    return <p>Error loading lists: {error?.message || "Unknown error"}</p>;

  // Helper to count completed/total todos per list
  const getProgress = (listId: number) => {
    const listTodos = (todos || []).filter(
      (t) => String(t.listId) === String(listId)
    );
    const completed = listTodos.filter((t) => t.completed).length;
    return `${completed}/${listTodos.length} Task${
      listTodos.length !== 1 ? "s" : ""
    } Completed`;
  };

  return (
    <div className="list-dashboard">
      {lists?.length === 0 ? (
        <p className="no-lists-message">
          No lists created yet. Start by adding one!
        </p>
      ) : (
        <div className="list-grid">
          {lists?.map((list) => (
            <div
              key={list.id}
              className="list-card"
              onClick={() => onSelectList(Number(list.id), list.name)}
            >
              <div className="list-card-icon-placeholder">
                <span role="img" aria-label="icon">
                  📋
                </span>
              </div>
              <h3 className="list-card-title">{list.name}</h3>
              <p className="list-card-progress">{getProgress(list.id)}</p>
            </div>
          ))}
          <div className="list-card add-new-card" onClick={onAddCategory}>
            <div className="add-new-icon-placeholder">
              <span className="add-new-icon">+</span>
            </div>
            <h3 className="list-card-title">Add New Category</h3>
          </div>
        </div>
      )}
    </div>
  );
}
