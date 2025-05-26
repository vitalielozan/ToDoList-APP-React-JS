import React from 'react';
import TaskContainer from '../components/TaskContainer';
import FilterTasksProvider from '../context/FilterTasksProvider.jsx';

function App() {
  return (
    <FilterTasksProvider>
      <TaskContainer />
    </FilterTasksProvider>
  );
}

export default App;
