import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { getTaskFilterItem } from '../utils/functions.js';

function TaskFilter({ taskData, onFilterSelect, activeFilter }) {
  const taskFilterItem = getTaskFilterItem(taskData);
  return (
    <Nav
      variant="tabs"
      activeKey={activeFilter}
      onSelect={(selectedKey) => onFilterSelect(selectedKey)}
    >
      {taskFilterItem.map((item) => (
        <Nav.Item key={item.name}>
          <Nav.Link eventKey={item.name}>
            {item.name} <Badge bg="secondary">{item.count}</Badge>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default TaskFilter;
