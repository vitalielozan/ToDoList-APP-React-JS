import React, { useState, useEffect } from 'react';
import { TasksContext } from './context.js';
import api from '../lib/axios.js';

function TasksProvider({ children }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/get');
        setTaskList(response.data);
      } catch (error) {
        console.log('Error fetching tasks', error.message);
      }
    };
    fetchTasks();
  }, []);

  const onNewTaskAdd = async (formData) => {
    try {
      const response = await api.post('/add', {
        ...formData,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
      });
      setTaskList((prev) => [...prev, response.data]);
    } catch (error) {
      console.log('Error adding new task:', error.message);
    }
  };

  const onStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/status/${taskId}`, {
        status: newStatus,
      });
      setTaskList((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.log('Error updating task status:', error.message);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log('Error on deleting task:', error.message);
    }
  };

  const editTaskById = async (id, updatedList) => {
    try {
      const response = await api.put(`/edit/${id}`, updatedList);
      const updatedTask = response.data;
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.log('Error on editing task:', error.message);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        taskList,
        onNewTaskAdd,
        onStatusChange,
        deleteTaskById,
        editTaskById,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
