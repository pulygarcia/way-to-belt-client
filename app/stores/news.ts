import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {  NewsResponse } from '~/utils/interfaces/news'

export const useNewsStore = defineStore('news', () => {
  const config = useRuntimeConfig()

  const news = ref<NewsResponse>()
  const loading = ref(false)
  const error = ref(null)

  const fetchNews = async () => {
    //recent news from the last week (7 days)
    const date = new Date()
    date.setDate(date.getDate() - 7)
    const fromDate = date.toISOString().split('T')[0]; //YYYY-MM-DD

    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${config.public.newsApiBase}/everything?q=(ufc%20OR%20MMA%20OR%20octagono%20OR%20jiujitsu%20OR%20UFC%20OR%20"Artes%20Marciales%20Mixtas")&language=es&pageSize=10&from=${fromDate}&sortBy=publishedAt&apiKey=${config.public.newsApiKey}`)
      if (!res.ok) throw new Error('Error al cargar las noticias')

      const data = await res.json()
      news.value = data

      return data

    } catch (err:any) {
      error.value = err
      throw err

    } finally {
      loading.value = false
    }
  }

    return { 
        fetchNews,
        news,
        loading,
        error 
    }
})
