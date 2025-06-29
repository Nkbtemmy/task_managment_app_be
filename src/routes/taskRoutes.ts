import { RequestHandler, Router } from 'express';
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController
} from '../controllers/taskController';
import { authenticate, authorize } from '../middlewares/authMiddleware';


const router = Router();
// All routes require authentication
router.use(authenticate as RequestHandler);

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
