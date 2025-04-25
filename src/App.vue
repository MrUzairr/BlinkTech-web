<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div>
    <!-- Navbar always visible -->
    <Navbar />

    <!-- Route View (changes based on the URL path) -->
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>

