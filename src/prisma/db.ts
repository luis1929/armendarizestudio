import postgres from '@prisma/orm-postgres/runtime';
import { contract } from './contract';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any | undefined };

export const db: any = globalForPrisma.prisma ?? postgres({ contract, url: process.env['DATABASE_URL']! });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
