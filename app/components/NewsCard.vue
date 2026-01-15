<script setup>
    defineProps({
      article: Object
    })
</script>

<template>
  <a 
    :href="article.url" 
    target="_blank" 
    class="group relative flex flex-col md:flex-row rounded-sm overflow-hidden transition-all duration-500"
  >
    <div class="relative w-full md:w-2/5 min-h-[250px] md:min-h-full overflow-hidden">
      <img 
        :src="article.urlToImage || '/placeholder-mma.jpg'" 
        :alt="article.title"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
      />
    </div>

    <article class="p-6 md:w-3/5 flex flex-col">
      <div class="flex items-center gap-4 mb-4">
        <span class="px-2 py-1 bg-blue-600 text-white text-sm font-bold uppercase tracking-tighter">
          {{ article?.source?.name || 'MMA News'}}
        </span>
        <span class="text-gray-800 text-xs font-medium uppercase tracking-widest">
          {{ formatDate(new Date(article.publishedAt)) }}
        </span>
      </div>
      
      <h3 class="text-xl md:text-2xl font-black text-gray-800 italic leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors">
        {{ article.title }}
      </h3>
      
      <p class="mt-4 text-gray-700 text-sm tracking-wide">
        {{ article.description }}
      </p>

      <div class="mt-auto pt-6 flex items-center justify-between">
        <span class="text-xs text-gray-700 group-hover:text-blue-600 font-bold uppercase tracking-[0.2em]">Ver más</span>
        <div class="h-px flex-1 mx-4 bg-zinc-800 group-hover:bg-blue-900/50 transition-all"></div>
        <div class="text-gray-100 group-hover:text-blue-500 transition-transform group-hover:translate-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
      </div>
    </article>
  </a>
</template>
