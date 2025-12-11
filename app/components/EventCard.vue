<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        event: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div
        class="p-4 border rounded shadow bg-white space-y-3 cursor-pointer hover:bg-gray-50 hover:scale-105 transition"
        @click="router.push({path: `/events/${event.id}`})"
    >
        <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold">{{ event.name }}</h3>
        </div>

        <p class="text-gray-700 text-sm font-medium flex items-center gap-2">
            <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg">
                Pelea estelar
            </span>

            <span v-if="event.fights?.length" class="font-semibold text-base">
                {{ event.fights[0].fighterA.lastName }} vs {{ event.fights[0].fighterB.lastName }}
            </span>
            <span v-else class="font-semibold">Por definir</span>
        </p>

        <p class="text-gray-600 text-sm">📅 Fecha: {{ formatDate(event.date) }}</p>
        <p class="text-gray-600 text-sm">📍 Lugar: {{ event.location }}</p>
    </div>
</template>