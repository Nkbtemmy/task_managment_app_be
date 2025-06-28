import { Router } from 'express';
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
} from '../controllers/taskController';

const router = Router();

// POST /tasks - Create task
router.post('/', createTaskController);

// GET /tasks - Get all tasks (optionally filter by userId)
router.get('/', getTasksController);

// GET /tasks/:id - Get task by ID
// router.get('/:id', getTaskByIdController);

// PATCH /tasks/:id - Update task
router.patch('/:id', updateTaskController);

// DELETE /tasks/:id - Delete task
router.delete('/:id', deleteTaskController);

export default router;
