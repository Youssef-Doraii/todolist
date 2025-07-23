// src/App.tsx
import React, { useState } from "react"; // Import useState
import { ListDashboard } from "./components/lists/ListDashboard";
import { AddTodo } from "./todos/AddTodo";
import { TodoList } from "./todos/TodoList";

import "./App.css";

function App() {
  // State to manage the currently selected list ID
  // null means no specific list is selected, show the dashboard
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null); // To display list name

  // Function to navigate to a specific list
  const handleSelectList = (id: number, name: string) => {
    setSelectedListId(id);
    setSelectedListName(name);
  };

  // Function to go back to the dashboard
  const handleGoBack = () => {
    setSelectedListId(null);
    setSelectedListName(null);
  };

  return (
    <div className="app-container">
      <div className="main-card">
        {selectedListId ? (
          // If a list is selected, show the specific list view ("Page 2")
          <React.Fragment>
            <button onClick={handleGoBack} className="back-button">
              ← Back to {selectedListName ? selectedListName : "Lists"}
            </button>
            <h2 className="main-title">{selectedListName} Ingredients</h2>{" "}
            {/* Updated title */}
            <AddTodo listId={selectedListId} />
            <TodoList listId={selectedListId} />
          </React.Fragment>
        ) : (
          // If no list is selected, show the dashboard ("Page 1")
          <React.Fragment>
            <h2 className="main-title">My Lists</h2>
            <ListDashboard onSelectList={handleSelectList} />{" "}
            {/* Pass the selection handler */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
