<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: { BaseButton, BaseInput, BaseInput, BaseLabel },
    emits: ['login'],
    data() {
        return {
            loginLoading: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        doLogin() {
            this.loginLoading = true,
                login({
                    ...this.form
                })
                    .then(user => {
                        // this.$emit('login', { ...user });
                        this.$router.push('/');
                    })
                    .finally(() => {
                        this.loginLoading = false
                    })
        }
    }
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md">
            <!-- Logo & Header -->
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Bienvenido de vuelta</h1>
                <p class="text-gray-600">Ingresa a tu cuenta de VitaHost</p>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <form class="space-y-6" action="#" @submit.prevent="doLogin">
                    <div>
                        <BaseLabel for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                            Correo Electrónico
                        </BaseLabel>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <BaseInput
                                placeholder="tu@email.com"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                                type="email"
                                id="email"
                                v-model="form.email"
                                :disabled="loginLoading"
                                required />
                        </div>
                    </div>

                    <div>
                        <BaseLabel for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
                        </BaseLabel>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <BaseInput
                                placeholder="••••••••"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                                type="password"
                                id="password"
                                v-model="form.password"
                                :disabled="loginLoading"
                                required />
                        </div>
                    </div>

                    <BaseButton
                        class="w-full py-4 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                        :loading="loginLoading">
                        Iniciar Sesión
                    </BaseButton>
                </form>
            </div>

            <!-- Register Link -->
            <div class="mt-6 text-center">
                <p class="text-gray-600">
                    ¿No tienes cuenta?
                    <router-link to="/registro" class="text-slate-700 hover:text-slate-900 font-semibold hover:underline ml-1">
                        Regístrate gratis
                    </router-link>
                </p>
            </div>

            <!-- Back to Home -->
            <div class="mt-4 text-center">
                <router-link to="/" class="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver al inicio
                </router-link>
            </div>
        </div>
    </div>
</template>