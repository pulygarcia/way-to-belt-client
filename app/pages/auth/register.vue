<script setup lang="ts">
  import { createZodPlugin } from '@formkit/zod';
  import * as z from 'zod'
  import { useAuthsStore } from '~/stores/auth'
  import { inputClasses } from '~/utils'

  definePageMeta({
    title: 'Registro - Way to Belt Fighting',
    layout: 'auth'
  })

  const authStore = useAuthsStore();

  const registerSchema = z.object({
    name: z.string().min(1).max(30).nonempty(),
    email: z.string().min(1).email().nonempty(),
    password: z.string().min(6).max(30).nonempty(),
  })

  const [zodPlugin, submitHandler] = createZodPlugin(
    registerSchema,
    async (formData) => {
      await authStore.registerAccount(formData)
    }
  )
</script>

<template>
    <div v-if="authStore.loading" class="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader />
    </div>

    <div v-else class="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-black uppercase italic text-white tracking-tighter">
          Registrate en <span class="text-blue-500">Wtb</span>
        </h1>
      </div>

      <FormKit
        type="form"
        :plugins="[zodPlugin]"
        :actions="false"
        :incomplete-message="false"
        @submit="submitHandler"
      >
        <FormKit
          type="text"
          name="name"
          label="Nombre"
          placeholder="Ej: Anderson Silva"
          :classes="inputClasses"
          validation="required|length:1,30"
          :validation-messages="{
            required: 'El nombre es obligatorio',
            length: 'El nombre debe tener entre 1 y 30 caracteres'
          }"
        />
        <FormKit
          type="email"
          name="email"
          label="Correo Electrónico"
          placeholder="correo@ejemplo.com"
          :classes="inputClasses"
          validation="required|email"
          :validation-messages="{
            required: 'El email es obligatorio',
            email: 'Email no válido'
          }"
        />
        <FormKit
          type="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          :classes="inputClasses"
          validation="required|length:6,30"
          :validation-messages="{
            required: 'La contraseña es obligatoria',
            length: 'La contraseña debe tener entre 6 y 30 caracteres'
          }"
        />

        <button 
          type="submit"
          class="w-full bg-blue-700 p-4 font-black uppercase italic text-white mt-4 hover:bg-blue-600 transition-all active:scale-95"
        >
          Crear cuenta
        </button>
      </FormKit>

      <p class="mt-6 text-center text-zinc-500 text-xs capitalize font-bold">
        <NuxtLink to="/auth/login" class="text-white">¿Ya tienes cuenta? <span class="ms-1 text-blue-400 hover:underline">Iniciar Sesión</span></NuxtLink>
      </p>
    </div>
</template>