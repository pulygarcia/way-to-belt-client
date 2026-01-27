<script setup lang="ts">
  import { useFightersStore } from '~/stores/fighters'
  import { storeToRefs } from 'pinia';
import { toast } from 'vue-sonner';
import AlertDialog from '~/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogContent from '~/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogHeader from '~/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '~/components/ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from '~/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '~/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogCancel from '~/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from '~/components/ui/alert-dialog/AlertDialogAction.vue';

  definePageMeta({
    layout: 'admin',
  })

  const fightersStore = useFightersStore();

  onMounted(async () => {
    await fightersStore.fetchFighters();
  })

  //refs
  const {fighters, loading} = storeToRefs(fightersStore);
  const query = ref('');
  const openDeleteDialog = ref(false);
  const fighterToDeleteId = ref<number | null>(null);

  const filteredFighters = computed(() => {
    if (!query.value) {
      return fighters.value;
    }
    return fighters.value.filter(fighter => {
      const fullName = `${fighter.firstName} ${fighter.lastName}`.toLowerCase();
      return fullName.includes(query.value.toLowerCase());
    });
  });

  const askDelete = (id: number) => {
    fighterToDeleteId.value = id;
    openDeleteDialog.value = true;
  };    

  const handleDelete = async (id: number) => {
    if(!fighterToDeleteId.value) return;

    try {
      await fightersStore.removeFighter(id);
      
      toast.success(`El peleador ha sido eliminado exitosamente`);
    } catch (error) {
      toast.error("Hubo un error al eliminar");
      console.error(error);
    }
  };
</script>
<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-extrabold italic uppercase tracking-tighter text-gray-900">
          Gestión de Peleadores
        </h2>
        <p class="text-gray-500 font-semibold uppercase text-xs tracking-widest mt-1">
          Roster oficial de la liga WTB
        </p>
      </div>
      
      <NuxtLink
        to="/admin/fighters/new" 
        class="bg-blue-600 text-white px-8 py-3 font-black uppercase italic tracking-widest skew-x-[-10deg] hover:bg-blue-700 transition"
      >
        + Registrar Peleador
      </NuxtLink>
    </div>
    
    <!--Searcher-->
    <div
      class="flex items-center border w-80 focus-within:border-indigo-500 transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden"
    >
      <input
        type="text"
        placeholder="Buscar peleador..."
        class="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        v-model="query"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="22"
        height="22"
        viewBox="0 0 30 30"
        fill="#6B7280"
      >
        <path
          d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
        ></path>
      </svg>
    </div>

    <div class="bg-white max-h-screen overflow-y-auto border-t-4 border-gray-900">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <th class="px-6 py-4">Peleador</th>
            <th class="px-6 py-4">Categoría</th>
            <th class="px-6 py-4 text-center">Récord (W-L-D)</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td colspan="4">
              <Loader />
            </td>
          </tr>
        </tbody>

        <tbody v-else class="divide-y divide-gray-100">
          <tr v-for="f in filteredFighters" :key="f.id" class="hover:bg-gray-50 transition-colors group">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-black italic text-xs overflow-hidden">
                  <span class="group-hover:scale-125 transition-transform">{{ getInitials(f.firstName, f.lastName) }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-black uppercase italic text-gray-900">{{ f.firstName }} {{ f.lastName }}</span>
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{{ f.nickname }}</span>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <span class="text-xs font-black uppercase text-gray-600 bg-gray-100 px-2 py-1">{{ f.weightClass }}</span>
            </td>

            <td class="px-6 py-4 text-center">
              <span class="font-mono font-bold text-gray-900">{{ f.wins }} - {{ f.losses }} - {{ f.draws }}</span>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2">
                <NuxtLink :to="`/admin/fighters/edit/${f.id}`" class="p-2 hover:bg-blue-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </NuxtLink>

                <button @click="askDelete(f.id)" class="p-2 hover:bg-red-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>

    <AlertDialog v-model:open="openDeleteDialog">
        <AlertDialogContent class="bg-white">
            <AlertDialogHeader>
                <AlertDialogTitle>
                    ¿Eliminar peleador?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    El peleador será eliminado
                    permanentemente.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancelar
                </AlertDialogCancel>

                <AlertDialogAction
                    class="bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white"
                    @click="handleDelete(fighterToDeleteId!)"
                >
                    Eliminar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

</template>
