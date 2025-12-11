<script setup>

</script>
<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">

    <Header />

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-white border-t mt-auto py-4 px-6 text-center text-gray-500">
      &copy; 2025 Way to Belt Fighting.
    </footer>
  </div>
</template>


