import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard';
import ControlPanel from './ControlPanel';
import EmptyMessage from './EmptyMessage';
import { useTasksContext } from '../hooks/useTasksContext';

function TaskContainer() {
  const { taskList } = useTasksContext();

  const [show, setShow] = useState(false);

  const [activeFilter, setActiveFilter] = useState('All');

  const normalize = (text) => (text || '').toLowerCase().replace(/\s+/g, '');

  const filteredTasks =
    activeFilter === 'All'
      ? taskList
      : taskList.filter(
          (task) => normalize(task.status) === normalize(activeFilter)
        );

  return (
    <Container fluid className='mx-2 p-3 bg-light bg-gradient min-vh-100 '>
      <Row className='mb-4'>
        <Col xs={12} lg={12} className='mx-auto'>
          <ControlPanel
            taskList={taskList}
            hasTasks={filteredTasks.length > 0}
            show={show}
            setShow={setShow}
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
          />
        </Col>
      </Row>
      <Row>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item) => (
            <Col
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className='mb-4 d-flex'
            >
              <TaskCard
                id={item.id}
                status={item.status}
                taskDetails={item.taskDetails}
                taskName={item.taskName}
                dueDate={item.dueDate}
              />
            </Col>
          ))
        ) : (
          <EmptyMessage onCreateTaskClick={setShow} />
        )}
      </Row>
    </Container>
  );
}

export default TaskContainer;
