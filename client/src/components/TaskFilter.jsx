import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { getTaskFilterItem } from '../utils/functions.js';
import { useTasksContext } from '../hooks/useTasksContext.js';
import { useFilterTasks } from '../hooks/useFilterTasks.js';

function TaskFilter() {
  const { activeFilter, setActiveFilter } = useFilterTasks();
  const { taskList = [] } = useTasksContext();
  const taskFilterItem = getTaskFilterItem(taskList);
  return (
    <Nav
      variant='tabs'
      activeKey={activeFilter}
      onSelect={(selectedKey) => setActiveFilter(selectedKey)}
    >
      {taskFilterItem.map((item) => (
        <Nav.Item key={item.name}>
          <Nav.Link eventKey={item.name}>
            {item.name} <Badge bg='secondary'>{item.count}</Badge>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default TaskFilter;
