import { z } from 'zod';

export const UserRole = z.enum(['admin', 'user', 'moderator']);

export const createUserSchema = z.object({
  username: z.string().min(4).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(255),
  role: UserRole.default('user'),
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  phoneNumber: z.string().min(10).max(20).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;