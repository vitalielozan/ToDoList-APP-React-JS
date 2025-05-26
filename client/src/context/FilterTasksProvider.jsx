import React, { useState, useMemo } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { FilterTasksContext } from './context';

function FilterTasksProvider({ children }) {
  const { taskList } = useTasksContext();
  const [show, setShow] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const normalize = (text) => (text || '').toLowerCase().replace(/\s+/g, '');

  const filteredTasks = useMemo(() => {
    return activeFilter === 'All'
      ? taskList
      : taskList.filter(
          (task) => normalize(task.status) === normalize(activeFilter)
        );
  }, [taskList, activeFilter]);

  return (
    <FilterTasksContext.Provider
      value={{ show, setShow, activeFilter, setActiveFilter, filteredTasks }}
    >
      {children}
    </FilterTasksContext.Provider>
  );
}

export default FilterTasksProvider;
