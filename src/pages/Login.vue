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
    <div class="flex place-items-center flex-col">
        <div class="mt-4 py-6 place-items-center w-1/3 bg-verdoso rounded-xl flex flex-col">
            <h1 class="my-4 pb-2 uppercase text-blanco font-bold text-3xl">Ingresar</h1>

            <form class="flex flex-col" action="#" @submit.prevent="doLogin">
                <div class="mb-3">
                    <BaseLabel>E-mail</BaseLabel>
                    <BaseInput placeholder="ejemplo@ejemplo.com" type="email" id="email" v-model="form.email"
                        :disabled="loginLoading" required />
                </div>
                <div class="mb-3">
                    <BaseLabel>Contraseña</BaseLabel>
                    <BaseInput type="password" id="password" v-model="form.password" :disabled="loginLoading" required />
                </div>
                <BaseButton class="mt-3" :loading="loginLoading">Iniciar</BaseButton>
            </form>
        </div>
    </div>
</template>