import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CreateTaskForm from './CreateTaskForm';
import TaskFilter from './TaskFilter';

function ControlPanel({
  show,
  setShow,
  hasTasks,
  onNewTaskAdd,
  taskData,
  onFilterChange,
  activeFilter,
}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewTask = (newTask) => {
    onNewTaskAdd(newTask);
    handleClose();
  };

  return (
    <div className="mx-2 p-3 bg-transparent rounded shadow border-0 d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column">
        <h2 className="mb-1">Tasks List</h2>
        <p className="text-muted">Manage your tasks efficiently</p>

        <TaskFilter
          taskData={taskData}
          onFilterSelect={onFilterChange}
          activeFilter={activeFilter}
        />
      </div>
      {hasTasks ? (
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" onClick={handleShow}>
            Create Task
          </Button>
        </div>
      ) : null}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskForm addNewTask={handleNewTask} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ControlPanel;
