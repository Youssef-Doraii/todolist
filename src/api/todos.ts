//Fetches todos.
import axios from "axios";
import type { ToDo } from "../types/todo";
const BASE_URL = "http://localhost:3001";

export async function getTodos(): Promise<ToDo[]> {
  const response = await axios.get<ToDo[]>(`${BASE_URL}/todos`);
  return response.data;
}

//Adds a new todo to your list or backend (if connected).
export async function addTodo(newTodo: Omit<ToDo, "id">): Promise<ToDo> {
  const response = await axios.post(`${BASE_URL}/todos`, newTodo);
  return response.data;
}

//edits a todo
export async function updateTodo(todo: ToDo): Promise<ToDo> {
  const response = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo);
  return response.data;
}

//Deletes one or multiple todos.
export async function deleteTodo(id: number) {
  // Sends DELETE request to your backend to remove the todo with given id
  await axios.delete(`${BASE_URL}/todos/${id}`);
  // No need to return data since JSON Server returns empty response on delete
}
