<script setup>
    import { useEventsStore } from '~/stores/events'
    import EventsFilter from '~/components/EventsFilter.vue';
    import MainEventHero from '~/components/MainEventHero.vue';
    import EventCard from '~/components/EventCard.vue';

    const eventsStore = useEventsStore();

    onMounted(() => {
        eventsStore.fetchEvents();
    })
</script>

<template>
    <MainEventHero v-if="eventsStore.events.length" :event="eventsStore.events[0]" :key="eventsStore.events[0].id"/>

    <section class="mt-8 w-full max-w-4xl container mx-auto">
        <EventsFilter />

        <p class="mt-10 text-sm text-center uppercase font-bold">{{ eventsStore.eventsLength }} Eventos</p>
    
        <div class="grid grid-cols-1 gap-4 mt-10">
            <EventCard 
                v-for="event in eventsStore.filteredEvents" 
                :key="event.id" 
                :event="event"
            />
        </div>
    </section>
</template>

