<template>
  <div>
    <h2>Today's Appointments</h2>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        {{ appointment.customer.firstName }} {{ appointment.customer.lastName }} - {{ appointment.time }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const appointments = ref([]);

onMounted(async () => {
  const { data } = await useFetch('/api/appointments/today');
  appointments.value = data.value;
});
</script>
