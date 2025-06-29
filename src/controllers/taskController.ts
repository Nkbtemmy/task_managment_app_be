import { Request, Response } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../services/taskService';

export const createTaskController = async (req: Request | any, res: Response) => {
  try {
    const userId: string = req.user?.id; // ✅ from JWT middleware
    const { title, description, deadline } = req.body; // ✅ no userId here

    const task = await createTask({
      title,
      description,
      deadline: new Date(deadline),
      userId,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create task' });
  }
};


export const getTasksController = async (req: Request | any, res: Response) => {
  try {
    const userId = req.user?.id;
    const tasks = await getTasks(userId as string | undefined);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch tasks' });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.status(200).json(task); // ✅ Always return a response
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateTask(id, req.body);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update task' });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully', task: deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete task' });
  }
};
