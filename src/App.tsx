// src/App.tsx
import React, { useState } from "react";
import { ListDashboard } from "./components/lists/ListDashboard";
// import { AddTodo } from "./components/todos/AddTodo"; // <--- REMOVE THIS IMPORT
import { TodoList } from "./components/todos/TodoList";

import "./App.css";

function App() {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null);

  const handleSelectList = (id: number, name: string) => {
    setSelectedListId(id);
    setSelectedListName(name);
  };

  const handleGoBack = () => {
    setSelectedListId(null);
    setSelectedListName(null);
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div className="app-container">
      {/* RESTORED: The app-header div with title and date */}
      <div className="app-header">
        <h1 className="app-title">Todo List</h1>
        <p className="app-date">{getCurrentDate()}</p>
      </div>

      <div className="main-card">
        {selectedListId ? (
          <React.Fragment>
            <div className="list-detail-header">
              <button onClick={handleGoBack} className="back-button">
                ← Go Back
              </button>
              <div className="list-actions">
                <button
                  className="create-list-button"
                  onClick={() => alert("Create List clicked!")}
                >
                  Create List
                </button>{" "}
                {/* Changed to Create List */}
              </div>
            </div>
            <h2 className="main-title">{selectedListName}</h2>{" "}
            {/* Changed to just list name */}
            {/* REMOVE THIS LINE: <AddTodo listId={selectedListId} defaultSection={selectedListName + " Ingredients"} /> */}
            <TodoList listId={selectedListId} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ListDashboard onSelectList={handleSelectList} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
