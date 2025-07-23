// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";
import type { ToDo } from "../types"; // Keep 'type' keyword due to verbatimModuleSyntax

export function useTodos(listId: number) {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<ToDo[]>({
    queryKey: ["todos", listId],
    queryFn: () => getTodos(listId),
    enabled: !!listId,
  });

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => addTodo(title, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
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
    },
  });

  const deleteTodoMutation = useMutation({
    // mutationFn receives the ID of the todo to delete
    mutationFn: deleteTodo,
    // onSuccess now correctly receives the variables (the id) as the second argument
    onSuccess: (_, deletedId) => {
      // <--- FIX IS HERE: Add '_' for result and 'deletedId' for variables
      queryClient.setQueryData<ToDo[]>(["todos", listId], (oldTodos) =>
        oldTodos?.filter((todo) => todo.id !== deletedId)
      );
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
