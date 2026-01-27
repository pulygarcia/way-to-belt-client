<script setup lang="ts">
    definePageMeta({
        layout: 'admin',
    })

    import { createZodPlugin } from '@formkit/zod';
    import { toast } from 'vue-sonner';
    import { reset } from '@formkit/core'
    import { useFightersStore } from '~/stores/fighters';
    import { inputClasses } from '~/utils'
    import { fighterSchema } from '~/utils/schemas/fighters';

    const fightersStore = useFightersStore();

    const {loading, fighter} = storeToRefs(fightersStore);

    const [zodPlugin, submitHandler] = createZodPlugin(
        fighterSchema,
        async (formData) => {
            await fightersStore.registerFighter(formData);
            toast.success('Peleador registrado con éxito');
            reset('formRef');
        }
    )
</script>

<template>
    <Loader v-if="loading" />

    <div v-else class="w-full max-w-md mx-auto bg-gray-900 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-black uppercase italic text-white tracking-tighter">
            Registrar Peleador
        </h1>
      </div>

      <div class="overflow-y-scroll max-h-[700px] px-2">
          <FormKit
            type="form"
            id="formRef"
            :plugins="[zodPlugin]"
            :actions="false"
            :incomplete-message="false"
            @submit="submitHandler"
            >
                <FormKit
                    type="text"
                    name="firstName"
                    label="Nombre"
                    :value="fighter.firstName"
                    placeholder="Ej: Anderson"
                    validation="required|length:1,30"
                    :validation-messages="{
                        required: 'El nombre es obligatorio',
                        length: 'El nombre debe tener entre 1 y 30 caracteres',
                    }"
                    :classes="inputClasses"
                />

                <FormKit
                    type="text"
                    name="lastName"
                    label="Apellido"
                    placeholder="Ej: Silva"
                    validation="required|length:1,30"
                    :validation-messages="{
                        required: 'El apellido es obligatorio',
                        length: 'El apellido debe tener entre 1 y 30 caracteres',
                    }"
                    :classes="inputClasses"
                />

                <FormKit
                    type="text"
                    name="nickname"
                    label="Apodo"
                    placeholder="Ej: The Spider"
                    validation="required|length:1,30"
                    :validation-messages="{
                        required: 'El apodo es obligatorio',
                        length: 'El apodo debe tener entre 1 y 30 caracteres',
                    }"
                    :classes="inputClasses"
                />

                <FormKit
                    type="text"
                    name="nationality"
                    label="Nacionalidad"
                    placeholder="Ej: Brasil"
                    validation="required|length:1,30"
                    :validation-messages="{
                        required: 'La nacionalidad es obligatoria',
                        length: 'Máximo 30 caracteres',
                    }"
                    :classes="inputClasses"
                />
          
                <FormKit
                    type="select"
                    name="weightClass"
                    label="Categoría de peso"
                    :options="['Peso Mosca', 'Peso Gallo', 'Peso Pluma', 'Peso Ligero', 'Peso Wélter', 'Peso Mediano', 'Peso Semipesado', 'Peso Pesado']"
                    placeholder="Seleccionar categoría"
                    :classes="inputClasses"
                    validation="required"
                    :validation-messages="{
                        required: 'Debes seleccionar una categoría de peso',
                    }"
                />
            
                <div class="grid grid-cols-2 gap-4">
                    <FormKit
                    type="number"
                    name="height"
                    label="Altura (cm)"
                    :classes="inputClasses"
                    validation="required|number|min:140|max:220"
                    :validation-messages="{
                        required: 'La altura es obligatoria',
                        number: 'Debe ser un número',
                        min: 'Mínimo 140 cm',
                        max: 'Máximo 220 cm',
                    }"
                    />
                    <FormKit
                    type="number"
                    name="reach"
                    label="Alcance (cm)"
                    :classes="inputClasses"validation="required|number|min:140|max:240"
                    :validation-messages="{
                        required: 'El alcance es obligatorio',
                        number: 'Debe ser un número',
                        min: 'Mínimo 140 cm',
                        max: 'Máximo 230 cm',
                    }"
                    />
                </div>
                <FormKit
                    type="number"
                    name="age"
                    label="Edad"
                    :classes="inputClasses"
                    validation="required|number|min:18|max:50"
                    :validation-messages="{
                        required: 'La edad es obligatoria',
                        number: 'Debe ser un número válido',
                        min: 'Debe ser mayor de 18 años',
                        max: 'Edad máxima permitida: 50',
                    }"
                />
                <div class="grid grid-cols-3 gap-4">
                    <FormKit
                        type="number"
                        name="wins"
                        label="Victorias"
                        :classes="inputClasses"
                        validation="required|number|min:0"

                        :validation-messages="{
                            required: 'Campo obligatorio',
                            number: 'Debe ser un número',
                            min: 'No puede ser negativo',
                        }"
                    />
                    <FormKit
                        type="number"
                        name="losses"
                        label="Derrotas"
                        :classes="inputClasses"
                        validation="required|number|min:0"

                        :validation-messages="{
                            required: 'Campo obligatorio',
                            number: 'Debe ser un número',
                            min: 'No puede ser negativo',
                        }"
                    />
                    <FormKit
                        type="number"
                        name="draws"
                        label="Empates"
                        :classes="inputClasses"
                        validation="required|number|min:0"
                        :validation-messages="{
                            required: 'Campo obligatorio',
                            number: 'Debe ser un número',
                            min: 'No puede ser negativo',
                        }"
                    />
                </div>
                <FormKit
                    type="number"
                    name="rankingPosition"
                    label="Posición en el ranking"
                    :classes="inputClasses"
                    validation="required|number|min:0"
                    :validation-messages="{
                        required: 'Campo obligatorio',
                        number: 'Debe ser un número',
                        min: 'No puede ser negativo',
                    }"
                />
                    <button
                        type="submit"
                        class="w-full bg-blue-700 p-4 font-black uppercase italic text-white mt-6 hover:bg-blue-600 transition-all active:scale-95"
                    >
                        Registrar
                    </button>

            </FormKit>
      </div>
    </div>
</template>