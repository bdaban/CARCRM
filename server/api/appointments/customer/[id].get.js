import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const customerId = parseInt(event.context.params.id);

  const appointments = await prisma.appointment.findMany({
    where: { customerId },
  });

  return appointments;
});
