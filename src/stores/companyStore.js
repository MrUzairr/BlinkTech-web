import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCompanyStore = defineStore('company', () => {
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

  const addCompany = (company) => {
    companies.value.push(company);
  };

  return { companies, addCompany };
});