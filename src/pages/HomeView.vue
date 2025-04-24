<template>
    <div class="p-4">
      <h2 class="text-lg font-bold mb-2">Day View - {{ currentDate }}</h2>
      
      <div class="flex items-center space-x-4 mb-4">
        <label for="person">Show Todo for:</label>
        <select id="person" v-model="selectedPerson" class="border px-2 py-1">
          <option v-for="person in people" :key="person" :value="person">{{ person }}</option>
        </select>
      </div>
  
      <table class="w-full table-auto border">
        <thead class="bg-blue-200 text-left">
          <tr>
            <th class="p-2">Pin</th>
            <th class="p-2">Progress</th>
            <th class="p-2">Task / Project</th>
            <th class="p-2">Start Date</th>
            <th class="p-2">Duration</th>
            <th class="p-2">Finish Date</th>
            <th class="p-2">Due In</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id" :class="getTaskRowClass(task)">
            <td class="p-2">📌</td>
            <td class="p-2">{{ task.progress }}</td>
            <td class="p-2">{{ task.name }} <span class="bg-yellow-600 text-white px-1 ml-1">{{ task.project }}</span></td>
            <td class="p-2">{{ task.start }}</td>
            <td class="p-2">{{ task.duration }}</td>
            <td class="p-2">{{ task.finish }}</td>
            <td class="p-2 text-red-600">{{ task.dueIn }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="mt-4 text-sm">
        <strong>Key:</strong>
        <span class="ml-2 bg-gray-200 px-1">Future Task</span>
        <span class="ml-2 bg-green-200 px-1">Started and on time</span>
        <span class="ml-2 bg-yellow-200 px-1">Should have started</span>
        <span class="ml-2 bg-red-300 px-1">Overdue</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const currentDate = new Date().toLocaleDateString()
  const selectedPerson = ref('Person, Admin')
  const people = ['Person, Admin', 'Another Person']
  
  const tasks = ref([
    {
      id: 1,
      progress: 'Log 10%',
      name: 'Main 2022',
      project: 'Chirillo - 2022',
      start: '03/01/2022 10:00 am',
      duration: '1 hours',
      finish: '31/12/2022 05:00 pm',
      dueIn: '-845'
    },
    {
      id: 2,
      progress: 'Log 10%',
      name: 'Main 2023',
      project: 'Chirillo - 2023',
      start: '01/01/2023 12:00 am',
      duration: '1 hours',
      finish: '31/12/2023 05:00 pm',
      dueIn: '-480'
    }
  ])
  
  const filteredTasks = computed(() => {
    return tasks.value // Here you can filter based on selectedPerson if needed
  })
  
  const getTaskRowClass = (task) => {
    if (parseInt(task.dueIn) < 0) return 'bg-red-200'
    return ''
  }
  </script>
  
  <style scoped>
  table, th, td {
    border: 1px solid #ccc;
  }
  </style>
  