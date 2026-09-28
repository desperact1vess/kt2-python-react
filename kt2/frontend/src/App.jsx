import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="page">
      <header className="top">
        <h1>Доска задач</h1>
      </header>
      <NewTaskForm />
      <TaskList />
    </div>
  );
}

export default App;
