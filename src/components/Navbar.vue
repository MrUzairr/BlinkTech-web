<template>
  <nav class="bg-black p-4">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="text-white text-xl font-bold">Blink Tech - Project Management</a>
      <button @click="toggleMenu" class="md:hidden text-white text-2xl focus:outline-none">
        ☰
      </button>
      <img src="../assets/dp_icon.gif" alt="blinktech" class="hidden md:block">
    </div>
  </nav>

  <!-- Mobile/Desktop Menu -->
  <ul
  :class="menuOpen ? 'flex' : 'hidden'"
  class="fixed top-16 left-0 w-full flex-col z-50 p-4 
         bg-[#808080] text-white 
         md:static md:flex md:flex-row md:items-center md:space-x-4 
         md:py-1 md:pl-5"
>

    <li><a href="/companies" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Companies</a></li>
    <li><a href="/projects" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Projects</a></li>
    <li><a href="/tasks" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Tasks</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Contacts</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">User Admin</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">System Admin</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Invoice</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">SmartSearch</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">March Tasks Report</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Static Tasks Report</a></li>
    <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 md:hover:text-black md:hover:underline">Reports</a></li>
  </ul>

  <!-- Dropdown -->
  <div class="container mx-auto p-4 mt-0 md:-mt-11 flex justify-end">
    <div class="relative">
      <button @click="toggleDropdown" class="bg-white px-4 py-0 rounded text-black">
        New Item ▼
      </button>
      <ul v-show="dropdownOpen" class="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-50">
        <li><a href="#" class="block px-6 py-2 hover:bg-gray-200">Option 1</a></li>
        <li><a href="#" class="block px-6 py-2 hover:bg-gray-200">Option 2</a></li>
        <li><a href="#" class="block px-6 py-2 hover:bg-gray-200">Option 3</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);
const dropdownOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>



