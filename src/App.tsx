import { useState, useEffect } from "react";
import { ListDashboard } from "./components/lists/ListDashboard";
import { TodoList } from "./components/todos/TodoList";
import { AddListForm } from "./components/lists/AddListForm";
import { AddSubListForm } from "./components/lists/AddSubListForm";
import { SectionDetailView } from "./components/todos/SectionDetailView";
import { Modal } from "./components/common/Modal";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "listDetail" | "sectionDetail"
  >("dashboard");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null);
  const [selectedSectionName, setSelectedSectionName] = useState<string | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modal state
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubList, setShowAddSubList] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((d) => !d);

  // Navigation handlers
  const handleSelectList = (id: number, name: string) => {
    setSelectedListId(id);
    setSelectedListName(name);
    setCurrentPage("listDetail");
    setSelectedSectionName(null);
  };

  const handleGoBack = () => {
    if (currentPage === "listDetail") {
      setCurrentPage("dashboard");
      setSelectedListId(null);
      setSelectedListName(null);
      setSelectedSectionName(null);
    } else if (currentPage === "sectionDetail") {
      setCurrentPage("listDetail");
      setSelectedSectionName(null);
    }
  };

  const handleListCreated = (newListId: number, newListName: string) => {
    setSelectedListId(newListId);
    setSelectedListName(newListName);
    setCurrentPage("listDetail");
    setSelectedSectionName(null);
    setShowAddCategory(false);
  };

  const handleSubListCreated = () => {
    setShowAddSubList(false);
  };

  const handleViewSection = (sectionName: string) => {
    setSelectedSectionName(sectionName);
    setCurrentPage("sectionDetail");
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
      {currentPage === "dashboard" && (
        <div className="app-header">
          <h1 className="app-title">Todo List</h1>
          <p className="app-date">{getCurrentDate()}</p>
          <span
            className="moon-icon-placeholder"
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={toggleDarkMode}
            title="Toggle dark mode"
          ></span>
        </div>
      )}
      <div className="main-card">
        {currentPage === "dashboard" && (
          <ListDashboard
            onSelectList={handleSelectList}
            onAddCategory={() => setShowAddCategory(true)}
          />
        )}
        {currentPage === "listDetail" && selectedListId && selectedListName && (
          <TodoList
            listId={selectedListId}
            listName={selectedListName}
            onGoBack={handleGoBack}
            onAddSubList={() => setShowAddSubList(true)}
            onViewSection={handleViewSection}
          />
        )}
        {currentPage === "sectionDetail" &&
          selectedListId &&
          selectedListName &&
          selectedSectionName && (
            <SectionDetailView
              listId={selectedListId}
              listName={selectedListName}
              sectionName={selectedSectionName}
              onBackToList={handleGoBack}
            />
          )}
      </div>
      {/* Add Category Modal */}
      <Modal open={showAddCategory} onClose={() => setShowAddCategory(false)}>
        <AddListForm
          onGoBack={() => setShowAddCategory(false)}
          onListCreated={handleListCreated}
        />
      </Modal>
      {/* Add Sub List Modal */}
      <Modal open={showAddSubList} onClose={() => setShowAddSubList(false)}>
        {selectedListId && (
          <AddSubListForm
            listId={selectedListId}
            onGoBack={() => setShowAddSubList(false)}
            onSubListCreated={handleSubListCreated}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
