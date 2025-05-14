<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
      <h2 class="text-2xl font-bold flex items-center">
        <img src="@/assets/handshake.png" alt="Project Icon" class="w-6 h-6 mr-2" />
        Projects 
      </h2>
      <div class="flex flex-col md:flex-row md:items-center gap-2">
        <div class="flex items-center gap-2">
          <label class="font-semibold">Search:</label>
          <input v-model="searchQuery" type="text" class="border px-2 py-1 w-full md:w-auto" placeholder="Search..." />
        </div>
        <router-link to="/projects/add" class="bg-blue-500 text-white px-4 py-1 rounded w-full md:w-auto">
          New Project
        </router-link>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex flex-wrap gap-1 mb-4 overflow-x-auto">
        <button
          v-for="tab in statusTabs"
          :key="tab.status"
          @click="activeStatus = tab.status"
          :class="['px-3 py-1 text-sm border rounded', activeStatus === tab.status ? 'bg-blue-500 text-white' : 'bg-gray-200']"
        >
          {{ tab.label }} ({{ tab.count }})
        </button>
      </div>

      <div class="overflow-x-auto bg-white shadow rounded border">
        <table class="min-w-full text-sm">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="border px-2 py-1 text-left">Color</th>
              <th class="border px-2 py-1 text-left">Company</th>
              <th class="border px-2 py-1 text-left">Project Name</th>
              <th class="border px-2 py-1 text-left">Start</th>
              <th class="border px-2 py-1 text-left">End</th>
              <th class="border px-2 py-1 text-left">Actual</th>
              <th class="border px-2 py-1 text-left">Owner</th>
              <th class="border px-2 py-1 text-left">Tasks (My)</th>
              <th class="border px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in filteredProjects" :key="project.project_id" class="hover:bg-gray-50">
              <td
                class="border px-2 py-1"
                :style="{
                  backgroundColor: getBackgroundColor(project.project_color_identifier),
                  color: getContrastColor(project.project_color_identifier)
                }"
              >
                <div class="flex items-center gap-2 font-semibold">
                  <span>{{ formatPercent(project.project_percent_complete) }}</span>
                </div>
              </td>
              <td class="border px-2 py-1">{{ project.companyName }}</td>
              <td class="border px-2 py-1">{{ project.project_name }}</td>
              <td class="border px-2 py-1">
                {{ isValidDate(project.project_start_date) ? formatDate(project.project_start_date) : '-' }}
              </td>
              <td class="border px-2 py-1">
                {{ isValidDate(project.project_end_date) ? formatDate(project.project_end_date) : '-' }}
              </td>
              <td class="border px-2 py-1">
                {{ isValidDate(project.project_actual_end_date) ? formatDate(project.project_actual_end_date) : '-' }}
              </td>
              <td class="border px-2 py-1">{{ project.ownerName }}</td>
              <td class="border px-2 py-1">{{ project.tasksCount }}</td>
              <td class="border px-2 py-1">
  {{ statusLabels[project.project_status] }} 
  ({{ statusCounts[project.project_status] || 0 }})
</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="text-sm font-semibold">Owner: [{{ ownerCount }} users] Company/Dividend [{{ dividendCount }}]</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      activeStatus: 'all',
      projects: [],
      statusLabels: {
        0: 'Hot Defined',
        1: 'Proposed',
        2: 'In Planning',
        3: 'In Progress',
        4: 'On Hold',
        5: 'Complete',
        6: 'Template',
        7: 'Archived',
        8: 'Grant'
      }
    };
  },
  computed: {
    totalProjects() {
      return this.projects.length;
    },
    ownerCount() {
      return 1;
    },
    dividendCount() {
      return 1;
    },
    statusCounts() {
  const counts = {};
  this.projects.forEach(project => {
    const status = project.project_status;
    counts[status] = (counts[status] || 0) + 1;
  });
  return counts;
},
    statusTabs() {
      return [
        { status: 'all', label: 'All', count: this.totalProjects },
        ...Object.entries(this.statusLabels).map(([status, label]) => ({
          status: parseInt(status),
          label,
          count: this.getProjectCountByStatus(parseInt(status))
        }))
      ];
    },
    filteredProjects() {
      if (this.activeStatus === 'all') {
        return this.projects;
      }
      return this.projects.filter(
        (project) => project.project_status === this.activeStatus
      );
    }
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await fetch('https://dp7.wetechnoids.com/api/project-company');
        const data = await response.json();
        this.projects = data.map((project) => ({
          project_id: project.project_id,
          project_name: project.project_name,
          project_company: project.project_company,
          company_name: project.company_name,
          project_start_date: project.project_start_date,
          project_end_date: project.project_end_date,
          project_status: project.project_status,
          project_color_identifier: project.project_color_identifier,
          user_username: project.user_username,
          project_actual_end_date: project.project_actual_end_date,
          project_percent_complete: project.project_percent_complete.toFixed(1) || 0,
          project_duration: project.project_duration,
          companyName: project.company_name,
          ownerName: project.user_username,
          tasksCount: project.my_tasks
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    getProjectCountByStatus(status) {
      return this.projects.filter(project => project.project_status === status).length;
    },
    isValidDate(value) {
      return value && !isNaN(new Date(value).getTime());
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    formatPercent(value) {
      return value ? `${value}%` : '0%';
    },
    getBackgroundColor(colorHex) {
      return colorHex ? `#${colorHex.replace('#', '')}` : '#cccccc';
    },
    getContrastColor(hex) {
      if (!hex) return '#000000';
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.6 ? '#000000' : '#ffffff';
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
}
th, td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
}
.color-box {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: inline-block;
}
</style>













<!-- <template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h2 class="text-2xl font-bold flex items-center">
          <img src="@/assets/handshake.png" alt="Project Icon" class="w-6 h-6 mr-2" />
          Projects
        </h2>
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <div class="flex items-center gap-2">
            <label class="font-semibold">Search:</label>
            <input v-model="searchQuery" type="text" class="border px-2 py-1 w-full md:w-auto" placeholder="Search..." />
          </div>
          <router-link to="/projects/add" class="bg-blue-500 text-white px-4 py-1 rounded w-full md:w-auto">
            New Project
          </router-link>
        </div>
      </div>
  
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Reports</h3>
        
        <div class="flex flex-wrap gap-1 mb-4 overflow-x-auto">
          <button
            v-for="tab in statusTabs"
            :key="tab.status"
            @click="activeStatusTab = tab.status"
            :class="['px-3 py-1 text-sm border rounded', activeStatusTab === tab.status ? 'bg-blue-500 text-white' : 'bg-gray-200']"
          >
            {{ tab.label }} ({{ tab.count }})
          </button>
        </div>
  
        <div class="overflow-x-auto bg-white shadow rounded border">
          <table class="min-w-full text-sm">
            <thead class="bg-blue-900 text-white">
              <tr>
                <th class="border px-2 py-1 text-left">Order</th>
                <th class="border px-2 py-1 text-left">Company</th>
                <th class="border px-2 py-1 text-left">Project Name</th>
                <th class="border px-2 py-1 text-left">SDK</th>
                <th class="border px-2 py-1 text-left">IDA</th>
                <th class="border px-2 py-1 text-left">ASM</th>
                <th class="border px-2 py-1 text-left">Group</th>
                <th class="border px-2 py-1 text-left">Levels (n/w)</th>
                <th class="border px-2 py-1 text-left">Detected</th>
                <th class="border px-2 py-1 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in filteredProjects" :key="project.id" class="hover:bg-gray-50">
                <td class="border px-2 py-1">{{ project.order }}%</td>
                <td class="border px-2 py-1">{{ project.company }}</td>
                <td class="border px-2 py-1">{{ project.name }}</td>
                <td class="border px-2 py-1">{{ project.sdk }}</td>
                <td class="border px-2 py-1">{{ project.ida || '-' }}</td>
                <td class="border px-2 py-1">{{ project.asm || '-' }}</td>
                <td class="border px-2 py-1">{{ project.group || '-' }}</td>
                <td class="border px-2 py-1">{{ project.levels }}</td>
                <td class="border px-2 py-1 text-center">○</td>
                <td class="border px-2 py-1">{{ project.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="mt-6">
        <h3 class="text-sm font-semibold">Owner: [{{ ownerCount }} users] Company/Dividend [{{ dividendCount }}]</h3>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Sample data
  const projects = ref([
    { id: 1, order: 30.0, company: 'James Groves', name: 'ghandijucaband.com', sdk: '201/12/01', ida: null, asm: '3/12/2022', group: null, levels: 'Jyssseil', status: 'Archived (275)' },
    { id: 2, order: 100.0, company: "Donna's Door and Window", name: 'Donna Gen', sdk: '08/10/2009', ida: null, asm: '3/12/2020', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 3, order: 35.7, company: 'Zona Defense', name: 'Zona Defense General', sdk: '25/09/2010', ida: null, asm: '3/12/2011', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 4, order: 94.0, company: 'Accent Trees and Nursery', name: 'Accent Trees Main', sdk: '20/10/2010', ida: null, asm: '3/12/2011', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 5, order: 100.0, company: 'Vennakloppa CPA, P.A.', name: 'VennakloppaCPA', sdk: '05/11/2010', ida: null, asm: '3/12/2011', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 6, order: 100.0, company: 'Family Beautiful', name: 'Family Beautiful General', sdk: '04/04/2011', ida: null, asm: '3/12/2012', group: null, levels: 'Jyssseil', status: 'Archived (275)' },
    { id: 7, order: 97.5, company: 'BlueBricktelling.com', name: 'BlueBricktelling', sdk: '02/08/2011', ida: null, asm: '3/12/2012', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 8, order: 8.0, company: 'Panama Pacific Coffee', name: 'panamagacificcoffee.com', sdk: '07/03/2012', ida: null, asm: '3/12/2012', group: null, levels: 'Jyssseil', status: 'Archived (275)' },
    { id: 9, order: 100.0, company: 'moviefulfifffmfestival.com', name: 'moviefulfifffmfestival.com', sdk: '02/10/2012', ida: null, asm: '3/12/2012', group: null, levels: 'Jyssseil', status: 'Archived (275)' },
    { id: 10, order: 0.0, company: 'Vennakloppa CPA, P.A.', name: 'Vennakloppa CPA 2013', sdk: '26/07/2013', ida: null, asm: '3/12/2013', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 11, order: 100.0, company: 'Iciataclear Enterprises, LLC', name: 'Iciataclear.com', sdk: '29/04/2014', ida: null, asm: '3/12/2014', group: null, levels: 'plokvin', status: 'Archived (275)' },
    { id: 12, order: 100.0, company: 'The Ritz-Caribas of Sarateta', name: 'Jack Dusty', sdk: '02/05/2014', ida: null, asm: '3/12/2014', group: null, levels: 'emanes', status: 'Archived (275)' },
    { id: 13, order: 100.0, company: '4 Factor Advertising', name: '4 Factor 2013', sdk: '11/05/2015', ida: null, asm: '3/12/2015', group: null, levels: 'emanes', status: 'Archived (275)' },
    { id: 14, order: 0.0, company: 'Michael Gould', name: 'Gould Gen 2012', sdk: '15/08/2012', ida: null, asm: null, group: null, levels: 'Bookdry', status: 'Archived (275)' },
    { id: 15, order: 0.0, company: 'Michael Gould', name: 'Niho 2011', sdk: '15/08/2012', ida: null, asm: null, group: null, levels: 'Bookdry', status: 'Archived (275)' },
    { id: 16, order: 100.0, company: 'Hustos of Central Florida', name: 'HUD CASE Scope', sdk: '18/08/2007', ida: '06/10/2007', asm: '07/09/2007', group: null, levels: 'plokvin', status: 'Archived (275)' },
  ]);
  
  // Status tabs with counts
  const statusTabs = ref([
    { status: 'All', label: 'All', count: 313 },
    { status: 'Hub Defined', label: 'Hub Defined', count: 0 },
    { status: 'Proposed', label: 'Proposed', count: 0 },
    { status: 'In Planning', label: 'In Planning', count: 1 },
    { status: 'In Progress', label: 'In Progress', count: 29 },
    { status: 'On Hold', label: 'On Hold', count: 0 },
    { status: 'Complete', label: 'Complete', count: 2 },
    { status: 'Template', label: 'Template', count: 0 },
    { status: 'Archived', label: 'Archived', count: 275 },
    { status: 'Guest', label: 'Guest', count: 0 },
  ]);
  
  const activeStatusTab = ref('All');
  
  // Owner counts
  const ownerCount = ref(23);
  const dividendCount = ref(24);
  
  // Filters
  const searchQuery = ref('');
  
  const filteredProjects = computed(() => {
    return projects.value.filter(project => {
      const matchesSearch = 
        project.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      
      const matchesStatus = 
        activeStatusTab.value === 'All' || 
        project.status.toLowerCase().includes(activeStatusTab.value.toLowerCase());
      
      return matchesSearch && matchesStatus;
    });
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style> -->