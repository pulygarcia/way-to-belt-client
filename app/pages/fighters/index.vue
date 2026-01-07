<script setup lang="ts">
  import { useFightersStore } from '~/stores/fighters'
  import { storeToRefs } from 'pinia';

  const fightersStore = useFightersStore();

  onMounted(async () => {
    await fightersStore.fetchFighters();
  })

  const {fightersByWeight, loading} = storeToRefs(fightersStore); //storeToRefs allows us to keep reactivity when extracting properties from the pinia store

</script>

<template>
  <section class="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-gray-700 to-black py-12 px-4">
    <Container>
      <Loader v-if="loading" />

      <div v-else-if="fightersByWeight" class="grid grid-cols-3 gap-8 items-start animate-fade-up animate-duration-500">
        <!--(value, key) in object -->
        <div v-for="(fighters, weightClass) in fightersByWeight" class="bg-black/30 backdrop-blur-md border border-white/10 rounded-sm shadow-2xl overflow-hidden">
          <div class="bg-white/10 p-3 border-b border-white/10">
            <h2 class="text-white text-[10px] font-black uppercase tracking-[0.2em]">{{ weightClass }}</h2>
          </div>

          <div class="p-6 border-b border-white/20 bg-gradient-to-br from-blue-600/20 to-transparent">
            <p class="text-[10px] text-blue-400 font-black uppercase mb-1">Top Rank</p>
            <h3 class="text-white text-3xl font-black uppercase italic leading-none tracking-tighter">
                {{ fighters[0]?.firstName }}. {{ fighters[0]?.lastName }}
            </h3>
          </div>
          <!--(value, index) in array -->
          <div v-for="(fighter, index) in fighters" class="flex flex-col">
            <NuxtLink :to="`/fighters/${fighter.id}`" class="w-full">
                <div class="flex items-center p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <span class="text-blue-500 font-black w-8 text-lg italic">{{ +index + 1 }}</span>
                  <span class="text-gray-200 font-bold uppercase text-sm">{{ fighter.firstName }} {{ fighter.lastName }}</span>
                </div>
            </NuxtLink>
          </div>
        </div>

      </div>
    </Container>
  </section>
</template>