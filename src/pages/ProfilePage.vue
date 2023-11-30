<script>
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import MainTitle from '../components/MainTitle.vue';
import LoaderCircle from "../components/LoaderCircle.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
    name: 'ProfilePage',
    components: { MainTitle, LoaderCircle, BaseButton },
    data() {
        return {
            isLoading: true,
            updateSuccess: false,
            user: {
                id: null,
                email: null,
                name: null,
                last_name: null,
            },
            isEditing: false,
            editData: {
                name: '',
                last_name: '',
            },

        };
    },
    mounted() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    this.user = {
                        id: user.uid,
                        email: user.email,
                        name: userSnap.data().name,
                        last_name: userSnap.data().last_name,
                    };
                    this.editData.name = this.user.name;
                    this.editData.last_name = this.user.last_name;
                }
            } else {
                this.user = {
                    id: null,
                    email: null,
                    name: null,
                    last_name: null
                };
            }
            this.isLoading = false;
        });
    },
    methods: {
        async handleEditForm() {
            try {
                await this.updateUserProfile(this.user.id, this.editData.name, this.editData.last_name);
                this.isEditing = false;
                this.updateSuccess = true;
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        },
        async updateUserProfile(userId, name, last_name) {
            const userRef = doc(db, "users", userId);

            await updateDoc(userRef, {
                name: name,
                last_name: last_name
            });
        }
    },
}
</script>

<template>
    <div class="flex flex-col items-center">
        <MainTitle class="text-center">Mi perfil</MainTitle>
        <template v-if="isLoading" class="flex flex-col items-center">
            <LoaderCircle />
        </template>
        <template v-else>
            <div v-if="updateSuccess" class="mt-5 bg-lime-600 p-5 uppercase text-black rounded-md">
                Sus datos han sido modificado exitosamente, por favor <strong>refresque</strong> la página para visualizar
                los cambios.
            </div>
            <div>
                <img src="/img/user.png" alt="" class="max-w-[150px]">
            </div>
            <div class="mt-5 text-lg">
                <div>
                    <p class="font-bold">Email:</p>
                    <p>{{ user.email }}</p>
                    <p class="font-bold">Nombre:</p>
                    <p> {{ user.name }} </p>
                    <p class="font-bold">Apellido:</p>
                    <p> {{ user.last_name }} </p>
                </div>
                <div class="my-5 flex justify-center">
                    <router-link :to="`/usuario/bSl0DPiI9SabCjaYNEva1LzQjCP2/chat`"
                        class="text-red-950 bg-red-100 p-3 hover:p-4 border-solid border-2 border-red-700 rounded-sm hover:shadow-xl transition-all">Hablar
                        con el proveedor</router-link>
                </div>
                <div v-if="isEditing" class="mt-5">
                    <form @submit.prevent="handleEditForm" class="space-y-4">
                        <input v-model="editData.name" placeholder="Name"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <input v-model="editData.last_name" placeholder="Last Name"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar
                            datos</button>
                    </form>
                </div>
                <div class="flex">
                    <BaseButton @click="isEditing = !isEditing" class="mt-5">Editar información personal</BaseButton>
                </div>
            </div>
        </template>
    </div>
</template>