import { PrismaClient } from '@prisma/client';
import { contract } from './contract';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({ contract });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
