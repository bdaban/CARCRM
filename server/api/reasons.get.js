import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const reasons = await prisma.reason.findMany();
  return reasons;
});
