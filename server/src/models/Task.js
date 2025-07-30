import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDetails: {
      type: String,
      required: true,
    },
    dueDate: { type: Date, default: Date.now },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
