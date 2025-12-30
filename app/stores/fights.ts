import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Fight } from '~/utils/interfaces/fight'

export const useFightsStore = defineStore('fights', () => {
  const config = useRuntimeConfig()

  const fights = ref<Fight[]>([])
  const fight = ref<Fight>({} as Fight)
  const loading = ref(false)
  const error = ref(null)

  const fetchFights = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fights`)
      if (!res.ok) throw new Error('Error al cargar los combates')

      fights.value = await res.json()

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

  const fetchFightById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/fights/${id}`)
      if (!res.ok) throw new Error('Error al cargar el combate')

      fight.value = await res.json()   

    } catch (err:any) {
      error.value = err

    } finally {
      loading.value = false
    }
  }

    return { 
        fetchFights,
        fetchFightById,
        fights, 
        fight,
        loading,
        error 
    }
})
