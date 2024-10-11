import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);
  const body = await readBody(event);

  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      plate: body.plate,
    },
  });

  return updatedCustomer;
});
