<template>
  <div class="p-6 space-y-6">
    <!-- Müşteri Ekleme Formu -->
    <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Yeni Müşteri</h1>
      <form @submit.prevent="addCustomer" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Müşteri Adı</label>
          <input v-model="firstName" type="text" class="border p-2 w-full rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium">Müşteri Soyadı</label>
          <input v-model="lastName" type="text" class="border p-2 w-full rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium">Telefon</label>
          <div class="flex">
            <span class="border p-2 rounded-l bg-gray-200">+90</span>
            <input v-model="phone" type="tel" maxlength="10" class="border p-2 w-full rounded-r" placeholder="1234567890" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Plaka</label>
          <input v-model="plate" type="text" class="border p-2 w-full rounded" />
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded w-full">Kaydet</button>
      </form>
    </div>

    <!-- Müşteri Tablosu -->
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Müşteri Listesi</h2>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Adı</th>
            <th class="border p-2">Soyadı</th>
            <th class="border p-2">Telefon</th>
            <th class="border p-2">Plaka</th>
            <th class="border p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" class="text-center">
            <td class="border p-2">{{ customer.firstName }}</td>
            <td class="border p-2">{{ customer.lastName }}</td>
            <td class="border p-2">+90 {{ customer.phone }}</td>
            <td class="border p-2">{{ customer.plate }}</td>
            <td class="border p-2 space-x-2">
              <button @click="editCustomer(customer)" class="bg-yellow-500 text-white py-1 px-2 rounded">Düzenle</button>
              <button @click="deleteCustomer(customer.id)" class="bg-red-500 text-white py-1 px-2 rounded">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';


const customers = ref([]);
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const plate = ref('');
const selectedCustomer = ref(null);

// Müşteri ekleme
const addCustomer = async () => {
  if (selectedCustomer.value) {
    await useFetch(`/api/customers/${selectedCustomer.value.id}`, {
      method: 'PUT',
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        plate: plate.value,
      },
    });
    selectedCustomer.value = null;
  } else {
    await useFetch('/api/customers', {
      method: 'POST',
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        plate: plate.value,
      },
    });
  }

  clearForm();
  fetchCustomers();
};

// Müşteri verilerini çek
const fetchCustomers = async () => {
  const { data } = await useFetch('/api/customers');
  customers.value = data.value;
};

// // Müşteri silme
// const deleteCustomer = async (id) => {
//   await useFetch(`/api/customers/${id}`, { method: 'DELETE' });
//   fetchCustomers();
// };

// Müşteri silme
const deleteCustomer = async (id) => {
  // Önce müşterinin randevularını kontrol et
  const { data: appointments } = await useFetch(`/api/appointments/customer/${id}`);
  
  if (appointments.value.length > 0) {
    // Eğer müşterinin randevuları varsa bildirim göster
    notification.warning({
      message: 'Müşteri Silinemez',
      description: 'Bu Müşteriye ait randevu kayıtları olduğu için müşteriyi silemezsiniz.Lütfen ilk önce randevu kayıtlarını silin',
      placement: 'top' ,top:'50px', class: 'warning', duration: 7,style:{width:'350px'}
    });
    
  } else {
    // Eğer müşterinin randevuları yoksa silme işlemini gerçekleştir
    await useFetch(`/api/customers/${id}`, { method: 'DELETE' });
    fetchCustomers();
    notification.success({
      message: 'Customer Deleted',
      description: 'Customer has been successfully deleted.',
    });
  }
};

// Formu temizle
const clearForm = () => {
  firstName.value = '';
  lastName.value = '';
  phone.value = '';
  plate.value = '';
};

// Müşteri düzenleme
const editCustomer = (customer) => {
  selectedCustomer.value = customer;
  firstName.value = customer.firstName;
  lastName.value = customer.lastName;
  phone.value = customer.phone;
  plate.value = customer.plate;
};

onMounted(fetchCustomers);
</script>
