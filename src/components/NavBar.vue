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
        },
        closeMobileMenu() {
            this.mobileMenuOpen = false;
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = { ...user };
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
    <!-- Header fixed -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 shadow-lg">

        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 md:h-20">

                <!-- Logo -->
                <router-link to="/" class="flex items-center gap-2 md:gap-3 flex-shrink-0 group" @click="closeMobileMenu">
                    <img src="/vitahost.svg" alt="Logo VitaHost" class="w-7 h-7 md:w-9 md:h-9 drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span class="text-lg md:text-2xl font-bold text-white tracking-wide group-hover:text-gray-200 transition-colors">
                        VITAHOST
                    </span>
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex lg:items-center lg:gap-1">
                    <!-- Main Links -->
                    <router-link to="/"
                        class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        Home
                    </router-link>
                    <router-link to="/quienes-somos"
                        class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        Quiénes Somos
                    </router-link>

                    <!-- Admin Links -->
                    <template v-if="user.role === 'admin'">
                        <router-link to="/usuario-chats"
                            class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Chat
                        </router-link>
                        <router-link to="/administration"
                            class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Admin
                        </router-link>
                        <router-link to="/ventas"
                            class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Ventas
                        </router-link>
                    </template>

                    <!-- Divider -->
                    <div class="w-px h-6 bg-gray-500 mx-2"></div>

                    <!-- Auth Actions -->
                    <template v-if="!user.id">
                        <router-link to="/registro"
                            class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Registro
                        </router-link>
                        <router-link to="/iniciar-sesion"
                            class="bg-white text-slate-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 ml-1">
                            Iniciar Sesión
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/perfil"
                            class="text-gray-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Perfil
                        </router-link>
                        <button @click="handleLogout"
                            class="text-gray-200 hover:text-white hover:bg-red-600/80 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ml-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Salir
                        </button>
                    </template>
                </div>

                <!-- Mobile menu button -->
                <button
                    @click="toggleMobileMenu"
                    type="button"
                    class="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                    aria-controls="mobile-menu"
                    :aria-expanded="mobileMenuOpen">
                    <span class="sr-only">Abrir menú</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile menu -->
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1">
            <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-600">
                <div class="px-2 pt-2 pb-3 space-y-1 bg-slate-800/98 backdrop-blur-lg">
                    <!-- Main Links -->
                    <router-link to="/" @click="closeMobileMenu"
                        class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                        Home
                    </router-link>
                    <router-link to="/quienes-somos" @click="closeMobileMenu"
                        class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                        Quiénes Somos
                    </router-link>

                    <!-- Admin Links -->
                    <template v-if="user.role === 'admin'">
                        <div class="border-t border-gray-600 my-2"></div>
                        <router-link to="/usuario-chats" @click="closeMobileMenu"
                            class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            Chat de usuarios
                        </router-link>
                        <router-link to="/administration" @click="closeMobileMenu"
                            class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            Administración
                        </router-link>
                        <router-link to="/ventas" @click="closeMobileMenu"
                            class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            Ventas
                        </router-link>
                    </template>

                    <!-- Auth Actions -->
                    <div class="border-t border-gray-600 my-2"></div>
                    <template v-if="!user.id">
                        <router-link to="/registro" @click="closeMobileMenu"
                            class="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            Registro
                        </router-link>
                        <router-link to="/iniciar-sesion" @click="closeMobileMenu"
                            class="bg-white text-slate-700 hover:bg-gray-100 block px-3 py-2 rounded-lg text-base font-semibold text-center shadow-md transition-all duration-200">
                            Iniciar Sesión
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/perfil" @click="closeMobileMenu"
                            class="text-gray-200 hover:text-white hover:bg-white/10 flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Perfil
                        </router-link>
                        <button @click="handleLogout"
                            class="w-full text-gray-200 hover:text-white hover:bg-red-600/80 flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Cerrar Sesión
                        </button>
                    </template>
                </div>
            </div>
        </transition>
    </header>

    <!-- Spacer para compensar el header fixed -->
    <div class="h-16 md:h-20"></div>
</template>