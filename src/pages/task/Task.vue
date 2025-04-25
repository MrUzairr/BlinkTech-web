<template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <!-- Header Filters -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <span class="font-bold text-xl text-blue-800">🧩 Tasks</span>
        </div>
  
        <div class="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 text-sm">
          <label class="flex flex-col md:flex-row items-start md:items-center gap-1">
            <span>Search:</span>
            <input type="text" v-model="search" class="border p-1 w-full md:w-auto" />
          </label>
          <label class="flex flex-col md:flex-row items-start md:items-center gap-1">
            <span>User:</span>
            <select v-model="selectedUser" class="border p-1 w-full md:w-auto">
              <option v-for="user in users" :key="user">{{ user }}</option>
            </select>
          </label>
          <label class="flex flex-col md:flex-row items-start md:items-center gap-1">
            <span>Company:</span>
            <select v-model="selectedCompany" class="border p-1 w-full md:w-auto">
              <option>All Companies</option>
              <option>Company A</option>
            </select>
          </label>
          <label class="flex flex-col md:flex-row items-start md:items-center gap-1">
            <span>Task Filter:</span>
            <select v-model="selectedFilter" class="border p-1 w-full md:w-auto">
              <option>My Unfinished Tasks</option>
              <option>All Tasks</option>
            </select>
          </label>
        </div>
      </div>
  
      <!-- Tasks Table (with horizontal scroll on mobile) -->
      <div class="overflow-x-auto">
        <table class="min-w-full border border-collapse text-sm bg-white">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="p-2 border">Pin</th>
              <th class="p-2 border">New Log</th>
              <th class="p-2 border">Work</th>
              <th class="p-2 border">P</th>
              <th class="p-2 border">Task Name</th>
              <th class="p-2 border">Task Creator</th>
              <th class="p-2 border">Assigned Users</th>
              <th class="p-2 border">Start Date</th>
              <th class="p-2 border">Duration</th>
              <th class="p-2 border">Finish Date</th>
              <th class="p-2 border">Last Update</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="group in groupedTasks" :key="group.project">
              <tr class="bg-gray-100 font-bold text-sm">
                <td colspan="12" class="p-2 border text-orange-800">
                  Dr. {{ group.project }} <span class="ml-2">6%</span>
                </td>
              </tr>
              <tr v-for="task in group.tasks" :key="task.id" :class="getStatusClass(task)">
                <td class="border p-2">📌</td>
                <td class="border p-2">✏️</td>
                <td class="border p-2">Log</td>
                <td class="border p-2">10%</td>
                <td class="border p-2">{{ task.name }}</td>
                <td class="border p-2">{{ task.creator }}</td>
                <td class="border p-2">{{ task.assigned }}</td>
                <td class="border p-2">{{ task.start }}</td>
                <td class="border p-2">{{ task.duration }}</td>
                <td class="border p-2">{{ task.finish }}</td>
                <td class="border p-2">-</td>
                <td class="border p-2 space-x-1">
                  <button class="border px-2 py-1 text-xs">Reports</button>
                  <button class="border px-2 py-1 text-xs">Gantt Chart</button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
  
      <!-- Key -->
      <div class="mt-4 text-sm flex flex-wrap gap-2">
        <strong class="w-full">Key:</strong>
        <span class="bg-gray-200 px-2 py-1 rounded">Future Task</span>
        <span class="bg-green-100 px-2 py-1 rounded">Started and on time</span>
        <span class="bg-yellow-200 px-2 py-1 rounded">Should have started</span>
        <span class="bg-red-300 px-2 py-1 rounded">Overdue</span>
        <span class="bg-green-300 px-2 py-1 rounded">Done</span>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const search = ref('')
  const selectedUser = ref('Person, Admin')
  const selectedCompany = ref('All Companies')
  const selectedFilter = ref('My Unfinished Tasks')
  
  const users = ['Person, Admin', 'Another User']
  
  const groupedTasks = ref([
    {
      project: 'Jeff Chirillo :: Chirillo - 2022',
      tasks: [
        {
          id: 1,
          name: 'Main 2022',
          creator: 'pboivin',
          assigned: 'admin (100%) (+6)',
          start: '03/01/2022 10:00 am',
          duration: '1 hours',
          finish: '31/12/2022 05:00 pm',
          status: 'overdue'
        }
      ]
    },
    {
      project: 'Jeff Chirillo :: Chirillo - 2023',
      tasks: [
        {
          id: 2,
          name: 'Main 2023',
          creator: 'pboivin',
          assigned: 'admin (100%) (+6)',
          start: '01/01/2023 12:00 am',
          duration: '1 hours',
          finish: '31/12/2023 05:00 pm',
          status: 'overdue'
        }
      ]
    }
  ])
  
  const getStatusClass = (task) => {
    switch (task.status) {
      case 'overdue': return 'bg-red-100'
      case 'done': return 'bg-green-100'
      case 'shouldStart': return 'bg-yellow-100'
      case 'onTime': return 'bg-green-50'
      case 'future': return 'bg-gray-100'
      default: return ''
    }
  }
  </script>
  
  <style scoped>
  table, th, td {
    border: 1px solid #ccc;
  }
  </style>
  