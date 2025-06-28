import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new task
export async function createTask(data: {
  title: string;
  description: string;
  deadline: Date;
  userId: string;
}): Promise<Task> {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      userId: data.userId,
    },
  });
}

// Get all tasks (optionally by user)
export async function getTasks(userId?: string): Promise<Task[]> {
  return prisma.task.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { deadline: 'asc' },
  });
}

// Get a single task by ID
export async function getTaskById(id: string): Promise<Task | null> {
  return prisma.task.findUnique({
    where: { id },
  });
}

// Update a task
export async function updateTask(id: string, data: Partial<Omit<Task, 'id' | 'userId'>>): Promise<Task | null> {
  return prisma.task.update({
    where: { id },
    data,
  });
}

// Delete a task
export async function deleteTask(id: string): Promise<Task | null> {
  return prisma.task.delete({
    where: { id },
  });
}