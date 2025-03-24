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


<!-- <template>
  <div>
    <router-view></router-view> 
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Company from '@/pages/Company.vue';
</script> -->


<!-- <template>
  <Home/>
</template>

<script setup>
  import Home from "@/pages/Home.vue";
</script> -->