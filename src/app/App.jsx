import React from 'react';
import TaskContainer from '../components/TaskContainer';
import { useTasks } from '../hooks/useTasks';

function App() {
  const {
    taskList,
    onNewTaskAdd,
    onStatusChange,
    deleteTaskById,
    editTaskById,
  } = useTasks();

  return (
    <>
      <TaskContainer
        onNewTaskAdd={onNewTaskAdd}
        taskData={taskList}
        onStatusChange={onStatusChange}
        onTaskDeleted={deleteTaskById}
        onTaskEdited={editTaskById}
      />
    </>
  );
}

export default App;
