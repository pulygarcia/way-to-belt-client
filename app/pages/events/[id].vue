<script setup lang="ts">
    import { useEventsStore } from '~/stores/events';
    import type { Event } from '~/utils/interfaces/event';
    import { onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import FightCard from '~/components/FightCard.vue';
    import Heading from '~/components/Heading.vue';

    const eventsStore = useEventsStore();
    const route = useRoute();
    const eventId = route.params.id;

    const event:ComputedRef<Event | undefined> = computed(() => {
        return eventsStore.events.find(e => e.id === +eventId!);
    });

    onMounted(() => {
        if (!eventsStore.events.length) {
            eventsStore.fetchEvents();
        }
    });
</script>

<template>
    <section class="mt-8 w-full max-w-4xl container mx-auto">
        <div v-if="event" class="space-y-10">
            <Heading>Cartelera</Heading>
            <div class="flex justify-center">
                <div class="inline-flex border border-black text-center p-1">
                    <span class="bg-black text-white px-4 py-2 border-r border-black">WTB</span>
                    <span class="bg-white px-4 py-2 italic font-bold text-red-700">{{ event.name.split(' ')[1]?.split(':')[0] }}</span>
                </div>
            </div>

            <p class="text-center text-gray-500 italic">{{ formatDate(event.date) }} - {{ event.location?? 'Ubicación a confirmar' }}</p>

            <FightCard  
                v-for="fight in event.fights"  
                :key="fight.id"
                :fight="fight"
                :fights="event.fights"
            />
        </div>
    </section>
</template>