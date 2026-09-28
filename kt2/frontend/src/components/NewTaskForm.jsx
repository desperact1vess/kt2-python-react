import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_TASK } from "../graphql/mutations";
import { GET_TASKS } from "../graphql/queries";

function NewTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
    awaitRefetchQueries: true,
  });

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    try {
      await addTask({
        variables: {
          input: {
            title: title.trim(),
            description: description.trim(),
            categoryName: "Без категории",
          },
        },
      });
      setTitle("");
      setDescription("");
    } catch {
      // ошибка показывается ниже через error
    }
  }

  return (
    <form className="new-task" onSubmit={onSubmit}>
      <label>
        Название
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Описание
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </label>
      {error && <p className="warn">Ошибка создания задачи: {error.message}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Ждём..." : "Создать задачу"}
      </button>
    </form>
  );
}

export default NewTaskForm;
