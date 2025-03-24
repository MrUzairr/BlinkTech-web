import { createRouter, createWebHistory } from 'vue-router';
import Company from '@/pages/Company.vue';

const routes = [
  { path: '/companies', name: 'Companies', component: Company }
];

const router = createRouter({
  history: createWebHistory(), // If using Vite, add import.meta.env.BASE_URL
  routes
});

console.log("Registered Routes:", router.getRoutes()); // Debugging log

export default router;




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
