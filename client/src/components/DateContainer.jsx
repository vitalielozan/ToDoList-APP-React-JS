import React, { useState } from 'react';
import { Stack, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { useTasksContext } from '../hooks/useTasksContext';

function DateContainer({ id, taskName, dueDate, status, taskDetails }) {
  const { deleteTaskById, editTaskById } = useTasksContext();
  const parsedDate =
    dueDate instanceof Date
      ? dueDate.toLocaleDateString()
      : new Date(dueDate).toLocaleDateString();

  const [showModal, setShowModal] = useState(false);
  const [editedDetails, setEditedDetails] = useState(taskDetails);
  const [editedName, setEditedName] = useState(taskName);

  const handleDelete = () => {
    if (window.confirm('Are you sure to delete this task?')) {
      deleteTaskById(id);
    }
  };

  const handleEditTask = () => {
    setEditedDetails(taskDetails);
    setEditedName(taskName);
    setShowModal(true);
  };

  const handleSave = async () => {
    await editTaskById(id, {
      taskName: editedName,
      taskDetails: editedDetails,
      dueDate,
      status,
    });
    setShowModal(false);
  };

  return (
    <>
      <Stack gap={3} direction='horizontal' className='justify-content-between'>
        {status === 'completed' ? (
          <Button onClick={handleDelete} variant='danger' size='sm'>
            Delete Task
          </Button>
        ) : (
          <Button onClick={handleEditTask} variant='warning' size='sm'>
            Edit Task
          </Button>
        )}
        <Stack gap={0} className='text-end'>
          <small className='text-muted'>Due Date</small>
          <strong>{parsedDate}</strong>
        </Stack>
      </Stack>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formTaskName'>
              <Form.Label>Task Name</Form.Label>
              <FormControl
                type='text'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formTaskDetails'>
              <Form.Label>Task Details</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                value={editedDetails}
                onChange={(e) => setEditedDetails(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DateContainer;
