import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);

  const deletedCustomer = await prisma.customer.delete({
    where: { id },
  });

  return deletedCustomer;
});
