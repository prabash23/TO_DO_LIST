import { createRouter, createWebHistory } from 'vue-router';
import Home  from './views/HomePage.vue';
import LoginPage  from './views/LoginPage.vue';
import RegistPage  from './views/RegistPage.vue';

const routes = [
    {
        path: "/",
        component: Home,
        name: "home",
    },
    {
        path: "/Login",
        component:LoginPage,
        name: "login"
    },
    {
        path: "/regist",
        component:RegistPage,
        name: "regist"
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;