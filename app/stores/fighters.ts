import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Fighter } from '~/utils/interfaces/fighter'

export const useFightersStore = defineStore('fighters', () => {
  const config = useRuntimeConfig()

  const fighters = ref<Fighter[]>([])
  const fighter = ref<Fighter>({} as Fighter)
  const loading = ref(false)
  const error = ref(null)

  const fetchFighters = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters`)
      if (!res.ok) throw new Error('Error al cargar los peleadores')

      const data = await res.json()
      fighters.value = data

      return data

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const fetchFighterById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters/${id}`)
      if (!res.ok) throw new Error('Error al cargar el combate')

      fighter.value = await res.json()   
      
      return fighter.value

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const fightersByWeight = computed(() => {
    const grouped: Record<string, Array<any>> = {}; //contains arrays of fighters keyed by weight class from for of loop below

    const sortedFighters = [...fighters.value].sort((a, b) => {
      const rankA = a.rankingPosition ?? 999;
      const rankB = b.rankingPosition ?? 999;

      return rankA - rankB;
    });

    for (const fighter of sortedFighters) {
      const weightClass = fighter.weightClass || 'Unknown';

      if (!grouped[weightClass]) {
        grouped[weightClass] = [];
      }

      grouped[weightClass].push(fighter);
    }

    return grouped;
  });

  const fighterFightsHistory = computed(() => {
    if (!fighter.value) return [];

    const currentFighterId = Number(fighter.value.id);

    const mapFight = (fight: any, opponent: any) => {
      //find the stats for the current fighter in this fight
      const currentFighterStats = fight.stats?.find(
        (stat: any) => Number(stat.fighter?.id) === currentFighterId
      );

      //extract isWinner from those stats
      //if no stats found, default to false
      const isWinner = currentFighterStats ? currentFighterStats.isWinner : false;

      return {
        ...fight,
        opponent,
        isWinner
      };
    };

    // Procesamos ambos lados
    const asA = (fighter.value.fightsAsA || []).map(f => mapFight(f, f.fighterB));
    const asB = (fighter.value.fightsAsB || []).map(f => mapFight(f, f.fighterA));

    return [...asA, ...asB].sort((a, b) => 
      new Date(b.event.date).getTime() - new Date(a.event.date).getTime()
    );
  });

    return { 
        fetchFighters,
        fetchFighterById,
        fighterFightsHistory,
        fighters, 
        fightersByWeight,
        fighter,
        loading,
        error 
    }
})
