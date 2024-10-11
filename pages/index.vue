<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Randevu Takvimi</h1>

    <!-- Takvim Başlıkları (Günler) -->
    <div class="grid grid-cols-7 gap-4 text-center font-semibold text-gray-600">
      <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
    </div>

    <!-- Takvim Günleri -->
    <div class="grid grid-cols-7 gap-4 mt-2">
      <!-- Boş Hücreler -->
      <div v-for="n in firstDayOfMonth" :key="'empty-' + n" class="h-20"></div>
      
      <!-- Ayın Günleri -->
      <div 
        v-for="day in daysInMonth" 
        :key="'day-' + day" 
        class="h-20 border rounded p-1 cursor-pointer"
        @click="openModal(day)"
      >
        <div class="text-gray-800 font-bold">{{ day }}</div>
        
        <!-- Randevu Sayısı -->
        <div v-if="getAppointmentsForDay(day).length > 0" class="text-xs mt-1 text-blue-500">
          {{ getAppointmentsForDay(day).length }} Randevu
        </div>
      </div>
    </div>

    <!-- Randevu Detayları için Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-4 max-w-md w-full space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Randevu Özeti {{ formatDate(selectedDate) }}</h2>
          <button @click="closeModal" class="text-gray-600">X</button>
        </div>
        <ul>
          <li v-for="appointment in getAppointmentsForDay(selectedDate.getDate())" :key="appointment.id" class="p-2 border-b">
           <span class="text-blue-600">{{ appointment.time }}</span>  - {{ appointment.customer.firstName }} {{ appointment.customer.lastName }} -
            <span class="text-red-600 px-2"> {{ appointment.reason.description }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { addDays, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay } from 'date-fns';

const appointments = ref([]);
const currentMonth = ref(new Date());
const selectedDate = ref(new Date());
const isModalOpen = ref(false);

// Gün isimleri dizisi
const daysOfWeek = ["Paz", "Pzt", "Salı", "Çar", "Per", "Cum", "Cmt"];

// Ayın ilk günü ve toplam gün sayısı
const firstDayOfMonth = computed(() => {
  const firstDay = startOfMonth(currentMonth.value);
  return firstDay.getDay(); // Ayın ilk günü hangi haftalık günle başlıyor
});

const daysInMonth = computed(() => {
  const start = startOfMonth(currentMonth.value);
  const end = endOfMonth(currentMonth.value);
  return Array.from({ length: end.getDate() }, (_, i) => i + 1); // Ayın tüm günlerini listeliyor
});

// Her gün için randevuları çekme
const getAppointmentsForDay = (day) => {
  const date = new Date(currentMonth.value);
  date.setDate(day);

  return appointments.value.filter(appointment => 
    isSameDay(new Date(appointment.date), date)
  );
};

// Modal Açma ve Kapatma
const openModal = (day) => {
  selectedDate.value = new Date(currentMonth.value);
  selectedDate.value.setDate(day);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Tarihi formatlama fonksiyonu

const formatDate123 = (date) => format(date, 'd MMMM yyyy', { locale: tr });
const formatDate = (date) => format(date, 'dd-MM-yyyy');

// Randevuları API'den çekme
onMounted(async () => {
  const { data: appointmentData } = await useFetch('/api/appointments/today');
  appointments.value = appointmentData.value.map((appointment) => ({
    ...appointment,
    date: new Date(appointment.date),
  }));
});
</script>

<style scoped>
/* Modal için özel stiller */
.fixed {
  z-index: 50;
}
</style>



<!-- <script setup>
import { ref, onMounted } from 'vue';

const appointments = ref([]);

onMounted(async () => {
  
  const { data: todayAppointments } = await useFetch('/api/appointments/today');
  appointments.value = todayAppointments.value;
  console.log('DATA',todayAppointments)
});




// Tarihi formatlayan fonksiyon
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR'); // YYYY-MM-DD formatı için en-CA (Kanada) standardı
};
</script> -->