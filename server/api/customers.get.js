import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const customers = await prisma.customer.findMany();  // Tüm müşterileri getiriyoruz
  return customers;
});
