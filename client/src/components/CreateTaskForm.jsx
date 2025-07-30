import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Form, Button } from 'react-bootstrap';
import { validateForm } from '../utils/functions.js';
import { status } from '../constants/constants.js';

function CreateTaskForm({ addNewTask }) {
  const [formData, setFormData] = useState({
    taskName: '',
    dueDate: '',
    status: status.TODO,
    taskDetails: '',
  });

  const [formValidation, setFormValidation] = useState({
    taskNameError: '',
    dueDateError: '',
    taskDetailsError: '',
    isValid: true,
  });

  useEffect(() => {
    setFormValidation(validateForm(formData));
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      taskName: '',
      dueDate: '',
      status: status.TODO,
      taskDetails: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValidation.isValid) return;
    addNewTask(formData);
    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='taskName'>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          type='text'
          name='taskName'
          value={formData.taskName}
          onChange={handleInputChange}
          placeholder='Enter task name'
          className={clsx(
            'form-control',
            formValidation.taskNameError && 'border border-danger'
          )}
        />
        <p className='ps-1 text-danger'>{formValidation.taskNameError}</p>
      </Form.Group>

      <Form.Group className='mb-3' controlId='dueDate'>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type='date'
          name='dueDate'
          value={formData.dueDate}
          onChange={handleInputChange}
          className={clsx(
            'form-control',
            formValidation.dueDateError && 'border border-danger'
          )}
        />
        <p className='ps-1 text-danger'>{formValidation.dueDateError}</p>
      </Form.Group>

      <Form.Group className='mb-3' controlId='taskDetails'>
        <Form.Label>Task Details</Form.Label>
        <Form.Control
          as='textarea'
          rows={4}
          className={clsx(
            'form-control',
            formValidation.taskDetailsError && 'border border-danger'
          )}
          name='taskDetails'
          value={formData.taskDetails}
          onChange={handleInputChange}
          placeholder='Enter details'
        />
        <p className='ps-1 text-danger'>{formValidation.taskDetailsError}</p>
      </Form.Group>

      <Form.Group className='mb-3' controlId='status'>
        <Form.Label>Status</Form.Label>
        <Form.Select
          name='status'
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value={status.TODO}>To Do</option>
          <option value={status.INPROGRESS}>In Progress</option>
          <option value={status.PENDING}>Pending</option>
          <option value={status.COMPLETED}>Completed</option>
        </Form.Select>
        <p className='text-danger'></p>
      </Form.Group>

      <Button
        disabled={!formValidation.isValid}
        variant='primary'
        type='submit'
      >
        Add Task
      </Button>
    </Form>
  );
}

export default CreateTaskForm;
