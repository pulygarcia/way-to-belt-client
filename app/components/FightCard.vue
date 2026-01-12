<script setup lang="ts">
    import Card from './ui/card/Card.vue';
    import CardContent from './ui/card/CardContent.vue';
    import CardHeader from './ui/card/CardHeader.vue';
    import type { Fight } from '~/utils/interfaces/fight';

    const props = defineProps<{
        fight: Fight,
        isMainEvent: boolean
    }>();
        
</script>

<template>
    <Card 
        class="group relative overflow-hidden transition-all duration-500 cursor-pointer border-white/5 bg-[#0a0a0a]"
        :class="[
            isMainEvent 
            ? 'ring-1 ring-yellow-500' 
            : 'hover:border-white/20'
        ]"
        @click="$router.push(`/fights/${fight.id}`)"
    >
        <div 
            v-if="isMainEvent" 
            class="absolute top-0 left-0 bg-yellow-600 text-white text-xs font-black px-6 py-1 italic uppercase z-10"
        >
            Evento principal
        </div>

        <CardHeader class="pb-2 pt-8">
            <div class="flex justify-center">
                <span class="text-xs font-black uppercase text-gray-400 border-b border-white/10 pb-1">
                    {{ fight.fighterA.weightClass }}
                </span>
            </div>
        </CardHeader>
        
        <CardContent class="pt-4 pb-8">
            <div class="grid grid-cols-12 items-center gap-2">
                
                <div class="col-span-5 flex flex-col items-end text-right">
                    <span class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                        {{ fight.fighterA.firstName }}
                    </span>
                    <h3 class="text-2xl md:text-4xl font-extrabold text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
                        {{ fight.fighterA.lastName }}
                    </h3>
                    
                    <div class="mt-2 flex items-center gap-2 text-sm font-mono text-gray-400">
                        <span>{{ fight.fighterA.wins }}</span>
                        <span>-</span>
                        <span>{{ fight.fighterA.losses }}</span>
                        <span>-</span>
                        <span>{{ fight.fighterA.draws }}</span>
                    </div>

                    <div v-if="fight.winner?.id === fight.fighterA.id" class="mt-4 bg-green-500 text-black px-2 py-0.5 text-[9px] font-black uppercase italic">
                        Winner
                    </div>
                </div>

                <div class="col-span-2 flex flex-col items-center justify-center relative">
                    <div v-if="fight.status === 'FINALIZADA'" class="flex flex-col items-center opacity-20">
                        <div class="h-12 w-[1px] bg-gradient-to-b from-white to-transparent"></div>
                    </div>
                    <div v-else class="relative h-full flex items-center justify-center">
                        <span class="text-3xl md:text-5xl font-black italic text-red-600/80 tracking-tighter skew-x-[-10deg]">VS</span>
                    </div>
                </div>

                <div class="col-span-5 flex flex-col items-start text-left">
                    <span class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                        {{ fight.fighterB.firstName }}
                    </span>
                    <h3 class="text-2xl md:text-4xl font-extrabold text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
                        {{ fight.fighterB.lastName }}
                    </h3>

                    <div class="mt-2 flex items-center gap-2 text-sm font-mono text-gray-400">
                        <span>{{ fight.fighterB.wins }}</span>
                        <span>-</span>
                        <span>{{ fight.fighterB.losses }}</span>
                        <span>-</span>
                        <span>{{ fight.fighterB.draws }}</span>
                    </div>

                    <div v-if="fight.winner?.id === fight.fighterB.id" class="mt-4 bg-green-500 text-black px-2 py-0.5 text-[9px] font-black uppercase italic">
                        Winner
                    </div>
                </div>
            </div>

            <div v-if="fight.status === 'FINALIZADA'" class="mt-8 flex justify-center gap-4 border-t border-white/5 pt-4">
                <div class="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-sm">
                    <span class="text-[9px] text-white/40 font-bold uppercase">Method:</span>
                    <span class="text-[10px] text-white font-black uppercase italic">{{ fight.method || 'Decision' }}</span>
                </div>
            </div>
        </CardContent>

        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </Card>
</template>