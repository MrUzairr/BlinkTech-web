import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');




// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import router from './router'
// const app = createApp(App);
// app.use(router);
// app.mount('#app');
// // createApp(App).mount('#app')
// console.log(router.getRoutes())