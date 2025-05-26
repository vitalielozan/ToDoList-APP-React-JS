import { useState, useEffect } from 'react';
import { TasksContext } from './context';
import axios from 'axios';

function TasksProvider({ children }) {
  const [taskList, setTaskList] = useState([]);

  const API_URL = 'http://localhost:3001/tasks';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTaskList(response.data);
      } catch (error) {
        console.log('Error fetching tasks', error.message);
      }
    };
    fetchTasks();
  }, []);

  const onNewTaskAdd = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}`, {
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
      await axios.patch(`${API_URL}/${taskId}`, {
        status: newStatus,
      });
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.log('Error updating task status:', error.message);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log('Error on deleting task:', error.message);
    }
  };

  const editTaskById = async (id, updatedList) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedList);
      const updatedTask = response.data;
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
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

/* 
   taskList,
    onNewTaskAdd,
    onStatusChange,
    deleteTaskById,
    editTaskById,
*/
