import express from 'express';
import * as tasksController from '../controllers/tasksController.js';

const { createTask, deleteTask, getAllTasks, updateStatus, updateTask } =
  tasksController;

const router = express.Router();

router.get('/get', getAllTasks);
router.patch('/status/:id', updateStatus);
router.post('/add', createTask);
router.put('/edit/:id', updateTask);
router.delete('delete/:id', deleteTask);

export default router;
