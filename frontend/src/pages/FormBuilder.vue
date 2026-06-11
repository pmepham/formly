<script setup>
import { ref } from 'vue'
import { CheckIcon } from '@heroicons/vue/20/solid'

const formTitle = ref(null)

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'

    switch (day % 10) {
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
    }
}

function formatDraftDate(date) {
    const weekday = date.toLocaleDateString('en-GB', {
        weekday: 'short',
    })

    const day = date.getDate()
    const month = date.toLocaleDateString('en-GB', {
        month: 'long',
    })

    const year = date.getFullYear()

    return `${weekday} ${day}${getOrdinalSuffix(day)} ${month} ${year}`
}

function createForm() {
    const now = new Date()

    formTitle.value = `Form Draft - ${formatDraftDate(now)}`
}
</script>

<template>
    <header class="relative bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="lg:flex lg:items-center lg:justify-between">
                <div class="min-w-0 flex-1">
                    <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Form Builder
                        <span v-if="formTitle">
                            - {{ formTitle }}
                        </span>
                    </h2>
                </div>

                <span class="sm:ml-3">
                    <button type="button" @click="createForm"
                        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <CheckIcon class="mr-1.5 -ml-0.5 size-5" aria-hidden="true" />
                        Create a Form
                    </button>
                </span>
            </div>
        </div>
    </header>

    <main>

    </main>
</template>

<style scoped></style>