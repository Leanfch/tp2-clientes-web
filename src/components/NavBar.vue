<script>
import { subscribeToAuth, logout } from '../services/auth';

export default {
    name: "NavBar",
    data() {
        return {
            user: {
                id: null,
                email: null,
                role: null,
            }
        };
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/iniciar-sesion');
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = { ...user };
            if (this.user.id) {
            }
        });
    },
    computed: {
        isAdmin() {
            return this.user.role === 'admin';
        }
    },
};
</script>
<template>
    <header class="flex gap-8 items-center px-4 bg-neutral-300 text-bold">
        <img src="/vitahost.svg" alt="Logo de vitahost" width="30" class="block">
        <div>
            <a href="/" class="text-2xl font-bold">VITAHOST</a>
        </div>
        <nav>
            <ul class="flex gap-4 font-bold h-full">
                <li class="h-full">
                    <router-link
                        class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                        to="/">Home</router-link>
                </li>
                <li class="h-full">
                    <router-link
                        class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                        to="/quienes-somos">Quiénes Somos</router-link>
                </li>
                <!-- Enlaces solo cuando el usuario está autenticado -->
                <template v-if="!user.id">
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/registro">Registro</router-link>
                    </li>
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                </template>
                <!-- Enlaces solo cuando el usuario es admin -->
                <template v-if="user.role === 'admin'">
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/usuario-chats">Chat de usuarios</router-link>
                    </li>
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/administration">Administración</router-link>
                    </li>
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/ventas">Ventas</router-link>
                    </li>
                </template>

                <!-- Enlace de cerrar sesión solo cuando el usuario está autenticado -->
                <template v-if="user.id">
                    <li class="h-full">
                        <router-link
                            class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2"
                            to="/perfil">Perfil</router-link>
                    </li>
                    <li class="h-full">
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit" title="Cerrar sesión"
                                class="h-full uppercase hover:bg-red-400 hover:text-white transition-colors block py-3 px-2">
                                <img src="../../public/img/logout.png" class="h-6 ms-2" alt="Cerrar sesión" />
                            </button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>