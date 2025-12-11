<script>
import LoaderCircle from '../components/LoaderCircle.vue';
import MainTitle from '../components/MainTitle.vue';
import { getUsers } from '../services/user'

export default {
    name: 'UsersList',
    components: { LoaderCircle, MainTitle },
    data() {
        return {
            usersLoading: true,
            userList: [],
        }
    },
    async mounted() {
        this.usersLoading = true;
        await this.fetchUsers();
        this.usersLoading = false;
    },
    methods: {
        async fetchUsers() {
            try {
                const userList = await getUsers();
                this.userList = userList;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        isUserAdmin(user) {
            return user.role === 'admin';
        },
    },
    computed: {
        // Filtra la lista de usuarios para excluir a los administradores
        filteredUsers() {
            return this.userList.filter(user => !this.isUserAdmin(user));
        },
    },
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <div class="max-w-5xl mx-auto">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Chat con Clientes</h1>
                <p class="text-lg text-gray-600">
                    Selecciona un usuario para iniciar una conversación de soporte.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="usersLoading" class="flex items-center justify-center py-20">
                <LoaderCircle />
            </div>

            <!-- Users List -->
            <div v-else>
                <!-- Grid de usuarios -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <router-link v-for="user in filteredUsers" :key="user.id"
                        :to="`/usuario/${user.id}/chat`"
                        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-slate-300 hover:-translate-y-1 group">
                        <div class="flex items-center gap-4">
                            <!-- Avatar -->
                            <div class="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>

                            <!-- User Info -->
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-gray-900 truncate group-hover:text-slate-700 transition-colors">
                                    {{ user.email }}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">Click para chatear</p>
                            </div>

                            <!-- Arrow Icon -->
                            <svg class="w-5 h-5 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </router-link>
                </div>

                <!-- Empty State -->
                <div v-if="filteredUsers.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">No hay usuarios registrados</h3>
                    <p class="text-gray-600">Aún no hay clientes para contactar.</p>
                </div>
            </div>
        </div>
    </div>
</template> 