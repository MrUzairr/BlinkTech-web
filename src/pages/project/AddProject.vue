<template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold flex items-center">
            <img src="@/assets/handshake.png" alt="Project Icon" class="w-6 h-6 mr-2" />
            New Project
          </h2>
          <router-link to="/projects" class="text-blue-500 hover:underline">Back to Projects</router-link>
        </div>
        
        <form @submit.prevent="submitProject">
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block mb-1 font-medium">Project Name <span class="text-red-500">*</span></label>
                <input v-model="newProject.name" type="text" required 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Project Owner</label>
                <input v-model="newProject.owner" type="text" value="xerion, Admin" disabled
                       class="w-full border px-3 py-2 rounded bg-gray-100">
              </div>
              <div>
                <label class="block mb-1 font-medium">Company</label>
                <input v-model="newProject.company" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Start Date</label>
                <input v-model="newProject.startDate" type="date" value="2025-04-22"
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Target Finish Date</label>
                <input v-model="newProject.targetFinishDate" type="date" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Target Budget ($)</label>
                <input v-model="newProject.targetBudget" type="number" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Location</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Contacts</label>
                <select v-model="newProject.contacts" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select contacts...</option>
                  <option v-for="contact in contacts" :key="contact.id" :value="contact.id">{{ contact.name }}</option>
                </select>
              </div>
              <div>
                <label class="block mb-1 font-medium">Departments</label>
                <select v-model="newProject.departments" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select departments...</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
                </select>
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Settings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Priority</label>
                <select v-model="newProject.priority" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label class="block mb-1 font-medium">Short Name</label>
                <input v-model="newProject.shortName" type="text" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Color Identifier</label>
                <div class="flex items-center">
                  <input v-model="newProject.color" type="color" value="#FFFFFF"
                         class="w-8 h-8 border rounded cursor-pointer">
                  <span class="ml-2 text-sm text-gray-600">Change color</span>
                </div>
              </div>
              <div>
                <label class="block mb-1 font-medium">Project Type</label>
                <select v-model="newProject.type" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Unknown">Unknown</option>
                  <option value="Internal">Internal</option>
                  <option value="Client">Client</option>
                  <option value="Research">Research</option>
                  <option value="Development">Development</option>
                </select>
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Status & Description</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Status</label>
                <select v-model="newProject.status" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Exc Deficit">Exc Deficit</option>
                  <option value="On Track">On Track</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label class="block mb-1 font-medium">Import tasks from</label>
                <select v-model="newProject.importTasks" 
                        class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">None</option>
                  <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block mb-1 font-medium">Description</label>
                <textarea v-model="newProject.description" 
                          class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"></textarea>
              </div>
            </div>
          </div>
  
          <div class="mb-8">
            <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Additional Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Actual Budget ($)</label>
                <input v-model="newProject.actualBudget" type="number" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">URL</label>
                <input v-model="newProject.url" type="url" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block mb-1 font-medium">Staging URL</label>
                <input v-model="newProject.stagingUrl" type="url" 
                       class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
  
          <div class="flex justify-end gap-4 pt-4 border-t">
            <router-link to="/projects" class="px-6 py-2 border rounded-lg hover:bg-gray-50">
              Cancel
            </router-link>
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProjectStore } from '@/stores/projectStore';
  
  const router = useRouter();
  const projectStore = useProjectStore();
  
  // Sample data - in a real app, these would likely come from API calls or other stores
  const contacts = ref([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ]);
  
  const departments = ref([
    { id: 1, name: 'Development' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Sales' }
  ]);
  
  const projects = ref([
    { id: 1, name: 'Website Redesign' },
    { id: 2, name: 'Mobile App Development' },
    { id: 3, name: 'CRM Implementation' }
  ]);
  
  const newProject = ref({
    name: '',
    owner: 'xerion, Admin',
    company: '',
    startDate: '2025-04-22',
    targetFinishDate: '',
    targetBudget: '',
    contacts: '',
    departments: '',
    priority: 'normal',
    shortName: '',
    color: '#FFFFFF',
    type: 'Unknown',
    status: 'Exc Deficit',
    importTasks: '',
    description: '',
    actualBudget: '',
    url: '',
    stagingUrl: ''
  });
  
  const submitProject = () => {
    // Add the new project using the store
    projectStore.addProject({
      name: newProject.value.name,
      owner: newProject.value.owner,
      company: newProject.value.company,
      startDate: newProject.value.startDate,
      status: newProject.value.status,
      priority: newProject.value.priority
    });
    
    // Redirect back to projects list
    router.push('/projects');
  };
  </script>