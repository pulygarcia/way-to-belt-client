<script setup>
    import Button from '~/components/ui/button/Button.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        event: Object,
    });
</script>

<template>
    <div 
        class="relative w-full h-screen flex flex-col items-center justify-center text-center text-white p-4 overflow-hidden"
    >
        <div 
            class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" 
        ></div>

        <div class="absolute inset-0 bg-gradient-to-t from-red-800/80 via-black/70 to-black/80 "></div>

        <div class="relative z-10 max-w-4xl mx-auto py-12">
            
            <h1 class="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-tight mb-4 drop-shadow-lg animate-fade-in-up">
                {{ props.event.name }}
            </h1>

            <p class="mt-4 text-3xl sm:text-4xl font-bold italic tracking-wide text-red-300 drop-shadow-md animate-fade-in-up delay-100">
                <span v-if="props.event.fights?.length">
                    {{ props.event.fights[0].fighterA.lastName }} <span class="text-white font-normal mx-2">VS</span> {{ props.event.fights[0].fighterB.lastName }}
                </span>
                <span v-else>Próximamente: Pelea Estelar por definir</span>
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-xl md:text-2xl font-medium opacity-95 animate-fade-in-up delay-200">
                <p>
                    <i class="fas fa-calendar-alt mr-2 text-red-400"></i> 
                     {{ formatDate(props.event.date) }}
                </p>
                <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                <p>
                    <i class="fas fa-map-marker-alt mr-2 text-red-400"></i> 
                     {{ props.event.location || "Ubicación a confirmar" }}
                </p>
            </div>

            <Button
                @click="router.push(`/events/${props.event.id}`)"
                variant="outline" 
                size="lg"
                class="mt-12 px-10 py-4 text-xl font-bold uppercase transition hover:scale-105 active:scale-95"
            >
                <span>¡Ver Evento Completo Ahora!</span>
            </Button>

        </div>
    </div>
</template>