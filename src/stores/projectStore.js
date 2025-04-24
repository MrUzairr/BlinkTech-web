// stores/projectStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
  const projects = ref([
    {
      name: 'Website Redesign',
      owner: 'xerion, Admin',
      company: 'Blink Tech',
      startDate: '2025-04-01',
      status: 'On Track',
      priority: 'normal'
    },
    {
      name: 'Mobile App Development',
      owner: 'xerion, Admin',
      company: 'Dynamic Fitness',
      startDate: '2025-03-10',
      status: 'Delayed',
      priority: 'high'
    },
    {
      name: 'CRM Implementation',
      owner: 'xerion, Admin',
      company: 'HANDS of Central Florida',
      startDate: '2025-02-15',
      status: 'Completed',
      priority: 'critical'
    }
  ]);

  const addProject = (project) => {
    projects.value.push(project);
  };

  return { projects, addProject };
});
