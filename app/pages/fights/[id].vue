<script setup>
  import { useFightsStore } from '~/stores/fights'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import Loader from '~/components/Loader.vue';

  const fightsStore = useFightsStore();
  const route = useRoute();

  await useAsyncData('fight', () =>
    fightsStore.fetchFightById(String(route.params.id))
  )

  const { fight, loading } = storeToRefs(fightsStore);

  //stats existence check
  const hasStats = computed(() => {
    return fight.value?.stats && fight.value.stats.length > 0;
  })
</script>

<template>
  <section class="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-gray-700 to-black text-white p-4 md:p-8">
    <Loader v-if="loading" />
    <div v-if="!loading && fight.id">
      <header class="max-w-6xl container mx-auto text-center mb-10">
        <div class="inline-block bg-red-600 px-4 py-1 mb-4">
          <span class="text-xs font-black uppercase tracking-[0.2em]">{{ fight.fighterA.weightClass }}</span>
        </div>
        <p class="text-gray-500 font-bold italic uppercase text-xs mb-1">
          {{ fight.event.name }}
        </p>
        <div class="flex justify-center items-center gap-4 text-gray-500 font-bold text-sm uppercase">
          <span>{{ fight.event.date }}</span>
          <span class="w-2 h-2 bg-red-600 rotate-45"></span>
          <span>{{ fight.event.location }}</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-3">
          {{ hasStats ? 'Post-Fight Analytics' : 'Upcoming Fight' }} <span class="text-red-600"></span>
        </h1>
      </header>
      <main class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-800 shadow-2xl relative">
    
          <div class="flex flex-col items-center">
            <div class="relative">
              <div :class="[
                'w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-4xl font-black border-4 transition-all duration-500',
                hasStats && fight.stats[0]?.isWinner ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-gray-700 bg-gray-800 text-gray-500'
              ]">
                {{ getInitials(fight.fighterA.firstName, fight.fighterA.lastName) }}
              </div>
              <div class="absolute -bottom-3 bg-gray-800 border border-gray-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                {{ fight.fighterA.nationality }}
              </div>
            </div>
            <h2 class="mt-6 text-2xl font-black uppercase leading-none text-center">
              {{ fight.fighterA.firstName }}
              <span class="block text-3xl">{{ fight.fighterA.lastName }}</span>
            </h2>
            <p class="text-gray-500 font-bold mt-2">{{ fight.fighterA.wins }}-{{ fight.fighterA.losses }}-{{ fight.fighterA.draws }}</p>
          </div>
          <div class="flex flex-col items-center justify-center py-6 md:py-0">
            <div v-if="hasStats" class="text-center">
              <div class="bg-white text-black px-6 py-2 font-black text-xl skew-x-[-10deg] uppercase mb-2">
                {{ fight.method }}
              </div>
              <p class="text-gray-400 font-bold uppercase text-xs tracking-widest">Round {{ fight.rounds }}</p>
            </div>
            <div v-else class="text-center">
              <div class="text-7xl font-black text-gray-800 italic leading-none">VS</div>
              <p class="text-red-500 font-black mt-2 tracking-widest uppercase text-sm">Próximamente</p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative">
              <div :class="[
                'w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-4xl font-black border-4 transition-all duration-500',
                hasStats && fight.stats[1]?.isWinner ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-gray-700 bg-gray-800 text-gray-500'
              ]">
                {{ getInitials(fight.fighterB.firstName, fight.fighterB.lastName) }}
              </div>
              <div class="absolute -bottom-3 bg-gray-800 border border-gray-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                {{ fight.fighterB.nationality }}
              </div>
            </div>
            <h2 class="mt-6 text-2xl font-black uppercase leading-none text-center">
              {{ fight.fighterB.firstName }}
              <span class="block text-3xl">{{ fight.fighterB.lastName }}</span>
            </h2>
            <p class="text-gray-500 font-bold mt-2">{{ fight.fighterB.wins }}-{{ fight.fighterB.losses }}-{{ fight.fighterB.draws }}</p>
          </div>
        </div>
        <section v-if="hasStats" class="mt-10 bg-gray-900 rounded-3xl border border-gray-800 p-8">
          <h3 class="text-center font-black uppercase tracking-[0.2em] text-gray-500 mb-8 pb-4 border-b border-gray-800">Estadísticas Finales</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-bold text-gray-500 uppercase mb-2">Golpes Conectados</span>
               <div class="flex items-center gap-6 w-full">
                  <span class="text-2xl font-black">{{ fight.stats[0].strikesLanded }}</span>
                  <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div class="bg-red-600 h-full" :style="{ width: (fight.stats[0].strikesLanded / (fight.stats[0].strikesLanded + fight.stats[1].strikesLanded || 1) * 100) + '%' }"></div>
                    <div class="bg-blue-600 h-full flex-1"></div>
                  </div>
                  <span class="text-2xl font-black">{{ fight.stats[1].strikesLanded }}</span>
               </div>
            </div>
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-bold text-gray-500 uppercase mb-2">Takedowns</span>
               <div class="flex items-center gap-6 w-full">
                  <span class="text-2xl font-black">{{ fight.stats[0].takedownsLanded }}</span>
                  <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div class="bg-red-600 h-full" :style="{ width: (fight.stats[0].takedownsLanded / (fight.stats[0].takedownsLanded + fight.stats[1].takedownsLanded || 1) * 100) + '%' }"></div>
                    <div class="bg-blue-600 h-full flex-1"></div>
                  </div>
                  <span class="text-2xl font-black">{{ fight.stats[1].takedownsLanded }}</span>
               </div>
            </div>
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-bold text-gray-500 uppercase mb-2">Knockdowns</span>
               <div class="flex items-center gap-6 w-full">
                  <span class="text-2xl font-black">{{ fight.stats[0].knockdowns }}</span>
                  <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div class="bg-red-600 h-full" :style="{ width: (fight.stats[0].knockdowns / (fight.stats[0].knockdowns + fight.stats[1].knockdowns || 1) * 100) + '%' }"></div>
                    <div class="bg-blue-600 h-full flex-1"></div>
                  </div>
                  <span class="text-2xl font-black">{{ fight.stats[1].knockdowns }}</span>
               </div>
            </div>
          </div>
        </section>
        <section class="mt-8 bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h4 class="text-center text-xs font-black uppercase text-gray-600 mb-6 tracking-widest">Comparativa Física</h4>
          <div class="max-w-md mx-auto space-y-4">
            <div class="flex justify-between items-center border-b border-gray-800 pb-2">
              <span class="text-2xl font-black">{{ fight.fighterA.height }}cm</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase">Altura</span>
              <span class="text-2xl font-black">{{ fight.fighterB.height }}cm</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-800 pb-2">
              <span class="text-2xl font-black">{{ fight.fighterA.reach }}cm</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase">Alcance</span>
              <span class="text-2xl font-black">{{ fight.fighterB.reach }}cm</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-black">{{ fight.fighterA.age }}</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase">Edad</span>
              <span class="text-2xl font-black">{{ fight.fighterB.age }}</span>
            </div>
          </div>
        </section>
        <div class="mt-6 flex justify-center">
          <div class="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-700 bg-gray-900/50">
            <span :class="['w-2 h-2 rounded-full', fight.status === 'FINALIZADA' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse']"></span>
            <span class="text-[10px] font-black uppercase tracking-widest">{{ fight.status }}</span>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>