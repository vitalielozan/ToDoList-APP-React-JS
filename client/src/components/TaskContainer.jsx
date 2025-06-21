import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard.jsx';
import ControlPanel from './ControlPanel.jsx';
import EmptyMessage from './EmptyMessage.jsx';
import useTaskStore from '../store/taskStore.js';
import { filterTasks } from '../utils/functions.js';

function TaskContainer() {
  const taskList = useTaskStore((state) => state.taskList);
  const activeFilter = useTaskStore((state) => state.activeFilter);
  const filteredTasks = filterTasks(taskList, activeFilter);

  const [show, setShow] = useState(false);

  return (
    <Container fluid className='mx-2 p-3 bg-light bg-gradient min-vh-100 '>
      <Row className='mb-4'>
        <Col xs={12} lg={12} className='mx-auto'>
          <ControlPanel show={show} setShow={setShow} />
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
