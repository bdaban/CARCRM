import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const newReason = await prisma.reason.create({
    data: {
      description: body.description,
    },
  });

  return newReason;
});
