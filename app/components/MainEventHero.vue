<script setup>
    import Button from '~/components/ui/button/Button.vue';
    import { useRouter } from 'vue-router';
    import Badge from './ui/badge/Badge.vue';

    const router = useRouter();

    const props = defineProps({
        event: Object,
    });
</script>

<template>
  <div class="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center">
    
    <div class="absolute -left-20 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <h2 class="text-[25vw] font-black text-white/[0.04] uppercase italic tracking-tighter">
        {{ props.event.name.split(' ')[0] }}
      </h2>
    </div>

    <div class="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-12 items-center gap-8">
      
      <div class="col-span-12 lg:col-span-7">
        <div class="flex flex-col items-start">
          
          <Badge class="bg-blue-600 text-white text-[10px] font-black px-3 py-1 mb-6 tracking-[0.3em] uppercase">
            Transmisión en vivo
          </Badge>

          <h1 class="text-7xl md:text-[120px] font-[1000] text-white leading-[0.85] uppercase italic tracking-tighter mb-8">
            {{ props.event.name.replace(':', '') }}
          </h1>

          <div v-if="props.event.fights?.length" class="flex items-center gap-6 group">
            <div class="flex flex-col">
              <span class="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2">evento principal</span>
              <div class="flex items-baseline gap-4">
                <span class="text-white text-4xl md:text-6xl font-black uppercase italic">{{ props.event.fights[0].fighterA.lastName }}</span>
                <span class="text-red-500 text-2xl font-semibold">vs</span>
                <span class="text-white text-4xl md:text-6xl font-black uppercase italic">{{ props.event.fights[0].fighterB.lastName }}</span>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <Button 
              @click="router.push(`/events/${props.event.id}`)"
              class="bg-white rounded-none hover:bg-blue-600 text-black hover:text-white px-10 py-6 text-sm font-black uppercase tracking-widest transition-all"
            >
              Cartelera
            </Button>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-5 flex justify-end">
        <div class="bg-white/[0.05] border border-white/10 p-1 w-full max-w-[320px]">
          <div class="border border-white/5 p-8 flex flex-col gap-10">
            
            <div class="relative">
              <span class="absolute -left-4 top-0 w-[2px] h-full bg-blue-600"></span>
              <p class="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-2">Calendario</p>
              <p class="text-white text-2xl font-bold uppercase italic leading-none">
                {{ formatDate(props.event.date) }}
              </p>
            </div>

            <div class="relative">
              <span class="absolute -left-4 top-0 w-[2px] h-full bg-white/20"></span>
              <p class="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Ubicación</p>
              <p class="text-white text-xl font-medium uppercase italic leading-tight">
                {{ props.event.location}}
              </p>
            </div>

            <div class="pt-6 border-t border-white/5">
              <div class="flex justify-between items-center text-xs font-mono text-white/30">
                <span>ESTADO:</span>
                <span class="text-green-500 animate-pulse font-black uppercase">● Confirmado</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
  </div>
</template>