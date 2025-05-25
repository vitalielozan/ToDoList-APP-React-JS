import { status } from '../constants/index.js';

export const validateForm = (formData) => {
  const errors = {
    taskNameError: '',
    dueDateError: '',
    taskDetailsError: '',
  };

  if (!formData.taskName.trim() || formData.taskName === '') {
    errors.taskNameError = 'This field is Required';
  } else if (formData.taskName.length < 5) {
    errors.taskNameError = 'Task name must be at least 5 characters';
  }
  if (!formData.dueDate.trim() || formData.dueDate === '') {
    errors.dueDateError = 'This field is Required';
  } else if (
    new Date(formData.dueDate) < new Date(new Date().toLocaleDateString())
  ) {
    errors.dueDateError = 'Due date must be in the future';
  }

  if (!formData.taskDetails.trim() || formData.taskDetails === '') {
    errors.taskDetailsError = 'This field is Required';
  } else if (formData.taskDetails.length < 15) {
    errors.taskDetailsError = 'Task details must be at least 20 characters';
  }

  const isValid =
    !errors.taskNameError && !errors.dueDateError && !errors.taskDetailsError;

  return {
    ...errors,
    isValid,
  };
};

export const getTaskFilterItem = (taskData) => [
  { name: 'All', count: taskData.length },
  {
    name: 'To Do',
    count: taskData.filter(
      (t) => (t.status || '').toLowerCase() === status.case1
    ).length,
  },
  {
    name: 'In Progress',
    count: taskData.filter(
      (t) => (t.status || '').toLowerCase() === status.case2
    ).length,
  },
  {
    name: 'Completed',
    count: taskData.filter(
      (t) => (t.status || '').toLowerCase() === status.case4
    ).length,
  },
  {
    name: 'Pending',
    count: taskData.filter(
      (t) => (t.status || '').toLowerCase() === status.case3
    ).length,
  },
];
