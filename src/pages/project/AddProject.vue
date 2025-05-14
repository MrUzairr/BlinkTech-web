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

      <!-- Loading & Error -->
      <div v-if="isLoading" class="text-blue-500 mb-4">Submitting project...</div>
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <form @submit.prevent="submitProject">
        <!-- Project Details -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Details</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Project Name <span class="text-red-500">*</span></label>
              <input v-model="newProject.name" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Project Owner <span class="text-red-500">*</span></label>
              <select v-model="newProject.owner" required class="w-full border px-3 py-2 rounded">
                <option value="" disabled>Select project owner</option>
                <option v-for="user in users" :key="user.user_id" :value="user.user_username">
                  {{ user.user_username }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Company <span class="text-red-500">*</span></label>
              <select v-model="newProject.company" required class="w-full border px-3 py-2 rounded">
  <option value="" disabled>Select a company</option>
  <option v-for="company in companies" :key="company.company_id" :value="company.company_id">
    {{ company.company_name }}
  </option>
</select>

            </div>
            <div>
              <label class="block mb-1 font-medium">Start Date</label>
              <input v-model="newProject.startDate" type="date" class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Target Finish Date</label>
              <input v-model="newProject.targetFinishDate" type="date" class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Target Budget ($)</label>
              <input v-model="newProject.targetBudget" type="number" class="w-full border px-3 py-2 rounded" />
            </div>
          </div>
        </div>

        <!-- Project Location -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Location</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Contacts</label>
              <select v-model="newProject.contacts" class="w-full border px-3 py-2 rounded">
                <option value="">Select contacts...</option>
                <option v-for="contact in contacts" :key="contact.id" :value="contact.id">
                  {{ contact.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Departments</label>
              <select v-model="newProject.departments" class="w-full border px-3 py-2 rounded">
                <option value="">Select departments...</option>
                <option v-for="dept in departments" :key="dept.dept_id" :value="dept.dept_id">
                  {{ dept.dept_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Project Settings -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Project Settings</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Priority</label>
              <select v-model="newProject.priority" class="w-full border px-3 py-2 rounded">
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Short Name</label>
              <input v-model="newProject.shortName" type="text" class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Color Identifier</label>
              <input v-model="newProject.color" type="color" class="w-10 h-10 border rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Project Type</label>
              <select v-model="newProject.type" class="w-full border px-3 py-2 rounded">
                <option value="Unknown">Unknown</option>
                <option value="Administrative">Administrative</option>
                <option value="Operative">Operative</option>
                <option value="Development">Development</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Status & Description -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Status & Description</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Status</label>
              <select v-model="newProject.status" class="w-full border px-3 py-2 rounded">
                <option value="Not Defined">Not Defined</option>
                <option value="Proposed">Proposed</option>
                <option value="In Planning">In Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">In On Hold</option>
                <option value="Complete">Complete</option>
                <option value="Template">Template</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Import tasks from</label>
              <select v-model="newProject.importTasks" class="w-full border px-3 py-2 rounded">
                <option value="">None</option>
                <option v-for="task in tasks" :key="task.id" :value="task.id">
                  {{ task.task_name }}
                </option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Description</label>
              <textarea v-model="newProject.description" class="w-full border px-3 py-2 rounded h-32"></textarea>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mb-8">
          <h4 class="font-semibold text-lg mb-4 pb-2 border-b">Additional Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Actual Budget ($)</label>
              <input v-model="newProject.actualBudget" type="number" class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">URL</label>
              <input v-model="newProject.url" type="url" class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Staging URL</label>
              <input v-model="newProject.stagingUrl" type="url" class="w-full border px-3 py-2 rounded" />
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-4 pt-4 border-t">
          <router-link to="/projects" class="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</router-link>
          <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const companies = ref([]);
const users = ref([]);
const departments = ref([]);
const tasks = ref([]);
const contacts = ref([]);
const isLoading = ref(false);
const error = ref(null);

const newProject = ref({
  name: '',
  shortName: '',
  owner: '',
  company: '',
  startDate: '2024-01-01',
  targetFinishDate: '2024-12-31',
  actualBudget: '',
  targetBudget: '',
  color: '#CC3333',
  url: '',
  stagingUrl: '',
  description: '',
  priority: 'normal',
  departments: '',
  contacts: '',
  status: 'Not Defined',
  type: 'Unknown',
  importTasks: ''
});

const fetchCompanies = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/project-company');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error('Unexpected response format: expected an array');
    }

    // Map the companies to have both company_id and company_name
    companies.value = result
      .filter(c => c.company_name) // Ensure valid entries
      .map(c => ({ company_id: c.project_company, company_name: c.company_name })) // Map to proper structure
      .sort((a, b) => a.company_name.localeCompare(b.company_name)); // Sort alphabetically
  } catch (err) {
    console.error('Error fetching companies:', err);
    error.value = `Companies: ${err.message}`;
    companies.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchUsers = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/users');
    const data = await res.json();
    users.value = data.sort((a, b) => a.user_username.localeCompare(b.user_username));
  } catch (err) {
    error.value = 'Users: ' + err.message;
  }
};

const fetchDepartments = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/departments');
    const data = await res.json();
    
    // Ensure that the departments are correctly populated and filtered
    departments.value = data
      .filter(d => d.dept_name) // Ensure valid department entries
      .map(d => ({ dept_id: d.dept_id, dept_name: d.dept_name })) // Map to proper structure
      .sort((a, b) => a.dept_name.localeCompare(b.dept_name)); // Sort departments alphabetically
  } catch (err) {
    error.value = 'Departments: ' + err.message;
    departments.value = [];
  }
};

const fetchTasks = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/tasks');
    tasks.value = await res.json();
  } catch (err) {
    error.value = 'Tasks: ' + err.message;
  }
};

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchCompanies(), fetchUsers(), fetchDepartments(), fetchTasks()]);
  contacts.value = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ];
  isLoading.value = false;
});

const statusMap = {
  'Not Defined': 0,
  'Proposed': 1,
  'In Planning': 2,
  'In Progress': 3,
  'On Hold': 4,
  'Complete': 5,
  'Template': 6,
  'Archived': 7
};

const priorityMap = {
  normal: 0,
  high: 1,
  low: 2,
  critical: 3
};

const typeMap = {
  Unknown: 0,
  Administrative: 1,
  Operative: 2,
  Development: 3
};

const submitProject = async () => {
  const selectedCompany = companies.value.find(c => c.company_id === newProject.value.company); // Use company_id here
  const selectedOwner = users.value.find(u => u.user_username === newProject.value.owner);
  const selectedDept = departments.value.find(d => d.dept_id === newProject.value.departments);

  const payload = {
    project_company: selectedCompany?.company_id || 0, // Use company_id for project_company
    project_department: selectedDept?.dept_id || 0,
    project_name: newProject.value.name,
    project_short_name: newProject.value.shortName,
    project_owner: selectedOwner?.user_id || 0,
    project_url: newProject.value.url,
    project_demo_url: newProject.value.stagingUrl,
    project_start_date: `${newProject.value.startDate} 00:00:00`,
    project_end_date: `${newProject.value.targetFinishDate || newProject.value.startDate} 23:59:59`,
    project_actual_end_date: null,
    project_status: statusMap[newProject.value.status] || 0,
    project_percent_complete: 0,
    project_color_identifier: newProject.value.color.replace('#', ''),
    project_description: newProject.value.description,
    project_target_budget: newProject.value.targetBudget || "0.00",
    project_actual_budget: newProject.value.actualBudget || "0.00",
    project_creator: selectedOwner?.user_id || 0,
    project_private: 0,
    project_departments: null,
    project_contacts: newProject.value.contacts,
    project_priority: priorityMap[newProject.value.priority] || 0,
    project_type: typeMap[newProject.value.type] || 0
  };

  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to create project');

    const data = await res.json();
    console.log('Project created:', data);
    router.push('/projects');
  } catch (err) {
    console.error('Submission error:', err);
    alert('Project submission failed!');
  }
};

</script>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const companies = ref([]);
const users = ref([]);
const departments = ref([]);
const tasks = ref([]);
const contacts = ref([]);
const isLoading = ref(false);
const error = ref(null);

const newProject = ref({
  name: '',
  shortName: '',
  owner: '',
  company: '',
  startDate: '2024-01-01',
  targetFinishDate: '2024-12-31',
  actualBudget: '',
  targetBudget: '',
  color: '#CC3333',
  url: '',
  stagingUrl: '',
  description: '',
  priority: 'normal',
  departments: '',
  contacts: '',
  status: 'Not Defined',
  type: 'Unknown',
  importTasks: ''
});

const fetchCompanies = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/project-company');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error('Unexpected response format: expected an array');
    }

    // Only map to the company names
    companies.value = result
      .filter(c => c.company_name) // Ensure valid entries
      .map(c => c.company_name) // Extract just the company name
      .sort(); // Sort alphabetically by company name
  } catch (err) {
    console.error('Error fetching companies:', err);
    error.value = `Companies: ${err.message}`;
    companies.value = [];
  } finally {
    isLoading.value = false;
  }
};


const fetchUsers = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/users');
    const data = await res.json();
    users.value = data.sort((a, b) => a.user_username.localeCompare(b.user_username));
  } catch (err) {
    error.value = 'Users: ' + err.message;
  }
};

const fetchDepartments = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/departments');
    const data = await res.json();
    departments.value = data.sort((a, b) => a.dept_name.localeCompare(b.dept_name));
  } catch (err) {
    error.value = 'Departments: ' + err.message;
  }
};

const fetchTasks = async () => {
  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/tasks');
    tasks.value = await res.json();
  } catch (err) {
    error.value = 'Tasks: ' + err.message;
  }
};

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchCompanies(), fetchUsers(), fetchDepartments(), fetchTasks()]);
  contacts.value = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ];
  isLoading.value = false;
});

const statusMap = {
  'Not Defined': 0,
  'Proposed': 1,
  'In Planning': 2,
  'In Progress': 3,
  'On Hold': 4,
  'Complete': 5,
  'Template': 6,
  'Archived': 7
};

const priorityMap = {
  normal: 0,
  high: 1,
  low: 2,
  critical: 3
};

const typeMap = {
  Unknown: 0,
  Administrative: 1,
  Operative: 2,
  Development: 3
};

const submitProject = async () => {
  const selectedCompany = companies.value.find(c => c.company_name === newProject.value.company);
  const selectedOwner = users.value.find(u => u.user_username === newProject.value.owner);
  const selectedDept = departments.value.find(d => d.dept_id === newProject.value.departments);

  const payload = {
    project_company: selectedCompany?.company_id || 0,
    project_department: selectedDept?.dept_id || 0,
    project_name: newProject.value.name,
    project_short_name: newProject.value.shortName,
    project_owner: selectedOwner?.user_id || 0,
    project_url: newProject.value.url,
    project_demo_url: newProject.value.stagingUrl,
    project_start_date: `${newProject.value.startDate} 00:00:00`,
    project_end_date: `${newProject.value.targetFinishDate || newProject.value.startDate} 23:59:59`,
    project_actual_end_date: null,
    project_status: statusMap[newProject.value.status] || 0,
    project_percent_complete: 0,
    project_color_identifier: newProject.value.color.replace('#', ''),
    project_description: newProject.value.description,
    project_target_budget: newProject.value.targetBudget || "0.00",
    project_actual_budget: newProject.value.actualBudget || "0.00",
    project_creator: selectedOwner?.user_id || 0,
    project_private: 0,
    project_departments: null,
    project_contacts: newProject.value.contacts,
    project_priority: priorityMap[newProject.value.priority] || 0,
    project_type: typeMap[newProject.value.type] || 0
  };

  try {
    const res = await fetch('https://dp7.wetechnoids.com/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to create project');

    const data = await res.json();
    console.log('Project created:', data);
    router.push('/projects');
  } catch (err) {
    console.error('Submission error:', err);
    alert('Project submission failed!');
  }
};
</script> -->











<!-- <template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Project Icon" class="w-6 h-6 mr-2" />
          New Project
        </h2>
        <router-link to="/projects" class="text-blue-500 hover:underline">Back to Projects</router-link>
      </div>

```
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
          <label class="block mb-1 font-medium">Project Owner <span class="text-red-500">*</span></label>
          <select v-model="newProject.owner" required
                  class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select project owner</option>
            <option v-for="user in users" :key="user.user_id" :value="user.user_username">
              {{ user.user_username }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1 font-medium">Company <span class="text-red-500">*</span></label>
          <select v-model="newProject.company" required
                  class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select a company</option>
            <option v-for="company in companies" :key="company" :value="company">
              {{ company }}
            </option>
          </select>
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
            <option v-for="dept in departments" :key="dept.dept_id" :value="dept.dept_id">
              {{ dept.dept_name }}
            </option>
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
            <option value="Administrative">Administrative</option>
            <option value="Operative">Operative</option>
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
            <option value="Not Defined">Not Defined</option>
            <option value="Proposed">Proposed</option>
            <option value="In Planning">In Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">In On Hold</option>
            <option value="Complete">Complete</option>
            <option value="Template">Template</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div>
  <label class="block mb-1 font-medium">Import tasks from</label>
  <select v-model="newProject.importTasks" 
          class="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <option value="">None</option>
    <option v-for="task in tasks" :key="task.id" :value="task.id">
      {{ task.task_name }}
    </option>
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
```

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/projectStore';

const router = useRouter();
const projectStore = useProjectStore();

// State for companies, users, and departments
const companies = ref([]);
const users = ref([]);
const departments = ref([]);
const tasks = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch companies from API
const fetchCompanies = async () => {
  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/project-company');
    if (!response.ok) throw new Error('Failed to fetch companies');
    const data = await response.json();
    companies.value = [...new Set(data.map(item => item.company_name))].sort();
  } catch (err) {
    error.value = `Companies: ${err.message}`;
    console.error('Error fetching companies:', err);
  }
};

// Fetch users from API
const fetchUsers = async () => {
  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    users.value = data.sort((a, b) => a.user_username.localeCompare(b.user_username));
  } catch (err) {
    error.value = `Users: ${err.message}`;
    console.error('Error fetching users:', err);
  }
};

// Fetch departments from API
const fetchDepartments = async () => {
  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/departments');
    if (!response.ok) throw new Error('Failed to fetch departments');
    const data = await response.json();
    departments.value = data.sort((a, b) => a.dept_name.localeCompare(b.dept_name));
  } catch (err) {
    error.value = `Departments: ${err.message}`;
    console.error('Error fetching departments:', err);
  }
};


const fetchTasks = async () => {
  try {
    const response = await fetch('https://dp7.wetechnoids.com/api/tasks');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    tasks.value = await response.json();
  } catch (err) {
    error.value = `Tasks: ${err.message}`;
    console.error('Error fetching tasks:', err);
  }
};

// Update onMounted to include tasks fetching
onMounted(async () => {
  isLoading.value = true;
  await Promise.all([
    fetchCompanies(), 
    fetchUsers(), 
    fetchDepartments(),
    fetchTasks() // Add this line
  ]);
  isLoading.value = false;
});

// Sample data - in a real app, these would likely come from API calls or other stores
const contacts = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' }
]);


const newProject = ref({
  name: '',
  owner: '',
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
  status: 'Not Defined',
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
    priority: newProject.value.priority,
    departments: newProject.value.departments,
    tasks: newProject.value.tasks
  });
  
  // Redirect back to projects list
  router.push('/projects');
};
</script>
 -->





<!-- <template>
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
   
    projectStore.addProject({
      name: newProject.value.name,
      owner: newProject.value.owner,
      company: newProject.value.company,
      startDate: newProject.value.startDate,
      status: newProject.value.status,
      priority: newProject.value.priority
    });
    

    router.push('/projects');
  };
  </script> -->