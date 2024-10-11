<template>
  <div class="flex h-screen">
    <!-- Ana İçerik -->
    <div class="flex-grow p-6">
      <NuxtPage />
    </div>

    <!-- Hamburger Menü -->
    <div class="relative">
      <button @click="toggleMenu" class="p-4 fixed top-4 right-4 z-50">
        <!-- Hamburger ikonu -->
        <div class="space-y-2">
          <span class="block w-8 h-1 bg-gray-600"></span>
          <span class="block w-8 h-1 bg-gray-600"></span>
          <span class="block w-8 h-1 bg-gray-600"></span>
        </div>
      </button>

      <!-- Menü Açılır Kısmı -->
      <div
        :class="{
          'translate-x-0': menuOpen,
          'translate-x-full': !menuOpen,
        }"
        class="fixed top-0 right-0 w-64 h-full bg-gray-100 shadow-lg transition-transform transform duration-300 ease-in-out"
      >
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Menu</h2>
          <ul>
            <li class="mb-4">
              <NuxtLink to="/" class="text-blue-500" @click="closeMenu" >Ana Sayfa</NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink to="/dashboard" class="text-blue-500" @click="closeMenu">Müşteri Ekle</NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink to="/appointments/new" class="text-blue-500" @click="closeMenu">Randevu Ekle</NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink to="/settings" class="text-blue-500" @click="closeMenu">Ayarlar</NuxtLink>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = ()=>{
  menuOpen.value =false; //Link Tıklaytınca Menuyu Kapat
}
</script>

<style scoped>
/* Ek stil ihtiyaçlarınıza göre burayı genişletebilirsiniz */
</style>
