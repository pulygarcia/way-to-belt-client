<script setup>
  import 'vue-sonner/style.css'
  import { Toaster } from '@/components/ui/sonner'
  import { useAuthsStore } from '~/stores/auth';
  import { ref } from 'vue';
  import AlertDialog from '~/components/ui/alert-dialog/AlertDialog.vue';
  import AlertDialogContent from '~/components/ui/alert-dialog/AlertDialogContent.vue';
  import AlertDialogHeader from '~/components/ui/alert-dialog/AlertDialogHeader.vue';
  import AlertDialogTitle from '~/components/ui/alert-dialog/AlertDialogTitle.vue';
  import AlertDialogDescription from '~/components/ui/alert-dialog/AlertDialogDescription.vue';
  import AlertDialogFooter from '~/components/ui/alert-dialog/AlertDialogFooter.vue';
  import AlertDialogCancel from '~/components/ui/alert-dialog/AlertDialogCancel.vue';
  import AlertDialogAction from '~/components/ui/alert-dialog/AlertDialogAction.vue';

  const authsStore = useAuthsStore();

  const openCloseSession = ref(false);

  await useAsyncData('getCurrentUser', async () => {
    authsStore.getCurrentUser();
    return true;
  });

  const closeSession = () => {
    authsStore.closeSession();
    openCloseSession.value = false;
  }
</script>

<template>
  <Toaster richColors position="top-center" />
  <div class="flex h-screen w-full">
    <aside class="w-64 bg-gray-900 flex flex-col shrink-0 px-4 py-8">
        <div class="bg-red-500 h-10 flex items-center justify-center px-2 skew-x-[-10deg] ">
            <span class="text-white font-black text-xl tracking-widest italic">
                WTB ADMIN
            </span>
        </div>

      <nav class="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
        <NuxtLink 
            to="/admin" 
            active-class="bg-gray-800"
            class="flex items-center px-4 py-3 skew-x-[-10deg] font-bold transition-all text-gray-400 hover:bg-gray-800 hover:text-white group"
        >
            <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink 
            to="/admin/fighters" 
            active-class="bg-gray-800"
            class="flex items-center px-4 py-3 skew-x-[-10deg] font-bold transition-all text-gray-400 hover:bg-gray-800 hover:text-white group"
        >
            <span>Peleadores</span>
        </NuxtLink>

        <NuxtLink 
            to="/admin/events" 
            active-class="bg-gray-800"
            class="flex items-center px-4 py-3 skew-x-[-10deg] font-bold transition-all text-gray-400 hover:bg-gray-800 hover:text-white group"
        >
            <span>Eventos</span>
        </NuxtLink>
    </nav>

      <div class="p-4 border-t border-gray-800">
      <button @click="openCloseSession = true" class="w-full bg-gray-800 text-red-400 py-2 rounded font-medium hover:bg-red-900 hover:text-white transition">
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <div class="flex flex-col flex-1">
      
      <header class="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-8 pt-8 shadow-sm">
        <h1 class="font-extrabold text-xl uppercase tracking-tight text-gray-800">Panel de Control</h1>
        
        <span class="text-lg font-medium text-gray-600">{{ authsStore.user?.email }}</span>
      </header>

      <main class="p-8 flex-1 overflow-auto">
        <slot></slot>
      </main>

    </div>
  </div>

  <AlertDialog v-model:open="openCloseSession">
      <AlertDialogContent class="bg-white">
          <AlertDialogHeader>
              <AlertDialogTitle>
                  ¿Cerrar sesión?
              </AlertDialogTitle>
              <AlertDialogDescription>
                  Deberás iniciar sesión nuevamente para acceder al panel de administración.
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
              <AlertDialogCancel>
                  Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                  class="bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white"
                  @click="closeSession()"
              >
                  Cerrar sesión
              </AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
  </AlertDialog>
</template>