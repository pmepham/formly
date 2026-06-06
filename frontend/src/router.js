import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "./components/DefaultLayout.vue";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import NotFound from "./pages/NotFound.vue";
import FormConductor from "./pages/FormConductor.vue";
import FormBuilder from "./pages/FormBuilder.vue";

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: 'form',
                name: 'form-conductor',
                component: FormConductor,
            },
            {
                path: 'form/builder',
                name: 'form-builder',
                component: FormBuilder,
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;