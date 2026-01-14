<script setup lang="ts">
  import { useFightersStore } from '~/stores/fighters'
  import { storeToRefs } from 'pinia';
  import Loader from '~/components/Loader.vue';

  const fightersStore = useFightersStore();
  const route = useRoute();
  
  await useAsyncData('fighter', () =>
    fightersStore.fetchFighterById(route.params.id as string)
  )

  const { fighter, fighterFightsHistory, loading } = storeToRefs(fightersStore); //storeToRefs allows to keep reactivity when extracting properties from the pinia store
</script>

<template>
  <section class="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800 via-gray-800 to-black py-12 px-4 font-sans selection:bg-blue-800 selection:text-white">
    
    <Container class="animate-fade-up animation-duration-500">
      <NuxtLink to="/fighters" class="inline-flex items-center gap-2 text-white text-xs font-black uppercase mb-12 hover:text-blue-400 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar al ranking
      </NuxtLink>

      <Loader v-if="loading" />

      <div v-else-if="fighter" class="grid grid-cols-12 gap-6">
        
        <header class="col-span-12 lg:col-span-9">
          <div class="bg-black/40 border border-white/10 p-8 md:p-12 rounded-sm relative overflow-hidden">

            <p class="text-blue-400 text-xs font-black uppercase mb-4">perfil de atleta</p>

            <h1 class="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase italic tracking-tighter">
              {{ fighter.firstName }}<br>
              <span class="text-transparent" style="-webkit-text-stroke: 2px rgba(255,255,255,0.8);">
                {{ fighter.lastName }}
              </span>
            </h1>
            
            <div class="mt-8 flex flex-wrap gap-4 items-center">
              <span class="bg-blue-600 text-white px-4 py-1 text-sm font-black italic uppercase tracking-widest">
                "{{ fighter.nickname }}"
              </span>
              <span class="text-white/60 text-xs font-bold uppercase tracking-widest border-l border-white/20 pl-4 italic">
                {{ fighter.weightClass }}
              </span>
            </div>
          </div>
        </header>

        <div class="col-span-12 lg:col-span-3">
            <div 
              class="h-full flex flex-col items-center justify-center p-8 rounded-sm shadow-2xl shadow-blue-500/20"
              :class="fighter.rankingPosition === 0 ? 'bg-yellow-600' : 'bg-blue-600'"
            >
                <span class="text-white/70 text-xs font-black uppercase tracking-widest mb-2 text-center">Ranking mundial</span>
                <span 
                  class="font-black text-white italic w-full text-center"
                  :class="fighter.rankingPosition === 0 ? 'text-4xl' : 'text-7xl'"
                >
                  #{{ fighter.rankingPosition === 0 ? 'Campeón' : fighter.rankingPosition }}
                </span>
            </div>
        </div>

        <div class="col-span-12 md:col-span-4 grid grid-cols-1 gap-4">
            <div class="bg-black/30 backdrop-blur-md border border-white/10 p-6 flex justify-between items-center">
                <div>
                    <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest">Victorias</p>
                    <p class="text-4xl font-black text-white italic">{{ fighter.wins }}</p>
                </div>
                <div class="h-12 w-1 bg-blue-600"></div>
            </div>
            <div class="bg-black/30 backdrop-blur-md border border-white/10 p-6 flex justify-between items-center">
                <div>
                    <p class="text-xs text-gray-400 font-black uppercase tracking-widest">Derrotas</p>
                    <p class="text-4xl font-black text-white italic">{{ fighter.losses }}</p>
                </div>
                <div class="h-12 w-1 bg-red-600/50"></div>
            </div>
        </div>

        <div class="col-span-12 md:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div v-for="(val, label) in { Altura: fighter.height + 'cm', Alcance: fighter.reach + 'cm', Edad: fighter.age, País: fighter.nationality }" 
                     :key="label"
                     class="flex flex-col">
                    <span class="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">{{ label }}</span>
                    <span class="text-xl font-bold text-white uppercase italic">{{ val }}</span>
                </div>
            </div>
            
            <div class="mt-12">
                <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                    <span>Performance</span>
                    <span class="text-blue-400">{{ ((fighter.wins / (fighter.wins + fighter.losses)) * 100).toFixed(0) }}% Win Rate</span>
                </div>
                <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <div class="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]" :style="{ width: (fighter.wins / (fighter.wins + fighter.losses)) * 100 + '%' }"></div>
                </div>
            </div>
        </div>
      </div>

      <div v-if="fighterFightsHistory && fighterFightsHistory.length > 0" class="col-span-12 mt-16">
        <div class="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-2 h-6 bg-blue-600"></div>
            <h2 class="text-white text-2xl font-black uppercase italic tracking-tighter">Registros de Combate</h2>
          </div>
          <div class="text-xs text-white/30 uppercase font-bold">Peleas en la compañía: {{ fighterFightsHistory.length }}</div>
        </div>

        <div class="grid gap-4">
          <div v-for="fight in fighterFightsHistory" :key="fight.id" 
            class="relative bg-gradient-to-r from-black/60 to-transparent border-l-4 border-y border-r border-white/5"
            :class="fight.status === 'FINALIZADA' ? 'border-l-blue-600' : 'border-l-zinc-600'"
          >
            
            <div class="flex flex-col md:flex-row items-stretch">
              
              <div class="p-4 flex md:flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] min-w-[100px]">
                <span class="text-white font-black text-lg leading-none italic">{{ new Date(fight.event.date).getFullYear() }}</span>
                <span class="text-blue-500 font-mono text-xs font-bold uppercase md:mt-2 tracking-tighter">{{ fight.status }}</span>
              </div>

              <div class="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-center gap-6">
                  <div class="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white/20 font-black text-xl italic">
                    {{ fight.opponent.firstName[0] }}{{ fight.opponent.lastName[0] }}
                  </div>
                  
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs bg-white/10 px-1.5 py-0.5 text-white/40 font-black uppercase">oponente</span>
                      <span v-if="fight.method" class="text-xs text-blue-400 font-bold uppercase tracking-widest">{{ fight.method }}</span>
                    </div>
                    <h4 class="text-white text-2xl font-black uppercase italic tracking-tighter leading-none ">
                      {{ fight.opponent.firstName }} {{ fight.opponent.lastName }}
                    </h4>
                    <p 
                      class="text-sm uppercase italic font-bold"
                      :class="fight.winner?.id === fighter.id ? 'text-green-400' : fight.status === 'FINALIZADA' ? 'text-red-400' : 'text-yellow-400'"
                    >
                      {{ fight.winner?.id === fighter.id ? 'Victoria' : fight.status === 'FINALIZADA' ? 'Derrota' : 'Pendiente' }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-col md:items-end justify-center">
                  <p class="text-white font-bold text-xs uppercase tracking-tight italic text-right">{{ fight.event.name }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-white/30 text-xs uppercase font-bold tracking-tighter">{{ fight.event.location }}</span>
                    <div class="w-1 h-1 bg-blue-600 rounded-full"></div>
                    <span class="text-white/30 text-xs uppercase font-bold tracking-tighter">{{ fight.rounds }} Rounds</span>
                  </div>
                </div>

              </div>

              <NuxtLink :to="`/fights/${fight.id}`" class="cursor-pointer hover:bg-blue-500 flex items-center justify-center p-4 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/70 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
h1, h2, h3, p {
  text-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
</style>