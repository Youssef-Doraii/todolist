import { useQuery } from "@tanstack/react-query";
import { getTodoLists } from "../../api/todos";
import type { TodoListCategory } from "../../types";
import "./ListDashboard.css";

// Define the props that ListDashboard expects
interface ListDashboardProps {
  onSelectList: (id: number, name: string) => void;
}

export function ListDashboard({ onSelectList }: ListDashboardProps) {
  const {
    data: lists,
    isLoading,
    isError,
    error,
  } = useQuery<TodoListCategory[]>({
    queryKey: ["todoLists"],
    queryFn: getTodoLists,
  });
  if (isLoading) {
    return <p>Loading your lists...</p>;
  }

  if (isError) {
    return <p>Error loading lists: {error?.message || "Unknown error"}</p>;
  }

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
              onClick={() => onSelectList(list.id, list.name)}
            >
              <div className="list-card-icon-placeholder"></div>
              <h3 className="list-card-title">{list.name}</h3>
              <p className="list-card-progress">X/Y Task Completed</p>
            </div>
          ))}
          <div
            className="list-card add-new-card"
            onClick={() => alert("Add New List functionality coming soon!")}
          >
            {/* NEW: Wrap the '+' icon with a div for consistent styling */}
            <div className="add-new-icon-placeholder">
              <span className="add-new-icon">+</span>
            </div>
            <h3 className="list-card-title">Add New</h3>
          </div>
        </div>
      )}
    </div>
  );
}
