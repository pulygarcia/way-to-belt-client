<template>
    <div class="bg-white shadow-md py-4 px-6">
        <header class="container mx-auto flex justify-between items-center">
            <NuxtLink to="/">
              <div class="inline-flex border border-black text-center p-1">
                  <span class="bg-black text-white px-4 py-2 border-r border-black">WTB</span>
                  <span class="bg-white text-black px-4 py-2">Fighting</span>
              </div>
            </NuxtLink>

          <nav class="space-x-4">
            <NuxtLink to="/fighters" class="text-gray-700 hover:text-red-400">Peleadores</NuxtLink>
            <NuxtLink to="/events" class="text-gray-700 hover:text-red-400">Eventos</NuxtLink>
          </nav>
        </header>
    </div>
</template>