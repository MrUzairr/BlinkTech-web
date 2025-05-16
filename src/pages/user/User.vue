<template>
    <div class="min-h-screen bg-gray-200 p-4 sm:p-6 font-sans">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row justify-between gap-4 mb-4">
        <h2 class="text-2xl font-bold">User Management</h2>
  
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="search"
            class="border border-gray-300 rounded px-2 py-1 text-sm w-full sm:w-auto focus:outline-none focus:ring focus:border-gray-400"
          />
          <div class="flex flex-wrap gap-1">
            <span
              v-for="letter in alphabet"
              :key="letter"
              @click="filterByLetter(letter)"
              :class="[
                'cursor-pointer text-sm px-1',
                activeLetter === letter ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
              ]"
            >
              {{ letter }}
            </span>
            <span
              @click="filterByLetter('All')"
              :class="[
                'cursor-pointer text-sm px-1',
                activeLetter === 'All' ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
              ]"
            >
              All
            </span>
          </div>
          <button
            @click="addUser"
            class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Add User
          </button>
        </div>
      </div>
  
      <!-- Tabs -->
      <div class="mb-4 border-b overflow-x-auto">
        <ul class="flex whitespace-nowrap gap-4">
          <li
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'cursor-pointer py-2 px-4 text-sm',
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'
            ]"
          >
            {{ tab }}
          </li>
        </ul>
      </div>
  
      <!-- User List -->
       <!-- User List -->
<div class="bg-white rounded shadow p-4 overflow-x-auto">
  <div class="min-w-[700px]">
    <!-- Table Header -->
    <div class="flex text-sm font-semibold text-white bg-blue-900 p-2 rounded-t">
      <div class="w-1/6 cursor-pointer" @click="sortBy('status')">Status</div>
      <div class="w-1/3 cursor-pointer" @click="sortBy('loginName')">Login Name</div>
      <div class="w-1/3 cursor-pointer" @click="sortBy('realName')">Real Name</div>
      <div class="w-1/3 cursor-pointer" @click="sortBy('company')">Company</div>
    </div>

    <!-- Table Body -->
    <div class="custom-scrollbar max-h-[60vh] overflow-y-auto">
      <div
        v-for="user in filteredAndSortedUsers"
        :key="user.loginName"
        class="flex items-center text-sm p-2 border-b hover:bg-gray-100"
      >
        <div class="w-1/6 flex items-center">
          <span
            :class="[
              'w-3 h-3 rounded-full mr-2',
              user.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'
            ]"
          ></span>
          {{ user.status }} ({{ user.idleTime }})
        </div>
        <div class="w-1/3">{{ user.loginName }}</div>
        <div class="w-1/3">{{ user.realName }}</div>
        <div class="w-1/3">{{ user.company }}</div>
      </div>
    </div>
  </div>
</div>

      <!-- <div class="bg-white rounded shadow p-4 overflow-x-auto">
        <div class="min-w-[700px] text-sm font-semibold text-white bg-blue-900 p-2 rounded-t flex">
          <div class="w-1/6 cursor-pointer" @click="sortBy('status')">Status</div>
          <div class="w-1/3 cursor-pointer" @click="sortBy('loginName')">Login Name</div>
          <div class="w-1/3 cursor-pointer" @click="sortBy('realName')">Real Name</div>
          <div class="w-1/3 cursor-pointer" @click="sortBy('company')">Company</div>
        </div>
  
        <div class="custom-scrollbar max-h-[60vh] overflow-y-auto">
          <div
            v-for="user in filteredAndSortedUsers"
            :key="user.loginName"
            class="min-w-[700px] flex items-center text-sm p-2 border-b hover:bg-gray-100"
          >
            <div class="w-1/6 flex items-center">
              <span
                :class="[
                  'w-3 h-3 rounded-full mr-2',
                  user.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'
                ]"
              ></span>
              {{ user.status }} ({{ user.idleTime }})
            </div>
            <div class="w-1/3">{{ user.loginName }}</div>
            <div class="w-1/3">{{ user.realName }}</div>
            <div class="w-1/3">{{ user.company }}</div>
          </div>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const tabs = ['Active Users', 'Inactive Users', 'User Log', 'Active Sessions'];
  const activeTab = ref('Active Users');
  const searchQuery = ref('');
  const activeLetter = ref('All');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const sortKey = ref('loginName');
  const sortOrder = ref('asc');
  
  const users = ref([
    { loginName: 'admingray', realName: 'Person, Admin', company: 'Blink Tech', status: 'Online', idleTime: '24.0678 hrs, 9.0000 idle' },
    { loginName: 'agrays', realName: 'Gray, Amy', company: 'Blink Tech', status: 'Online', idleTime: '9349.9819 hrs, 9349.9328 idle' },
    { loginName: 'ahussain', realName: 'Hussain, Aatif', company: 'Blink Tech', status: 'Online', idleTime: '20852.2303 hrs, 20852.2303 idle' },
    { loginName: 'gbowdish', realName: 'Bowdish, Greg', company: 'Blink Tech', status: 'Online', idleTime: '20809.9233 hrs, 20809.9233 idle' },
    { loginName: 'mtrob', realName: 'Robinson, Todd', company: 'Penguix', status: 'Online', idleTime: '30273.2519 hrs, 30273.1936 idle' },
    { loginName: 'mwakeman', realName: 'Wakeman, Maria', company: 'Blink Tech', status: 'Offline', idleTime: '20796.6786 hrs, 20796.6786 idle' },
    { loginName: 'pboivin', realName: 'Boivin, Paul', company: 'Blink Tech', status: 'Online', idleTime: '20796.2042 hrs, 20796.2042 idle' },
  ]);
  
  const filteredAndSortedUsers = computed(() => {
    let filtered = users.value.filter(user => {
      const matchesSearch = searchQuery.value
        ? user.loginName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.realName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.company.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true;
  
      const matchesLetter = activeLetter.value === 'All'
        ? true
        : user.realName.charAt(0).toUpperCase() === activeLetter.value;
  
      return matchesSearch && matchesLetter;
    });
  
    return filtered.sort((a, b) => {
      const valueA = a[sortKey.value];
      const valueB = b[sortKey.value];
      return sortOrder.value === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  });
  
  function sortBy(key) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  }
  
  function filterByLetter(letter) {
    activeLetter.value = letter;
  }
  
  function addUser() {
    console.log('Add user clicked');
    // e.g., router.push('/users/add');
  }
  </script>
  
  <style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: thin;
  }
  </style>
  