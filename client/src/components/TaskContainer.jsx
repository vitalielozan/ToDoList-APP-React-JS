import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard.jsx';
import ControlPanel from './ControlPanel.jsx';
import EmptyMessage from './EmptyMessage.jsx';
import { useFilterTasks } from '../hooks/useFilterTasks.js';

function TaskContainer() {
  const { filteredTasks } = useFilterTasks();

  return (
    <Container fluid className='mx-2 p-3 bg-light bg-gradient min-vh-100 '>
      <Row className='mb-4'>
        <Col xs={12} lg={12} className='mx-auto'>
          <ControlPanel />
        </Col>
      </Row>
      <Row>
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((item, index) => (
            <Col
              key={item._id || index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className='mb-4 d-flex'
            >
              <TaskCard task={item} index={index} />
            </Col>
          ))
        ) : (
          <EmptyMessage />
        )}
      </Row>
    </Container>
  );
}

export default TaskContainer;
