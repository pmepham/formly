import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "./components/DefaultLayout.vue";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import NotFound from "./pages/NotFound.vue";
import FormConductor from "./pages/FormConductor.vue";
import FormBuilder from "./pages/FormBuilder.vue";

import { useAuthStore } from "./stores/auth.js";

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            guestOnly: true,
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: {
            guestOnly: true,
        },
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

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
    const guestOnly = to.matched.some((route) => route.meta.guestOnly);

    if (!authStore.checkedAuth) {
        await authStore.fetchUser();
    }

    if (requiresAuth && !authStore.isAuthenticated) {
        return {
            name: 'login',
        };
    }

    if (guestOnly && authStore.isAuthenticated) {
        return {
            name: 'home',
        };
    }

    return true;
});

export default router;