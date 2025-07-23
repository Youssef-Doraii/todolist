// src/components/lists/ListDashboard.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodoLists } from "../../api/todos";
import type { TodoListCategory } from "../../types";

import "./ListDashboard.css";

// Define the props that ListDashboard expects
interface ListDashboardProps {
  onSelectList: (id: number, name: string) => void;
}

export function ListDashboard({ onSelectList }: ListDashboardProps) {
  // <--- Receive onSelectList prop
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
              <h3 className="list-card-title">{list.name}</h3>
              <button className="list-card-button">View List</button>
            </div>
          ))}
          <div
            className="list-card add-new-card"
            onClick={() => alert("Add New List functionality coming soon!")}
          >
            <span className="add-new-icon">+</span>
            <h3 className="list-card-title">Add New</h3>
          </div>
        </div>
      )}
    </div>
  );
}
