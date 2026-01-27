import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthsStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const router = useRouter();

    const token = useCookie('access_token')
    const user = ref(null)
    const usersLength = ref(0)
    const loading = ref(false)
    const error = ref(null)

    const registerAccount = async (data:any) => {
        loading.value = true
        error.value = null
        try {
            const {__init, ...dataWithoutInit} = data  // Remove _init property added by FormKit

            const response = await fetch(`${config.public.apiBase}/user`, {
                method: 'POST',
                body: JSON.stringify(dataWithoutInit),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.ok) {
                router.push('/auth/login')
            }

        } catch (err:any) {
            error.value = err
            throw err

        } finally {
            loading.value = false
        }
    }

    const loginAccount = async (data:any) => {
        loading.value = true
        error.value = null

        try {
            const {__init, ...dataWithoutInit} = data  // Remove _init property added by FormKit
            
            const response = await fetch(`${config.public.apiBase}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(dataWithoutInit),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const access = await response.json();

            if (response.ok) {
                const jwtCookie = useCookie('access_token', { path: '/', maxAge: 60 * 60 * 24 * 90 }); // 90 days
                jwtCookie.value = access.access_token;
                router.push('/');

            } else {
                throw new Error(access.message || 'Error al iniciar sesión')
            }

        } catch (err:any) {
            error.value = err
            throw err

        } finally {
            loading.value = false
        }
    }

    const getRegisteredUsers = async () => {
        loading.value = true
        error.value = null

        try {
            
            const response = await fetch(`${config.public.apiBase}/user`)

            if (response.ok) {
                const data = await response.json();
                usersLength.value = data.length;

            } else {
                throw new Error('Error al obtener usuarios registrados')
            }

        } catch (err:any) {
            error.value = err
            throw err

        } finally {
            loading.value = false
        }
    }

    const getCurrentUser = async () => {
        if (token.value) {
            try {
                const response = await fetch(`${config.public.apiBase}/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })

                if (response.ok) {
                    const userData = await response.json();
                    user.value = userData;
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }

    const closeSession = () => {
        useCookie('access_token').value = null;
        router.push('/auth/login');
    }

    return { 
        registerAccount,
        loginAccount,
        user,
        getCurrentUser,
        closeSession,
        token,
        getRegisteredUsers,
        usersLength,
        loading,
        error 
    }
})
