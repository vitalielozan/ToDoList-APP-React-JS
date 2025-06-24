import React, { useState } from 'react';
import { Stack, Button, Modal, Form, FormControl } from 'react-bootstrap';
import useTaskStore from '../store/taskStore.js';

function DateContainer({ id, taskName, dueDate, status, taskDetails }) {
  const onTaskEdited = useTaskStore((state) => state.editTaskById);
  const onTaskDeleted = useTaskStore((state) => state.deleteTaskById);

  const parsedDate =
    dueDate instanceof Date
      ? dueDate.toLocaleDateString()
      : new Date(dueDate).toLocaleDateString();

  const [showModal, setShowModal] = useState(false);
  const [editedDetails, setEditedDetails] = useState(taskDetails);
  const [editedName, setEditedName] = useState(taskName);
  const [editedDate, setEditedDate] = useState(dueDate);

  const handleDelete = async () => {
    if (window.confirm('Are you sure to delete this task?')) {
      await onTaskDeleted(id);
    }
  };

  const handleEditTask = () => {
    setEditedDetails(taskDetails);
    setEditedName(taskName);
    setEditedDate(dueDate);
    setShowModal(true);
  };

  const handleSave = async () => {
    await onTaskEdited(id, {
      taskName: editedName,
      taskDetails: editedDetails,
      dueDate: editedDate,
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
            <Form.Group controlId='formDueDate'>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type='date'
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
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
