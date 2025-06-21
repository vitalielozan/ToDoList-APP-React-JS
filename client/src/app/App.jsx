import React, { useEffect } from 'react';
import TaskContainer from '../components/TaskContainer.jsx';
import useTaskStore from '../store/taskStore.js';

function App() {
  useEffect(() => {
    useTaskStore.getState().fetchTasks();
  }, []);

  return (
    <>
      <TaskContainer />
    </>
  );
}

export default App;
