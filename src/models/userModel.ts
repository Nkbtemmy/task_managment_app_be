import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Create a new user
export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};
