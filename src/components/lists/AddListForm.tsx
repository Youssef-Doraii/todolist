import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodoList } from "../../api/todos";
import "./AddListForm.css";

interface AddListFormProps {
  onGoBack: () => void;
  onListCreated: (id: number, name: string) => void;
}

export function AddListForm({ onGoBack, onListCreated }: AddListFormProps) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (name: string) => addTodoList(name),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      onListCreated(Number(data.id), data.name);
    },
  });

  return (
    <div className="add-list-form-container">
      <button className="back-button" onClick={onGoBack}>
        ← Go Back
      </button>
      <h2 className="main-title">Add New List</h2>
      <form
        className="add-list-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) mutation.mutate(name.trim());
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="List name"
          className="add-list-input"
        />
        <button
          type="submit"
          className="create-list-button"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create List"}
        </button>
      </form>
    </div>
  );
}
