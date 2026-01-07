import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FightEvent } from '~/utils/interfaces/event'

export const useEventsStore = defineStore('events', () => {
  const config = useRuntimeConfig()

  const events = ref<FightEvent[]>([])
  const filter = ref<'upcoming' | 'past'>('upcoming')
  const loading = ref(false)
  const error = ref(null)

  const fetchEvents = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.apiBase}/events`)
      if (!res.ok) throw new Error('Error al cargar los eventos')
        
      const data = await res.json()
      events.value = data

      return data

    } catch (err:any) {
      error.value = err
      throw err

    } finally {
      loading.value = false
    }
  }

  const filteredEvents = computed(() => {
    const now = new Date()
    if (filter.value === 'upcoming') {
      return events.value.filter(event => new Date(event.date) > now)
    } else {
      return events.value.filter(event => new Date(event.date) <= now)
    }
  })

  const eventsLength = computed(() => {
    return filteredEvents.value.length;
  })

  const setFilter = (type: 'upcoming' | 'past') => {
    filter.value = type
  }

    return { 
        events, 
        eventsLength,
        fetchEvents, 
        filter, 
        setFilter, 
        filteredEvents,
        loading,
        error 
    }
})
