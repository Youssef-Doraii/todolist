// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos"; // Import all API functions from the combined file
import type { ToDo } from "../types/todo"; // Import ToDo type from your types folder

export function useTodos() {
  const queryClient = useQueryClient();

  // Query for fetching all todos
  const todosQuery = useQuery<ToDo[]>({
    queryKey: ["todos"], // Unique key for this query
    queryFn: getTodos, // The function that fetches the data
  });

  // Mutation for adding a new todo
  const addTodoMutation = useMutation({
    mutationFn: addTodo, // The function that performs the add operation
    onSuccess: () => {
      // Invalidate the 'todos' query to refetch the list after a successful add
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for updating a todo (used for toggling completion)
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo, // The function that performs the update operation
    onSuccess: () => {
      // Invalidate the 'todos' query to refetch the list after a successful update
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo, // The function that performs the delete operation
    onSuccess: () => {
      // Invalidate the 'todos' query to refetch the list after a successful delete
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    // Expose the data and status from the todos query
    todos: todosQuery.data,
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,

    // Expose the mutation functions for components to use
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,

    // Expose loading/pending states for mutations for UI feedback
    isAdding: addTodoMutation.isPending,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
}
