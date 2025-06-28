import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export const createUser = async (data: { name: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const getProfile = async (userId: String) => {
  return prisma.user.findUnique({
    where: { id: String(userId) },
  });
};

export const updateProfile = async (userId: String, data: { name?: string; email?: string }) => {
  return prisma.user.update({
    where: { id: String(userId) },
    data,
  });
};

export const listUsers = async () => {
  return prisma.user.findMany();
};

export const deleteUser = async (userId: String) => {
  return prisma.user.delete({
    where: { id: String(userId) },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const resetUserPassword = async (email: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  return { message: 'Password reset successfully' };
};


export const updateUserEmail = async (userId: string, email: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: { email },
  });

  return { message: 'Email updated successfully' };
};
