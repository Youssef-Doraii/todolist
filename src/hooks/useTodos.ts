// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  addTodo as apiAddTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos";
import type { ToDo } from "../types";

export function useTodos(listId: number) {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<ToDo[]>({
    queryKey: ["todos", listId],
    queryFn: () => getTodos(listId),
    enabled: !!listId,
  });

  // Define a type for the payload that addTodoMutation expects
  type AddTodoPayload = { title: string; section?: string };

  // Explicitly define the generic types for useMutation:
  // <SuccessData, Error, Variables (the payload type), Context (optional)>
  const addTodoMutation = useMutation<ToDo, Error, AddTodoPayload>({
    // FIX IS HERE: The mutationFn receives the 'payload' object.
    // We then pass payload.title, listId (from hook scope), and payload.section
    mutationFn: (payload: AddTodoPayload) =>
      apiAddTodo(payload.title, listId, payload.section), // <--- CORRECTED LINE
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
      queryClient.invalidateQueries({ queryKey: ["allTodos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<ToDo[]>(["todos", listId], (oldTodos) => {
        return oldTodos?.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
      queryClient.invalidateQueries({ queryKey: ["allTodos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<ToDo[]>(["todos", listId], (oldTodos) =>
        oldTodos?.filter((todo) => todo.id !== deletedId)
      );
      queryClient.invalidateQueries({ queryKey: ["allTodos"] });
    },
  });

  return {
    todos: todosQuery.data,
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,

    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,

    isAdding: addTodoMutation.isPending,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
}
