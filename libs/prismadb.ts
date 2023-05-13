import { PrismaClient } from '@prisma/client';

const db = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prismadb = db;

export default db;
