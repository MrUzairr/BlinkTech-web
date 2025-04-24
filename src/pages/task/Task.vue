<template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <!-- Header Filters -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <span class="font-bold text-xl text-blue-800">🧩 Tasks</span>
        </div>
  
        <div class="flex flex-wrap items-center gap-2 text-sm">
          <label>Search: <input type="text" v-model="search" class="border p-1" /></label>
          <label>User: 
            <select v-model="selectedUser" class="border p-1">
              <option v-for="user in users" :key="user">{{ user }}</option>
            </select>
          </label>
          <label>Company: 
            <select v-model="selectedCompany" class="border p-1">
              <option>All Companies</option>
              <option>Company A</option>
            </select>
          </label>
          <label>Task Filter: 
            <select v-model="selectedFilter" class="border p-1">
              <option>My Unfinished Tasks</option>
              <option>All Tasks</option>
            </select>
          </label>
        </div>
      </div>
  
      <!-- Tasks Table -->
      <table class="w-full border border-collapse text-sm bg-white">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="p-1 border">Pin</th>
            <th class="p-1 border">New Log</th>
            <th class="p-1 border">Work</th>
            <th class="p-1 border">P</th>
            <th class="p-1 border">Task Name</th>
            <th class="p-1 border">Task Creator</th>
            <th class="p-1 border">Assigned Users</th>
            <th class="p-1 border">Start Date</th>
            <th class="p-1 border">Duration</th>
            <th class="p-1 border">Finish Date</th>
            <th class="p-1 border">Last Update</th>
            <th class="p-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in groupedTasks" :key="group.project">
            <tr class="bg-gray-100 font-bold text-sm">
              <td colspan="12" class="p-1 border text-orange-800">
                Dr. {{ group.project }} <span class="ml-2">6%</span>
              </td>
            </tr>
            <tr v-for="task in group.tasks" :key="task.id" :class="getStatusClass(task)">
              <td class="border p-1">📌</td>
              <td class="border p-1">✏️</td>
              <td class="border p-1">Log</td>
              <td class="border p-1">10%</td>
              <td class="border p-1">{{ task.name }}</td>
              <td class="border p-1">{{ task.creator }}</td>
              <td class="border p-1">{{ task.assigned }}</td>
              <td class="border p-1">{{ task.start }}</td>
              <td class="border p-1">{{ task.duration }}</td>
              <td class="border p-1">{{ task.finish }}</td>
              <td class="border p-1">-</td>
              <td class="border p-1 space-x-1">
                <button class="border px-1">Reports</button>
                <button class="border px-1">Gantt Chart</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
  
      <!-- Key -->
      <div class="mt-4 text-sm">
        <strong>Key:</strong>
        <span class="ml-2 bg-gray-200 px-1">Future Task</span>
        <span class="ml-2 bg-green-100 px-1">Started and on time</span>
        <span class="ml-2 bg-yellow-200 px-1">Should have started</span>
        <span class="ml-2 bg-red-300 px-1">Overdue</span>
        <span class="ml-2 bg-green-300 px-1">Done</span>
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
  