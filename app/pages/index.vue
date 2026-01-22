<script setup lang="ts">
    import { useEventsStore } from '~/stores/events'
    import EventsFilter from '~/components/EventsFilter.vue';
    import MainEventHero from '~/components/MainEventHero.vue';
    import EventCard from '~/components/EventCard.vue';
    import Container from '~/components/Container.vue';
    import NewsCard from '~/components/NewsCard.vue';
    import { useNewsStore } from '~/stores/news';

    const eventsStore = useEventsStore();
    const newsStore = useNewsStore();

    await useAsyncData('events', () =>
        eventsStore.fetchEvents()
    )

    const {events, loading, nextUpcomingEvent} = storeToRefs(eventsStore);
    
    await useAsyncData('news', () => 
        newsStore.fetchNews()
    );

    const {news, loading: newsLoading} = storeToRefs(newsStore);

</script>

<template>
    <div v-if="loading" class="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader />
    </div>

    <template v-else>
        <MainEventHero v-if="events && nextUpcomingEvent" :event="nextUpcomingEvent" :key="nextUpcomingEvent.id"/>
        <section class="my-8">
            <Container>
                <EventsFilter />
                <p class="mt-10 text-sm text-center uppercase font-bold">{{ eventsStore.eventsLength }} Eventos</p>
                <div 
                    class="grid grid-cols-1 gap-4 mt-10 animate-fade-up"
                >
                    <EventCard
                        v-for="event in eventsStore.filteredEvents"
                        :key="event.id"
                        :event="event"
                    />
                </div>
            </Container>
        </section>

        <div v-if="newsLoading" class="flex items-center justify-center">
            <Loader />
        </div>

        <section v-else class="my-8" id="news">
            <Container>
                <div 
                    ref="articles" 
                    class="grid grid-cols-1 gap-8 mt-20 animate-fade-up"
                >
                    <NewsCard v-for="(article) in news?.articles" :key="article.title" :article="article" />
                </div>
            </Container>
        </section>
    </template>
</template>