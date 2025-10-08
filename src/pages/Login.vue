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
    <div class="flex justify-center items-center min-h-[70vh] px-4">
        <div class="w-full max-w-md">
            <h1 class="mb-8 text-center font-bold text-4xl md:text-2xl text-gray-800">Iniciar sesión</h1>

            <form class="flex flex-col space-y-6" action="#" @submit.prevent="doLogin">
                <div>
                    <BaseLabel class="text-gray-700 font-semibold mb-2 block text-sm">E-mail</BaseLabel>
                    <BaseInput
                        placeholder="ejemplo@ejemplo.com"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="email"
                        id="email"
                        v-model="form.email"
                        :disabled="loginLoading"
                        required />
                </div>
                <div>
                    <BaseLabel class="text-gray-700 font-semibold mb-2 block text-sm">Contraseña</BaseLabel>
                    <BaseInput
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="password"
                        id="password"
                        v-model="form.password"
                        :disabled="loginLoading"
                        required />
                </div>
                <BaseButton class="mt-8 w-full py-3 text-lg font-semibold" :loading="loginLoading">Iniciar sesión</BaseButton>
            </form>

            <p class="mt-6 text-center text-gray-600">
                ¿No tienes cuenta?
                <router-link to="/registro" class="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Regístrate aquí</router-link>
            </p>
        </div>
    </div>
</template>