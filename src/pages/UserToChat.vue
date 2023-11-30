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
    <MainTitle class="text-center">Usuarios</MainTitle>
    <p class="mb-2">Este panel es único para administradores, acá podrás contactar a los clientes:</p>
    <div v-if="usersLoading" class="flex justify-center mb-10">
        <LoaderCircle v-if="usersLoading"></LoaderCircle>
    </div>
    <template v-else>
        <div>
            <ul>
                <li v-for="user in userList" class="my-10 uppercase">
                    <router-link v-if="!isUserAdmin(user)" :to="`/usuario/${user.id}/chat`"
                        class="text-red-950 font-bold text-xl bg-red-100 p-3 mb-5 hover:p-5 border-solid border-2 border-red-700 rounded-sm hover:shadow-xl transition-all">{{
                            user.email
                        }}</router-link>
                </li>
            </ul>
        </div>
    </template>
</template> 