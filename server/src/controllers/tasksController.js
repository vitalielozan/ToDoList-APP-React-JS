import mongoose from 'mongoose';
import Task from '../models/Task.js';

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching notes', error: error.message });
  }
}

export async function createTask(req, res) {
  const { taskName, taskDetails, dueDate, status } = req.body;
  try {
    const newTask = new Task({
      taskName,
      taskDetails,
      dueDate: new Date(req.body.dueDate),
      status,
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating task', error: error.message });
  }
}

export async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const task = await Task.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching task', error: error.message });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { ...req.body, dueDate: new Date(req.body.dueDate) },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res
      .status(200)
      .json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating task', error: error.message });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const deletedTask = await Task.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res
      .status(200)
      .json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting task', error: error.message });
  }
}
