import { defineStore } from 'pinia';
import axiosClient from '../axios.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        checkedAuth: false,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => {
            return !!state.user;
        },
    },

    actions: {
        async login(credentials) {
            this.loading = true;

            try {
                await axiosClient.get('/sanctum/csrf-cookie');

                const loginResponse = await axiosClient.post('/login', {
                    email: credentials.email,
                    password: credentials.password,
                });

                console.log('Login response:', loginResponse.data);

                await this.fetchUser();

                return true;
            } finally {
                this.loading = false;
            }
        },

        async register(payload) {
            this.loading = true;

            try {
                await axiosClient.get('/sanctum/csrf-cookie');

                await axiosClient.post('/register', payload);

                await this.fetchUser();
            } finally {
                this.loading = false;
            }
        },

        async fetchUser() {
            try {
                const response = await axiosClient.get('/api/user');

                this.user = response.data;
                this.checkedAuth = true;

                return this.user;
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error('Fetch user failed:', error.response?.data ?? error);
                }

                this.user = null;
                this.checkedAuth = true;

                return null;
            }
        },

        async logout() {
            this.loading = true;

            try {
                await axiosClient.post('/logout');
            } catch (error) {
                console.error(error.response?.data ?? error);
            } finally {
                this.user = null;
                this.checkedAuth = true;
                this.loading = false;
            }
        },
    },
});