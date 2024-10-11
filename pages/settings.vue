<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Yeni İşlem Ekleme</h1>
    <form @submit.prevent="addReason" class="mb-4">
      <div class="mb-4">
        <label class="block mb-2">İşlem Adı</label>
        <input v-model="newReason" type="text" class="border p-2 w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2">Kaydet</button>
    </form>

    <ul class="list-disc pl-6">
      <li v-for="reason in reasons" :key="reason.id">
        {{ reason.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const newReason = ref('');
const reasons = ref([]);

onMounted(async () => {
  const { data: reasonsData } = await useFetch('/api/reasons');
  reasons.value = reasonsData.value;
});

const addReason = async () => {
  await useFetch('/api/reasons', {
    method: 'POST',
    body: {
      description: newReason.value,
    },
  });
  newReason.value = '';

  const { data: reasonsData } = await useFetch('/api/reasons');
  reasons.value = reasonsData.value;
};
</script>
