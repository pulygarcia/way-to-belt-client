<script setup lang="ts">
    import Card from './ui/card/Card.vue';
    import CardContent from './ui/card/CardContent.vue';
    import CardHeader from './ui/card/CardHeader.vue';
    import type { Fight } from '~/utils/interfaces/fight';

    const props = defineProps<{
        fight: Fight,
        fights: Fight[]
    }>();

    const isMainEvent = computed(() => {
        return props.fights?.[0]?.id === props.fight.id;
    });
        
</script>

<template>
    <Card>
        <article
            class="shadow-md p-4 hover:shadow-xl transition-shadow hover:cursor-pointer"
            :class="isMainEvent ? 'border border-yellow-600': ''"
            @click="$router.push(`/fights/${fight.id}`)"
        >
            <CardHeader class="p-0">
                <div v-if="isMainEvent" class="text-center bg-yellow-600 text-white font-black py-1 mb-2 -m-4">
                    PELEA ESTELAR
                </div>
                <h2 class="text-center text-gray-500 uppercase font-bold">Combate {{ fight.fighterA.weightClass }}</h2>
            </CardHeader>
        
            <CardContent class="p-0">
                <div class="flex justify-between mt-10">
                    <div class="flex flex-col items-start space-y-1 w-80">
                        <div class="flex gap-4 items-center mb-2">
                            <h3 class="text-3xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">
                                {{ fight.fighterA.firstName }} {{ fight.fighterA.lastName }}
                            </h3>
                            <span class="text-base font-medium text-gray-500">
                                ({{ fight.fighterA.wins }}/{{ fight.fighterA.losses }})
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span v-if="fight.fighterA.nickname" class="text-lg italic text-gray-600">
                                "{{ fight.fighterA.nickname }}"
                            </span>
                            <span v-if="fight.fighterA.nickname && fight.fighterA.nationality" class="text-gray-300">|</span>
                            <div v-if="fight.fighterA.nationality" class="flex items-center text-sm font-semibold uppercase bg-red-50 px-3 py-1 rounded-full shadow-sm">
                                <span class="mr-1">🌎</span>
                                {{ fight.fighterA.nationality }}
                            </div>
                        </div>
                        <div
                            v-if="fight.result == fight.fighterA.firstName + ' ' + fight.fighterA.lastName"
                        >
                            <p class="flex items-center text-sm font-bold uppercase text-green-700 mt-2">
                                GANADOR
                                <span class="text-gray-500 ms-2 text-xs capitalize">( {{ fight.method }} - round {{ fight.rounds }} )</span>
                            </p>
                        </div>
                    </div>
                    <div v-if="fight.result">
                        <p class="text-xs font-bold uppercase text-green-700">
                            FINALIZADO
                        </p>
                    </div>
                    <p v-else class="uppercase font-bold text-3xl text-red-700">
                        VS
                    </p>
                    <div class="flex flex-col items-end space-y-1 w-80">
                        <div class="flex gap-4 items-center mb-2">
                            <h3 class="text-3xl font-extrabold uppercase tracking-tight text-gray-900 leading-none text-right">
                                {{ fight.fighterB.firstName }} {{ fight.fighterB.lastName }}
                            </h3>
                            <span class="text-base font-medium text-gray-500">
                                ({{ fight.fighterB.wins }}/{{ fight.fighterB.losses }})
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span v-if="fight.fighterB.nickname" class="text-lg italic text-gray-600">
                                "{{ fight.fighterB.nickname }}"
                            </span>
                            <span v-if="fight.fighterB.nickname && fight.fighterB.nationality" class="text-gray-300">|</span>
                            <div v-if="fight.fighterB.nationality" class="flex items-center text-sm font-semibold uppercase bg-red-50 px-3 py-1 rounded-full shadow-sm">
                                <span class="mr-1">🌎</span>
                                {{ fight.fighterB.nationality }}
                            </div>
                        </div>
                        <div
                            v-if="fight.result == fight.fighterB.firstName + ' ' + fight.fighterB.lastName"
                        >
                            <p class="flex items-center text-sm font-bold uppercase text-green-700 mt-2">
                                GANADOR
                                <span class="text-gray-500 ms-2 text-xs capitalize">( {{ fight.method }} - round {{ fight.rounds }} )</span>
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </article>
    </Card>
</template>