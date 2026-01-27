import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Fighter } from '~/utils/interfaces/fighter'
import { useAuthsStore } from './auth'
import { type FighterFormData } from '~/utils/schemas/fighters'

export const useFightersStore = defineStore('fighters', () => {
  const config = useRuntimeConfig()
  const authStore = useAuthsStore()

  const fighters = ref<Fighter[]>([])
  const latestFighters = ref<Fighter[]>([])
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

  const fetchFighterById = async (id: number) => {
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

  const fetchLatestFighters = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters/latest`)
      if (!res.ok) throw new Error('Error al cargar los últimos peleadores')

      latestFighters.value = await res.json()   

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const registerFighter = async (fighterData:any) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify(fighterData),
      })
      if (!res.ok) throw new Error('Error al registrar el peleador')

      return 'Peleador registrado con éxito'

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const removeFighter = async (fighterId:number) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters/${fighterId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${authStore.token}`
        }
      })
      if (!res.ok) throw new Error('Error al eliminar el peleador')

      fighters.value = fighters.value.filter(f => f.id !== fighterId) //refresh visually

      return 'Peleador eliminado con éxito'

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const updateFighter = async (id: number, fighterData: FighterFormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fighters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify(fighterData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Error al actualizar el peleador')
      }

      const updatedFighter = await res.json()

      //refresh visually
      const index = fighters.value.findIndex(f => f.id === id)
      if (index !== -1) {
        fighters.value[index] = updatedFighter
      }
      
      if (fighter.value && fighter.value.id === id) {
        fighter.value = updatedFighter
      }

      return updatedFighter

    } catch (err: any) {
      error.value = err.message

      throw err

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

  const fightersLength = computed(() => fighters.value.length);

    return { 
        fetchFighters,
        fetchLatestFighters,
        fetchFighterById,
        fighterFightsHistory,
        registerFighter,
        removeFighter,
        updateFighter,
        fighters,
        latestFighters, 
        fightersLength,
        fightersByWeight,
        fighter,
        loading,
        error 
    }
})
