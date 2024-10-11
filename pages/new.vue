<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Appointment</h1>
    <form @submit.prevent="addAppointment">
      <div class="mb-4">
        <label class="block mb-2">Customer</label>
        <select v-model="customerId" class="border p-2 w-full">
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.firstName }} {{ customer.lastName }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Date</label>
        <input type="date" v-model="date" class="border p-2 w-full"/>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Time</label>
        <input type="time" v-model="time" class="border p-2 w-full"/>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Reason</label>
        <select v-model="reasonId" class="border p-2 w-full">
          <option v-for="reason in reasons" :key="reason.id" :value="reason.id">
            {{ reason.description }}
          </option>
        </select>
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2">Add Appointment</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const customers = ref([]);
const reasons = ref([]);
const customerId = ref(null);
const date = ref('');
const time = ref('');
const reasonId = ref(null);

onMounted(async () => {
  const { data: customersData } = await useFetch('/api/customers');
  customers.value = customersData.value;

  const { data: reasonsData } = await useFetch('/api/reasons');
  reasons.value = reasonsData.value;
});

const addAppointment = async () => {
  await useFetch('/api/appointments', {
    method: 'POST',
    body: {
      customerId: customerId.value,
      date: date.value,
      time: time.value,
      reasonId: reasonId.value,
    },
  });
};
</script>
