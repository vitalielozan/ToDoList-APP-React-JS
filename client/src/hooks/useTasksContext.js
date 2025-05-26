import { useContext } from 'react';
import { TasksContext } from '../context/context.js';

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a QuizProvider');
  }
  return context;
};
