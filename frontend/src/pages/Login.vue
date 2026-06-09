<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';
import { useAuthStore } from '../stores/auth.js';

const router = useRouter();
const authStore = useAuthStore();

const errorMessage = ref('');

const data = ref({
    email: '',
    password: '',
});

async function login() {
    errorMessage.value = '';

    try {
        await authStore.login({
            email: data.value.email,
            password: data.value.password,
        });

        router.push({ name: 'home' });
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ?? 'Unable to login. Please try again.';

        console.error(error.response?.data ?? error);
    }
}
</script>

<template>
    <GuestLayout>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                class="mx-auto h-10 w-auto dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            />

            <img
                class="mx-auto h-10 w-auto not-dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
            />

            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="login" class="space-y-3">
                <div
                    v-if="errorMessage"
                    class="rounded-md bg-red-50 p-3 text-sm text-red-700"
                >
                    {{ errorMessage }}
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                    >
                        Email address
                    </label>

                    <div class="mt-2">
                        <input
                            id="email"
                            v-model="data.email"
                            type="email"
                            name="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label
                            for="password"
                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                        >
                            Password
                        </label>
                    </div>

                    <div class="mt-2">
                        <input
                            id="password"
                            v-model="data.password"
                            type="password"
                            name="password"
                            autocomplete="current-password"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        :disabled="authStore.loading"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                    >
                        {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                Not a member?

                <RouterLink
                    to="/signup"
                    class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    Sign up from here
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>

<style scoped></style>