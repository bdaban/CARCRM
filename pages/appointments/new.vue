<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Randevu Ekle</h1>

    <!-- Müşteri Seçimi -->
    <div>
      <label class="block text-sm font-medium mb-2">Müşteri Seç</label>
      <a-select
        show-search
        v-model:value="customerId"
        :options="filteredCustomers"
        :filterOption="filterCustomer"
        placeholder="Ara"
        class="w-full"
      >
        <a-select-option v-for="customer in customers" :key="customer.value" :value="customer.value">
          {{ customer.label }}
        </a-select-option>
      </a-select>
    </div>

    <!-- Tarih ve Saat Seçimi -->
    <div>
      <label class="block text-sm font-medium mb-2">Tarih</label>
      <input type="date" v-model="date" class="border p-2 w-full rounded" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">Saat</label>
      <input type="time" v-model="time" class="border p-2 w-full rounded" />
    </div>

    <!-- Randevu Sebebi -->
    <div>
      <label class="block text-sm font-medium mb-2">İşlem</label>
      <select v-model="reasonId" class="border p-2 w-full rounded">
        <option v-for="reason in reasons" :key="reason.id" :value="reason.id">
          {{ reason.description }}
        </option>
      </select>
    </div>

    <!-- Kaydet Butonu -->
    <button @click="addAppointment" class="bg-blue-500 text-white py-2 px-4 rounded w-full">
      Kaydet
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const router = useRouter(); // Yönlendirme işlemi için router'ı tanımlıyoruz

const customers = ref([]);
const filteredCustomers = ref([]);
const reasons = ref([]);
const customerId = ref(null);
const date = ref('');
const time = ref('');
const reasonId = ref(null);

// Ant Design Select bileşeni için müşteri filtreleme fonksiyonu
const filterCustomer = (input, option) => {
  const [firstName, lastName, plate] = option.label.toLowerCase().match(/[\w\d]+/g);
  return (
    firstName.includes(input.toLowerCase()) ||
    lastName.includes(input.toLowerCase()) ||
    plate.includes(input.toLowerCase())
  );
};





// Randevu Sebepleri ve Müşteri Verilerini Çekme
onMounted(async () => {
  const { data: customerData } = await useFetch('/api/customers');
  customers.value = customerData.value.map((customer) => ({
    label: `${customer.firstName} ${customer.lastName} (${customer.plate}) `,
    value: customer.id,
  }));

  filteredCustomers.value = customers.value;

  const { data: reasonData } = await useFetch('/api/reasons');
  reasons.value = reasonData.value;
});

// Randevu Ekleme
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
  router.push('/'); // Randevu kaydettikten sonra ana sayfaya yönlendirme
};
</script>

<style scoped>
/* Tailwind ve Ant Design Select bileşeni için ek stil */
.a-select {
  width: 100%;
}
</style>
