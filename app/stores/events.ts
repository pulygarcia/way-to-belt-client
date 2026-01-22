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

  const nextUpcomingEvent = computed(() => {
      const allEvents = events.value || [];

      const upcomingEvents = allEvents.filter(event => {
          const eventDate = new Date(event.date);
          const now = new Date();
          return eventDate >= now;
      });

      upcomingEvents.sort((a, b) => +a.date - +b.date);
      return upcomingEvents[0];
  });

  const upcomingEventsLength = computed(() => {
    const now = new Date()
    return events.value.filter(event => new Date(event.date) > now).length
  })

  const pastEventsLength = computed(() => {
    const now = new Date()
    return events.value.filter(event => new Date(event.date) < now).length
  })

    return { 
        events, 
        eventsLength,
        nextUpcomingEvent,
        fetchEvents, 
        filter, 
        setFilter, 
        filteredEvents,
        upcomingEventsLength,
        pastEventsLength,
        loading,
        error 
    }
})
