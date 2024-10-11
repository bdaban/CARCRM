import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Bugünün başlangıç saati

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 30); // Yarın (bugünün son saati)

  // Bugünkü randevuları getiren sorgu
  const todayAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: today,   // Bugün saat 00:00'den büyük veya eşit
        lt: tomorrow  // Yarın saat 00:00'den küçük
      },
    },
    orderBy:{
      time:'asc'
    },
    include: {
      customer: true, // Müşteri bilgilerini de alıyoruz
      reason: true,   // Randevu sebebini de alıyoruz
    },
  });

  return todayAppointments;
});
