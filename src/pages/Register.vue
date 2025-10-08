<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            registerLoading: false,
            newUser: {
                email: '',
                password: '',
                name: '',
                last_name: '',
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.registerLoading = true;
            try {
                await register({ ...this.newUser });
                this.$router.push('/');
            } catch (error) {
            }
            this.registerLoading = false;
        }
    },
}
</script>

<template>
    <div class="flex justify-center items-center min-h-[70vh] px-4">
        <div class="w-full max-w-md">
            <h1 class="mb-8 text-center font-bold text-4xl md:text-2xl text-gray-800">Registrarse</h1>

            <form action="#" class="flex flex-col space-y-6" @submit.prevent="handleSubmit">
                <div>
                    <BaseLabel for="email" class="text-gray-700 font-semibold mb-2 block text-sm">E-mail</BaseLabel>
                    <BaseInput
                        placeholder="ejemplo@ejemplo.com"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="email"
                        id="email"
                        v-model="newUser.email"
                        :disabled="registerLoading"
                        autocomplete="off"
                        required />
                </div>
                <div>
                    <BaseLabel for="name" class="text-gray-700 font-semibold mb-2 block text-sm">Nombre</BaseLabel>
                    <BaseInput
                        placeholder="Tu nombre"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="text"
                        id="name"
                        v-model="newUser.name"
                        :disabled="registerLoading"
                        autocomplete="off"
                        required />
                </div>
                <div>
                    <BaseLabel for="last_name" class="text-gray-700 font-semibold mb-2 block text-sm">Apellido</BaseLabel>
                    <BaseInput
                        placeholder="Tu apellido"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="text"
                        id="last_name"
                        v-model="newUser.last_name"
                        :disabled="registerLoading"
                        autocomplete="off"
                        required />
                </div>
                <div>
                    <BaseLabel for="password" class="text-gray-700 font-semibold mb-2 block text-sm">Contraseña</BaseLabel>
                    <BaseInput
                        placeholder="Mínimo 6 caracteres"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        type="password"
                        id="password"
                        v-model="newUser.password"
                        :disabled="registerLoading"
                        required
                        autocomplete="off" />
                </div>
                <BaseButton class="mt-8 w-full py-3 text-lg font-semibold" :loading="registerLoading">Crear cuenta</BaseButton>
            </form>

            <p class="mt-6 text-center text-gray-600">
                ¿Ya tienes cuenta?
                <router-link to="/iniciar-sesion" class="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Inicia sesión aquí</router-link>
            </p>
        </div>
    </div>
</template>