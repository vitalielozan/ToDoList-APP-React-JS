import React from 'react';
import { Button, Modal, Container } from 'react-bootstrap';
import CreateTaskForm from './CreateTaskForm';

function ControlPanel(props) {
  const { show, setShow, onNewTaskAdd, taskData } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewTask = (newTask) => {
    onNewTaskAdd(newTask);
    handleClose();
  };

  return (
    <Container className="p-3 bg-transparent rounded shadow border-0 d-flex justify-content-between align-items-center">
      <div>
        <h2 className="mb-1">Tasks List</h2>
        <p className="text-muted">Manage your tasks efficiently</p>
      </div>

      {taskData.length > 0 && (
        <Button variant="primary" onClick={handleShow}>
          Create Task
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskForm addNewTask={handleNewTask} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ControlPanel;
