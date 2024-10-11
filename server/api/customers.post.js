
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const newCustomer = await prisma.customer.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      plate: body.plate,
    },
  });

  return newCustomer;
});

