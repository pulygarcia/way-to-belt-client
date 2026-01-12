<script setup lang="ts">
    import { useEventsStore } from '~/stores/events';
    import type { FightEvent } from '~/utils/interfaces/event';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import FightCard from '~/components/FightCard.vue';

    const eventsStore = useEventsStore();
    const route = useRoute();
    const eventId = route.params.id;

    useAsyncData(async () => {
        if (eventsStore.events.length === 0) {
            await eventsStore.fetchEvents();
        }
        return true
    });

    const {events} = storeToRefs(eventsStore);

    const event = computed<FightEvent | undefined>(() => {
        return events.value.find(e => e.id === +eventId!);
    });

</script>

<template>
    <section class="min-h-screen bg-[#050505] pt-20 pb-24 overflow-hidden relative">
        
        <div class="absolute top-0 right-0 opacity-[0.03]">
            <h1 class="text-[30vw] font-black italic leading-none text-white">{{ event?.name.split(':')[0] }}</h1>
        </div>

        <div class="max-w-6xl container mx-auto px-4 relative z-10">
            
            <div v-if="event" class="space-y-16">
                
                <header class="flex flex-col items-center text-center">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="h-[1px] w-12 bg-blue-600"></div>
                        <span class="text-blue-500 font-black tracking-widest text-xs uppercase">Cartelera oficial</span>
                        <div class="h-[1px] w-12 bg-blue-600"></div>
                    </div>

                    <h1 class="text-7xl md:text-9xl font-extrabold text-white italic uppercase tracking-tighter leading-none mb-6">
                        {{ event.name.split(':')[0] }}
                    </h1>

                    <div class="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-white/40 font-bold uppercase text-xs tracking-widest italic">
                        <div class="flex items-center gap-2">
                            <span class="text-blue-500 uppercase">Fecha: </span> {{ formatDate(String(event.date)) }}
                        </div>
                        <div class="w-1 h-1 bg-white/20 rounded-full hidden md:block"></div>
                        <div class="flex items-center gap-2">
                            <span class="text-blue-500 uppercase">Ubicación: </span> {{ event.location ?? 'Las Vegas, NV' }}
                        </div>
                    </div>
                </header>

                <div class="space-y-4">
                    <div class="flex items-center gap-4 mb-8">
                        <h2 class="text-white text-xl font-black uppercase italic tracking-tighter">Cartelera principal</h2>
                        <div class="flex-1 h-[1px] bg-gray-500"></div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 animate-fade-up animation-duration-500">
                        <FightCard
                            v-for="(fight, index) in event.fights"
                            :key="fight.id"
                            :fight="fight"
                            :is-main-event="index === 0"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>