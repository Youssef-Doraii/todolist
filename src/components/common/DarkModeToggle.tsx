import React from "react";
import "./DarkModeToggle.css";

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDark,
  onToggle,
}) => {
  return (
    <button
      className={`dark-mode-toggle ${isDark ? "dark" : ""}`}
      onClick={onToggle}
      aria-label="Toggle dark mode"
    >
      <div className="toggle-track">
        <div className="toggle-thumb" />
      </div>
    </button>
  );
};
