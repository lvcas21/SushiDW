import { useTask } from "../context/TasksContext";
import { useEffect } from "react";
import Taskcard from "../components/taskcard";

function TaskPage() {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1>No Tasks</h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <Taskcard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TaskPage;
