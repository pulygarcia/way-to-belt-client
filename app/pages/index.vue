<script setup>
    import { useEventsStore } from '~/stores/events'
    import EventsFilter from '~/components/EventsFilter.vue';
    import MainEventHero from '~/components/MainEventHero.vue';
    import EventCard from '~/components/EventCard.vue';
    import Container from '~/components/Container.vue';

    const eventsStore = useEventsStore();

    useAsyncData('events', () =>
        eventsStore.fetchEvents()
    )

    const { events, loading } = storeToRefs(eventsStore);

    const nextUpcomingEvent = computed(() => {
        const allEvents = events.value || [];

        const upcomingEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            const now = new Date();
            return eventDate >= now;
        });

        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        return upcomingEvents[0];
    });
</script>

<template>
    <div v-if="loading" class="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader />
    </div>

    <template v-else>
        <MainEventHero v-if="events.length" :event="nextUpcomingEvent" :key="nextUpcomingEvent.id"/>
        <section class="mt-8">
            <Container>
                <EventsFilter />
                <p class="mt-10 text-sm text-center uppercase font-bold">{{ eventsStore.eventsLength }} Eventos</p>
                <div class="grid grid-cols-1 gap-4 mt-10 animate-fade-up animation-duration-500">
                    <EventCard
                        v-for="event in eventsStore.filteredEvents"
                        :key="event.id"
                        :event="event"
                    />
                </div>
            </Container>
        </section>
    </template>
</template>

