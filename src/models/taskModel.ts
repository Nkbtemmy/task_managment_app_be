import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch tasks by userId
export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: {
      userId,
    },
  });
};

// Create a new task
export const createTask = async (
  title: string,
  description: string,
  deadline: Date,
  userId: string
): Promise<Task> => {
  return await prisma.task.create({
    data: {
      title,
      description,
      deadline,
      userId,
    },
  });
};
