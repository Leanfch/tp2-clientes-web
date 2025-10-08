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
            },
            mobileMenuOpen: false
        };
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/iniciar-sesion');
            this.mobileMenuOpen = false;
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
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
    <header class="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4 md:px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo y marca -->
                <div class="flex items-center gap-2 md:gap-3">
                    <img src="/vitahost.svg" alt="Logo de vitahost" class="w-8 drop-shadow-lg">
                    <a href="/" class="text-xl md:text-3xl font-bold text-white tracking-wide hover:text-blue-400 transition-colors">
                        VITAHOST
                    </a>
                </div>

                <!-- Botón hamburguesa para móvil -->
                <button @click="toggleMobileMenu" class="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Navegación Desktop -->
                <nav class="hidden lg:flex flex-1 justify-center">
                    <ul class="flex gap-2 font-semibold">
                        <li>
                            <router-link
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg block"
                                to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg block"
                                to="/quienes-somos">Quiénes Somos</router-link>
                        </li>

                        <!-- Enlaces solo cuando el usuario es admin -->
                        <template v-if="user.role === 'admin'">
                            <li>
                                <router-link
                                    class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg block"
                                    to="/usuario-chats">Chat</router-link>
                            </li>
                            <li>
                                <router-link
                                    class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg block"
                                    to="/administration">Admin</router-link>
                            </li>
                            <li>
                                <router-link
                                    class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg block"
                                    to="/ventas">Ventas</router-link>
                            </li>
                        </template>
                    </ul>
                </nav>

                <!-- Acciones de usuario Desktop -->
                <div class="hidden lg:flex items-center gap-2">
                    <!-- Enlaces solo cuando el usuario NO está autenticado -->
                    <template v-if="!user.id">
                        <router-link
                            class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg"
                            to="/registro">Registro</router-link>
                        <router-link
                            class="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 px-5 py-2 rounded-lg font-semibold shadow-md"
                            to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </template>

                    <!-- Enlaces solo cuando el usuario está autenticado -->
                    <template v-if="user.id">
                        <router-link
                            class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg"
                            to="/perfil">Perfil</router-link>
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit" title="Cerrar sesión"
                                class="text-gray-200 hover:text-white hover:bg-red-600/80 transition-all duration-200 px-4 py-2 rounded-lg flex items-center gap-2">
                                <img src="../../public/img/logout.png" class="h-5" alt="Cerrar sesión" />
                                <span class="font-semibold">Salir</span>
                            </button>
                        </form>
                    </template>
                </div>
            </div>

            <!-- Menú móvil -->
            <div v-if="mobileMenuOpen" class="lg:hidden mt-2 rounded-b-xl bg-gray-600 pt-4">
                <ul class="flex flex-col text-center gap-2 font-semibold">
                    <li>
                        <router-link
                            @click="mobileMenuOpen = false"
                            class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                            to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link
                            @click="mobileMenuOpen = false"
                            class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                            to="/quienes-somos">Quiénes Somos</router-link>
                    </li>

                    <!-- Enlaces solo cuando el usuario es admin -->
                    <template v-if="user.role === 'admin'">
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                                to="/usuario-chats">Chat de usuarios</router-link>
                        </li>
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                                to="/administration">Administración</router-link>
                        </li>
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                                to="/ventas">Ventas</router-link>
                        </li>
                    </template>

                    <!-- Acciones de usuario móvil -->
                    <template v-if="!user.id">
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                                to="/registro">Registro</router-link>
                        </li>
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 px-4 py-3 rounded-lg block text-center font-semibold"
                                to="/iniciar-sesion">Iniciar Sesión</router-link>
                        </li>
                    </template>

                    <template v-if="user.id">
                        <li>
                            <router-link
                                @click="mobileMenuOpen = false"
                                class="text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-lg block"
                                to="/perfil">Perfil</router-link>
                        </li>
                        <li>
                            <button @click="handleLogout"
                                class="w-full text-left text-gray-200 hover:text-white hover:bg-red-600/80 transition-all duration-200 px-4 py-3 rounded-lg flex items-center gap-2">
                                <img src="../../public/img/logout.png" class="h-5" alt="Cerrar sesión" />
                                <span class="font-semibold">Salir</span>
                            </button>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </header>
</template>