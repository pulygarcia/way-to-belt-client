<script setup lang="ts">
import ActiveUnderline from './ActiveUnderline.vue';

</script>

<template>
    <div class="bg-white shadow-md py-4 px-6">
        <header class="container mx-auto flex justify-between items-center">
            <NuxtLink to="/">
              <div class="inline-flex border border-black text-center p-1">
                  <span class="bg-black text-white px-4 py-2 border-r border-black">WTB</span>
                  <span class="bg-white text-black px-4 py-2">Fighting</span>
              </div>
            </NuxtLink>

          <nav class="space-x-8">
            <NuxtLink to="/fighters" class="group inline-block text-gray-700 hover:text-red-600">
              Rankings 
              <ActiveUnderline />
            </NuxtLink>
            <NuxtLink to="/events" class="group inline-block text-gray-700 hover:text-red-600">
              Eventos
              <ActiveUnderline />
            </NuxtLink>
            <NuxtLink to="/#news" class="group inline-block text-gray-700 hover:text-red-600">
              Contenido destacado
              <ActiveUnderline />
            </NuxtLink>
          </nav>
        </header>
    </div>
</template>