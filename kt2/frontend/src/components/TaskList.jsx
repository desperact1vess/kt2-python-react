import { useQuery, useMutation } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries";
import { MARK_DONE } from "../graphql/mutations";

function TaskList() {
  const { data, loading, error } = useQuery(GET_TASKS);
  const [markDone] = useMutation(MARK_DONE, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  if (loading) {
    return <div className="panel">Загрузка данных...</div>;
  }

  if (error) {
    return (
      <div className="panel bad">
        Не удалось загрузить задачи. Сервер недоступен — запусти backend на
        порту 8001.
        <br />
        <small>Ошибка: {error.message}</small>
      </div>
    );
  }

  const tasks = data?.allTasks || [];

  if (tasks.length === 0) {
    return <div className="panel">Задач пока нет</div>;
  }

  return (
    <div className="board">
      {tasks.map((task) => (
        <article key={task.id} className={task.isCompleted ? "card done" : "card"}>
          <header>
            <h3>{task.title}</h3>
            <span style={{ color: task.category.color }}>{task.category.name}</span>
          </header>
          <p>{task.description || "без описания"}</p>
          <footer>
            <small>{task.isCompleted ? "сделано" : "открыта"}</small>
            {!task.isCompleted && (
              <button
                type="button"
                onClick={() => markDone({ variables: { id: task.id } }).catch(() => {})}
              >
                Отметить
              </button>
            )}
          </footer>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
