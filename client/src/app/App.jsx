import React, { useState } from 'react';
import TaskContainer from '../components/TaskContainer';
import { useTasksContext } from '../hooks/useTasksContext';

function App() {
  const {
    taskList,
    onNewTaskAdd,
    onStatusChange,
    deleteTaskById,
    editTaskById,
  } = useTasksContext();

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
