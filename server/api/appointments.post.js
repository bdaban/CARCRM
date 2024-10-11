import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const newAppointment = await prisma.appointment.create({
    data: {
      date: new Date(body.date),
      time: body.time,
      customerId: body.customerId,
      reasonId: body.reasonId,  // Randevu sebebini ekledik
    },
  });

  return newAppointment;
});
