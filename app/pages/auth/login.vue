<script setup lang="ts">
  import { createZodPlugin } from '@formkit/zod';
import * as z from 'zod'
  import { useAuthsStore } from '~/stores/auth'
  import { inputClasses } from '~/utils'

  definePageMeta({
    title: 'Iniciar sesión - Way to Belt Fighting',
    layout: 'auth'
  })

  const authStore = useAuthsStore();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30)
  })

  const [zodPlugin, submitHandler] = createZodPlugin(
    loginSchema,
    async (formData) => {
      await authStore.loginAccount(formData)
    }
  )
</script>

<template>
    <div class="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-black uppercase italic text-white tracking-tighter">
          Login
        </h1>
      </div>

      <FormKit
        type="form"
        :plugins="[zodPlugin]"
        :actions="false"
        :validation-schema="loginSchema"
        @submit="submitHandler"
      >
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
          Iniciar Sesión
        </button>
      </FormKit>

      <p class="mt-6 text-center text-zinc-500 text-xs capitalize font-bold">
        <NuxtLink to="/auth/register" class="text-white">¿No tienes una cuenta? <span class="ms-1 text-blue-400 hover:underline">Registrarse</span></NuxtLink>
      </p>
    </div>
</template>