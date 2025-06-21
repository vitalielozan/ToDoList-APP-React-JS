import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { getTaskFilterItem } from '../utils/functions.js';
import useTaskStore from '../store/taskStore.js';

function TaskFilter() {
  const taskList = useTaskStore((state) => state.taskList);
  const activeFilter = useTaskStore((state) => state.activeFilter);
  const setActiveFilter = useTaskStore((state) => state.setActiveFilter);
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
