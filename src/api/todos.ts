import axios from "axios";
import type { ToDo, TodoListCategory } from "../types";

const BASE_URL = "http://localhost:3001";

// Fetches todos for a specific listId
export async function getTodos(listId: number): Promise<ToDo[]> {
  const response = await axios.get<ToDo[]>(`${BASE_URL}/todos`, {
    params: { listId: listId },
  });
  return response.data;
}

export async function addTodo(
  title: string,
  listId: number,
  section?: string
): Promise<ToDo> {
  const newTodo = { title, completed: false, listId, section };
  const response = await axios.post<ToDo>(`${BASE_URL}/todos`, newTodo);
  return response.data;
}

// Edits an existing todo
export async function updateTodo(todo: ToDo): Promise<ToDo> {
  const response = await axios.put<ToDo>(`${BASE_URL}/todos/${todo.id}`, todo);
  return response.data;
}

// Deletes a todo
export async function deleteTodo(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/todos/${id}`);
}

// Function to get ALL todos (for dashboard counts)
export async function getAllTodos(): Promise<ToDo[]> {
  const response = await axios.get<ToDo[]>(`${BASE_URL}/todos`);
  return response.data;
}

// Fetches all todo lists/categories
export async function getTodoLists(): Promise<TodoListCategory[]> {
  const response = await axios.get<TodoListCategory[]>(`${BASE_URL}/todoLists`);
  return response.data;
}

// Adds a new todo list/category
export async function addTodoList(name: string): Promise<TodoListCategory> {
  const newList = { name };
  const response = await axios.post<TodoListCategory>(
    `${BASE_URL}/todoLists`,
    newList
  );
  return response.data;
}

// Edits an existing todo list/category
export async function updateTodoList(
  updatedList: TodoListCategory
): Promise<TodoListCategory> {
  const response = await axios.put<TodoListCategory>(
    `${BASE_URL}/todoLists/${updatedList.id}`,
    updatedList
  );
  return response.data;
}

// Deletes a todo list/category and associated todos
export async function deleteTodoList(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/todoLists/${id}`);
}

export async function addSectionToList(listId: number, sectionName: string) {
  // Create a dummy todo to represent the new section
  const newTodo = {
    title: "(Section Header)",
    completed: false,
    listId,
    section: sectionName,
    isSectionHeader: true,
  };
  const response = await axios.post<ToDo>(`${BASE_URL}/todos`, newTodo);
  return response.data;
}
