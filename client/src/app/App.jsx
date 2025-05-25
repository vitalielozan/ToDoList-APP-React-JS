import React, { useState } from 'react';
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

  const [activeFilter, setActiveFilter] = useState('All');

  const normalize = (text) => (text || '').toLowerCase().replace(/\s+/g, '');

  const filteredTasks =
    activeFilter === 'All'
      ? taskList
      : taskList.filter(
          (task) => normalize(task.status) === normalize(activeFilter)
        );

  return (
    <>
      <TaskContainer
        onNewTaskAdd={onNewTaskAdd}
        taskData={filteredTasks}
        allTasks={taskList}
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
        onStatusChange={onStatusChange}
        onTaskDeleted={deleteTaskById}
        onTaskEdited={editTaskById}
      />
    </>
  );
}

export default App;
