<script setup>

</script>
<template>
    <Header />
    <section class="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800 via-gray-800 to-black flex items-center justify-center p-4">


        <main class="flex-1">
            <slot></slot>
        </main>

    </section>
    
    <footer class="bg-white border-t mt-auto py-4 px-6 text-center text-gray-500">
        &copy; {{ new Date().getFullYear() }} Way to Belt Fighting.
    </footer>
</template>


