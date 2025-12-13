<script setup>
    import { useRouter } from 'vue-router';
    import Card from './ui/card/Card.vue';
    import CardTitle from './ui/card/CardTitle.vue';
    import  CardHeader from './ui/card/CardHeader.vue';
    import CardContent from './ui/card/CardContent.vue';

    const router = useRouter();

    const props = defineProps({
        event: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <Card>
        <div
            class="flex items-center p-4 bg-gray-800 border-l-8 border-red-600 rounded-lg shadow-2xl cursor-pointer hover:bg-gray-900 transition"
            @click="router.push({path: `/events/${event.id}`})"
        >
            <div class="flex flex-col justify-center w-1/4 min-w-max pr-4 border-r border-gray-600 text-center">
                <p class="text-xl font-bold text-white">
                    {{ formatDate(event.date) }}
                </p>
                <p class="text-xs text-gray-400 mt-1 truncate">
                    {{ event.location }}
                </p>
            </div>
            <div class="flex-grow flex flex-col justify-center px-6">
                <CardHeader class="p-0">
                    <CardTitle>
                        <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-lg font-bold text-white truncate">{{ event.name }}</h3>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent class="p-0">
                    <p class="text-2xl font-black text-white flex items-center gap-2">
                        <span v-if="event.fights?.length" class="text-white">
                            {{ event.fights[0].fighterA.lastName }}
                        </span>
                        <span v-else class="text-red-400 italic">
                            Pendiente
                        </span>
                        <span class="text-red-600 font-bold mx-2">
                            VS
                        </span>
                        <span v-if="event.fights?.length" class="text-white">
                            {{ event.fights[0].fighterB.lastName }}
                        </span>
                        <span v-else class="text-white italic">
                            Definir
                        </span>
                    </p>
                </CardContent>
            </div>
            <div class="ml-auto pl-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </Card>
</template>