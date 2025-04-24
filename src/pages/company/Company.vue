<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
      <h2 class="text-2xl font-bold flex items-center">
        <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
        Companies
      </h2>
      <div class="flex flex-col md:flex-row md:items-center gap-2">
        <div class="flex items-center gap-2">
          <label class="font-semibold">Search:</label>
          <input v-model="searchQuery" type="text" class="border px-2 py-1 w-full md:w-auto" placeholder="Search..." />
        </div>
        <div class="flex items-center gap-2">
          <label class="font-semibold">Owner filter:</label>
          <select v-model="ownerFilter" class="border px-2 py-1 w-full md:w-auto">
            <option value="All">All</option>
            <option value="Client">Client</option>
            <option value="Vendor">Vendor</option>
            <option value="Supplier">Supplier</option>
            <option value="Consultant">Consultant</option>
            <option value="Government">Government</option>
            <option value="Internal">Internal</option>
            <option value="Not Applicable">Not Applicable</option>
          </select>
        </div>
        <router-link to="/companies/add" class="bg-blue-500 text-white px-4 py-1 rounded w-full md:w-auto">
          New Company
        </router-link>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="['px-4 py-2 border rounded', activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Sort -->
    <div class="font-semibold mb-2">Sort by:</div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded border">
      <table class="min-w-full text-sm md:text-base">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="border px-2 md:px-4 py-2 text-left">Company Name</th>
            <th class="border px-2 md:px-4 py-2 text-left">Active Projects</th>
            <th class="border px-2 md:px-4 py-2 text-left">Archived Projects</th>
            <th class="border px-2 md:px-4 py-2 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in filteredCompanies" :key="company.name" class="hover:bg-gray-100">
            <td class="border px-2 md:px-4 py-2">{{ company.name }}</td>
            <td class="border px-2 md:px-4 py-2">{{ company.activeProjects }}</td>
            <td class="border px-2 md:px-4 py-2">{{ company.archivedProjects }}</td>
            <td class="border px-2 md:px-4 py-2">{{ company.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample data
const companies = ref([
  { name: 'Blink Tech', activeProjects: 5, archivedProjects: 11, type: 'Internal' },
  { name: 'HANDS of Central Florida', activeProjects: 4, archivedProjects: 23, type: 'Client' },
  { name: 'Dynamic Fitness', activeProjects: 3, archivedProjects: 10, type: 'Not Applicable' },
  { name: 'St Armands Baking Company', activeProjects: 2, archivedProjects: 8, type: 'Not Applicable' },
  { name: 'Dr. Jeff Chirillo', activeProjects: 2, archivedProjects: 7, type: 'Client' },
  { name: 'Cello Bello', activeProjects: 2, archivedProjects: 6, type: 'Client' },
  { name: 'Sarasota Ballet', activeProjects: 0, archivedProjects: 2, type: 'Client' },
  { name: 'Zone Defense', activeProjects: 0, archivedProjects: 1, type: 'Not Applicable' },
]);

// Tabs
const tabs = ref(['All Companies', 'Client', 'Vendor', 'Supplier', 'Consultant', 'Government', 'Internal', 'Not Applicable']);
const activeTab = ref('All Companies');

// Filters
const searchQuery = ref('');
const ownerFilter = ref('All');

const filteredCompanies = computed(() => {
  return companies.value.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = ownerFilter.value === 'All' || company.type === ownerFilter.value;
    return matchesSearch && matchesFilter;
  });
});
</script>



<!-- <template>
    <div class="p-4 bg-gray-100 min-h-screen">

      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Company Icon" class="w-6 h-6 mr-2" />
          Companies
        </h2>
        <div class="space-x-2">
          <label class="font-semibold">Search:</label>
          <input v-model="searchQuery" type="text" class="border px-2 py-1" placeholder="Search..." />
          <label class="font-semibold">Owner filter:</label>
          <select v-model="ownerFilter" class="border px-2 py-1">
            <option value="All">All</option>
            <option value="Client">Client</option>
            <option value="Vendor">Vendor</option>
            <option value="Supplier">Supplier</option>
            <option value="Consultant">Consultant</option>
            <option value="Government">Government</option>
            <option value="Internal">Internal</option>
            <option value="Not Applicable">Not Applicable</option>
          </select>
          <button class="bg-blue-500 text-white px-4 py-1 rounded">New Company</button>
        </div>
      </div>
  
      <div class="flex space-x-2 mb-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="['px-4 py-2 border rounded', activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200']"
        >
          {{ tab }}
        </button>
      </div>
  
      <div class="font-semibold mb-2">Sort by:</div>
  
      <div class="overflow-x-auto bg-white shadow rounded border">
        <table class="min-w-full">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="border px-4 py-2 text-left">Company Name</th>
              <th class="border px-4 py-2 text-left">Active Projects</th>
              <th class="border px-4 py-2 text-left">Archived Projects</th>
              <th class="border px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in filteredCompanies" :key="company.name" class="hover:bg-gray-100">
              <td class="border px-4 py-2">{{ company.name }}</td>
              <td class="border px-4 py-2">{{ company.activeProjects }}</td>
              <td class="border px-4 py-2">{{ company.archivedProjects }}</td>
              <td class="border px-4 py-2">{{ company.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Sample data
  const companies = ref([
    { name: 'Blink Tech', activeProjects: 5, archivedProjects: 11, type: 'Internal' },
    { name: 'HANDS of Central Florida', activeProjects: 4, archivedProjects: 23, type: 'Client' },
    { name: 'Dynamic Fitness', activeProjects: 3, archivedProjects: 10, type: 'Not Applicable' },
    { name: 'St Armands Baking Company', activeProjects: 2, archivedProjects: 8, type: 'Not Applicable' },
    { name: 'Dr. Jeff Chirillo', activeProjects: 2, archivedProjects: 7, type: 'Client' },
    { name: 'Cello Bello', activeProjects: 2, archivedProjects: 6, type: 'Client' },
    { name: 'Sarasota Ballet', activeProjects: 0, archivedProjects: 2, type: 'Client' },
    { name: 'Zone Defense', activeProjects: 0, archivedProjects: 1, type: 'Not Applicable' },
  ]);
  
  // Tabs
  const tabs = ref(['All Companies', 'Client', 'Vendor', 'Supplier', 'Consultant', 'Government', 'Internal', 'Not Applicable']);
  const activeTab = ref('All Companies');
  
  // Filters
  const searchQuery = ref('');
  const ownerFilter = ref('All');
  
  const filteredCompanies = computed(() => {
    return companies.value.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesFilter = ownerFilter.value === 'All' || company.type === ownerFilter.value;
      return matchesSearch && matchesFilter;
    });
  });
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
   -->