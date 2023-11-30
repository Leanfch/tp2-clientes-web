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
    <div class="flex place-items-center flex-col">
        <div class="mt-4 py-6 place-items-center w-1/3 bg-verdoso rounded-xl flex flex-col">
            <h1 class="my-4 pb-2 uppercase text-blanco font-bold text-3xl">Registrarse</h1>

            <form action="#" class="flex flex-col" @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <BaseLabel for="email">E-mail</BaseLabel>
                    <BaseInput placeholder="ejemplo@ejemplo.com" type="email" id="email" v-model="newUser.email"
                        :disabled="registerLoading" autocomplete="off" />
                </div>
                <div class="mb-3">
                    <BaseLabel for="name">Nombre</BaseLabel>
                    <BaseInput placeholder="Nombre" type="text" id="name" v-model="newUser.name" :disabled="registerLoading"
                        autocomplete="off" />
                </div>
                <div class="mb-3">
                    <BaseLabel for="last_name">Apellido</BaseLabel>
                    <BaseInput placeholder="Apellido" type="text" id="last_name" v-model="newUser.last_name"
                        :disabled="registerLoading" autocomplete="off" />
                </div>
                <div class="mb-3">
                    <BaseLabel for="password">Contraseña</BaseLabel>
                    <BaseInput type="password" id="password" v-model="newUser.password" :disabled="registerLoading" required
                        autocomplete="off" />
                </div>
                <BaseButton class="mt-3" :loading="registerLoading">Registrarse</BaseButton>
            </form>
        </div>
    </div>
</template>