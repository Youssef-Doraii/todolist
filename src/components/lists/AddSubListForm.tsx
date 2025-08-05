import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSectionToList } from "../../api/todos";

interface AddSubListFormProps {
  listId: number;
  onGoBack: () => void;
  onSubListCreated?: () => void;
}

export function AddSubListForm({
  listId,
  onGoBack,
  onSubListCreated,
}: AddSubListFormProps) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (sectionName: string) => addSectionToList(listId, sectionName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTodos"] });
      if (onSubListCreated) onSubListCreated();
      onGoBack();
    },
  });

  return (
    <div className="add-list-form-container">
      <button className="back-button" onClick={onGoBack}>
        ← Go Back
      </button>
      <h2 className="main-title">Add New Sub List</h2>
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
          placeholder="Sub list name"
          className="add-list-input"
        />
        <button
          type="submit"
          className="create-list-button"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Sub List"}
        </button>
      </form>
    </div>
  );
}
