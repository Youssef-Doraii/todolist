// src/App.tsx
import { TodoList } from "./components/todos/TodoList";
import { AddTodo } from "./components/todos/AddTodo";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          To Do List
        </h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
export default App;
