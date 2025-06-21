import { create } from 'zustand';
import { API_URL } from '../constants/constants.js';
import axios from 'axios';

const useTaskStore = create((set) => ({
  taskList: [],

  fetchTasks: async () => {
    try {
      const response = await axios.get(API_URL);
      set({ taskList: response.data });
    } catch (error) {
      console.log('Error fetching tasks', error.message);
    }
  },

  onNewTaskAdd: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}`, {
        ...formData,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
      });
      set((state) => ({ taskList: [...state.taskList, response.data] }));
    } catch (error) {
      console.log('Error adding new task:', error.message);
    }
  },

  onStatusChange: async (taskId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/${taskId}`, {
        status: newStatus,
      });
      set((state) => ({
        taskList: state.taskList.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      }));
    } catch (error) {
      console.log('Error updating task status:', error.message);
    }
  },

  deleteTaskById: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        taskList: state.taskList.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.log('Error on deleting task:', error.message);
    }
  },

  editTaskById: async (id, updatedList) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedList);
      const updatedTask = response.data;
      set((state) => ({
        taskList: state.taskList.map((task) =>
          task.id === id ? updatedTask : task
        ),
      }));
    } catch (error) {
      console.log('Error on editing task:', error.message);
    }
  },
}));

export default useTaskStore;
