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
  
    <!-- Mobile Menu -->
    <div style="background-color: gray" class="bg-white md:bg-transparent">
      <ul
        :class="menuOpen ? 'flex' : 'hidden'"
        class="md:flex flex-col md:flex-row  md:items-center md:space-x-4 text-white ml-0 md:ml-4 md:py-1  p-4 md:p-0"
      >
        <li><a href="/companies" class="block py-2 md:py-0 hover:text-black hover:underline">Companies</a></li>
        <li><a href="/projects" class="block py-2 md:py-0 hover:text-black hover:underline">Projects</a></li>
        <li><a href="/tasks" class="block py-2 md:py-0 hover:text-black hover:underline">Tasks</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">Contacts</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">User Admin</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">System Admin</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">Invoice</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">SmartSearch</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">March Tasks Report</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">Static Tasks Report</a></li>
        <li><a href="#" class="block py-2 md:py-0 hover:text-black hover:underline">Reports</a></li>
      </ul>
    </div>
  
    <!-- Dropdown -->
    <div class="container mx-auto p-4 mt-0 md:-mt-11 flex justify-end">
      <div class="relative">
        <button @click="toggleDropdown" class="bg-white px-4 py-0 rounded text-black">
          New Item ▼
        </button>
        <ul v-show="dropdownOpen" class="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
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
  