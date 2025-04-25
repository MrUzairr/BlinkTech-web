import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import CompaniesView from '@/pages/company/Company.vue';
import AddCompanyView from '@/pages/company/AddCompany.vue';
import ProjectsView from '@/pages/project/Project.vue';
import AddProjectView from '@/pages/project/AddProject.vue';
import AddTaskView from '@/pages/task/Task.vue';
import AddContactView from '@/pages/contact/AddContactForm.vue';
import ContactList from '@/pages/contact/ContactList.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // Company
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView
    },
    {
      path: '/companies/add',
      name: 'add-company',
      component: AddCompanyView
    },
    // Project
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/add',
      name: 'add-projects',
      component: AddProjectView
    },
    // Task
    {
      path: '/tasks',
      name: 'add-tasks',
      component: AddTaskView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactList
    },
    {
      path: '/contacts/add',
      name: 'add-contacts',
      component: AddContactView
    },
    // Add other routes as needed
  ]
});

export default router;



// import { createRouter, createWebHistory } from 'vue-router';
// import Company from '@/pages/Company.vue';

// const routes = [
//   { path: '/companies', name: 'Companies', component: Company }
// ];

// const router = createRouter({
//   history: createWebHistory(), // If using Vite, add import.meta.env.BASE_URL
//   routes
// });

// console.log("Registered Routes:", router.getRoutes()); // Debugging log

// export default router;




// import { createRouter, createWebHistory } from 'vue-router';
// import Company from '../pages/Company.vue';
// // import HomePage from '@/pages/HomePage.vue'; // Your main page

// const routes = [
// //   { path: '/', component: HomePage },
//   { path: '/companies', component: Company }
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;
