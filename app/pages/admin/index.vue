<script setup lang="ts">
    import { useAuthsStore } from '~/stores/auth';
    import { useEventsStore } from '~/stores/events';
    import { useFightersStore } from '~/stores/fighters';

    definePageMeta({
      layout: 'admin',
    })

    const fightersStore = useFightersStore();
    const eventsStore = useEventsStore();
    const authStore = useAuthsStore();

    await useAsyncData(async () => {
        await fightersStore.fetchFighters();
        await fightersStore.fetchLatestFighters();
        return true
    });

    await useAsyncData(async () => {
        await eventsStore.fetchEvents();
        return true
    });

    await useAsyncData(async () => {
        await authStore.getRegisteredUsers();
        return true
    });


    //data simulation
    const stats = [
    { label: 'Peleadores Activos', value: fightersStore.fightersLength, icon: '' },
    { label: 'Próximos Eventos', value: eventsStore.upcomingEventsLength, icon: ''},
    { label: 'Usuarios Registrados', value: authStore.usersLength, icon: '' },
    { label: 'Eventos Finalizados', value: eventsStore.pastEventsLength, icon: '' },
    ]
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col">
      <h2 class="text-3xl font-extrabold italic uppercase tracking-tighter text-gray-900">
        Resumen del Sistema
      </h2>
      <p class="text-gray-500 font-semibold uppercase text-xs tracking-widest mt-1">
        Estado actual de la liga WTB
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" 
           class="bg-white p-6 border-b-4 border-gray-900 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{{ stat.label }}</p>
            <h3 class="text-4xl font-black italic text-gray-900">{{ stat.value }}</h3>
          </div>
          <span class="text-2xl">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2 bg-gray-900 text-white p-8 relative overflow-hidden group">
        <div class="relative z-10">
            <span class="bg-red-600 px-3 py-1 text-[10px] font-black uppercase italic tracking-widest">Próximo Evento</span>
            <h4 class="text-4xl font-[1000] uppercase italic tracking-tighter mt-4">{{ eventsStore.nextUpcomingEvent?.name }}</h4>
            <p class="text-gray-400 font-mono text-sm mt-2">{{ eventsStore.nextUpcomingEvent?.date }} - {{ eventsStore.nextUpcomingEvent?.location }}</p>
            
            <div class="flex gap-4 mt-8">
                <button class="bg-white text-black px-6 py-2 text-xs font-black uppercase italic hover:bg-red-600 hover:text-white transition">Gestionar Cartelera</button>
                <button class="px-6 py-2 text-xs font-black uppercase italic hover:bg-white/10 transition">Ver Detalles</button>
            </div>
        </div>
        <span class="absolute right-[-20px] bottom-[-40px] text-[180px] font-black italic text-white/[0.03] select-none">WTB</span>
      </div>

      <div class="bg-white border border-gray-200 p-6">
        <h4 class="font-black uppercase italic text-sm border-b border-gray-100 pb-4 mb-4">Nuevos Ingresos</h4>
        <div class="space-y-4">
            <div v-for="fighter in fightersStore.latestFighters" :key="fighter.id" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs italic">
                    {{ fightersStore.latestFighters.indexOf(fighter) + 1 }}
                </div>
                <div class="flex flex-col">
                    <span class="text-base font-bold uppercase italic text-gray-900 leading-none">{{ fighter.firstName }} {{ fighter.lastName }}</span>
                    <span class="text-xs text-gray-500 font-bold mt-1">{{fighter.weightClass}} • {{fighter.wins}}-{{ fighter.losses }}-{{ fighter.draws }}</span>
                </div>
            </div>
        </div>
        <button class="w-full mt-6 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition">Ver todos los peleadores</button>
      </div>

    </div>
  </div>
</template>