// src/types/index.ts

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
  section?: string;
}

export interface TodoListCategory {
  id: number;
  name: string;
}
