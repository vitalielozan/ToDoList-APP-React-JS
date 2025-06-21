import React, { useEffect } from 'react';
import TaskContainer from '../components/TaskContainer';
import useTaskStore from '../store/taskStore';

function App() {
  // const fetchTasks = useTaskStore((state) => state.fetchTasks);

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
