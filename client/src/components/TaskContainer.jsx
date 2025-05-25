import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard';
import ControlPanel from './ControlPanel';
import EmptyMessage from './EmptyMessage';

function TaskContainer({
  taskData = [],
  allTasks = [],
  onFilterChange,
  activeFilter,
  onNewTaskAdd,
  onStatusChange,
  onTaskDeleted,
  onTaskEdited,
}) {
  const [show, setShow] = useState(false);

  return (
    <Container fluid className="mx-2 p-3 bg-light bg-gradient min-vh-100 ">
      <Row className="mb-4">
        <Col xs={12} lg={12} className="mx-auto">
          <ControlPanel
            taskData={allTasks}
            hasTasks={taskData.length > 0}
            show={show}
            setShow={setShow}
            onNewTaskAdd={onNewTaskAdd}
            onFilterChange={onFilterChange}
            activeFilter={activeFilter}
          />
        </Col>
      </Row>
      <Row>
        {taskData.length > 0 ? (
          taskData.map((item) => (
            <Col
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 d-flex"
            >
              <TaskCard
                id={item.id}
                status={item.status}
                taskDetails={item.taskDetails}
                taskName={item.taskName}
                dueDate={item.dueDate}
                onStatusChange={onStatusChange}
                onTaskDeleted={onTaskDeleted}
                onTaskEdited={onTaskEdited}
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
