<script setup>
    import { useEventsStore } from '~/stores/events'

    const eventsStore = useEventsStore();
</script>

<template>
    <div class="mb-4 flex justify-center gap-10">
            <button 
                @click="eventsStore.setFilter('upcoming')" 
                :class="eventsStore.filter  === 'upcoming' ? 'opacity-100' : 'opacity-50'"
                class="text-[3.3rem] leading-[3.33rem] uppercase font-extrabold"
            >
                Próximos
            </button>
            <button 
                @click="eventsStore.setFilter('past')" 
                :class="eventsStore.filter  === 'past' ? 'opacity-100' : 'opacity-50'"
                class="text-[3.3rem] leading-[3.33rem] uppercase font-extrabold"
            >
                Pasados
            </button>
        </div>
</template>