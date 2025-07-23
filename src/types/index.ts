// src/types/index.ts

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
}

export interface TodoListCategory {
  id: number;
  name: string;
}
