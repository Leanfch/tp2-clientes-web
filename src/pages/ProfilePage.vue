<script>
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
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
            subscriptions: [],
            availableProducts: [],
            isChangingPlan: false,
            selectedSubscription: null,
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

                    // Cargar suscripciones del usuario
                    await this.loadUserSubscriptions();
                    await this.loadAvailableProducts();
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
        },
        async loadUserSubscriptions() {
            try {
                const salesRef = collection(db, 'sales');
                const q = query(salesRef, where('userId', '==', this.user.id));
                const querySnapshot = await getDocs(q);

                this.subscriptions = [];
                querySnapshot.forEach((doc) => {
                    this.subscriptions.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
            } catch (error) {
                console.error('Error loading subscriptions:', error);
            }
        },
        async loadAvailableProducts() {
            const cachedProducts = localStorage.getItem("products");
            if (cachedProducts) {
                this.availableProducts = JSON.parse(cachedProducts);
            }
        },
        startChangePlan(subscription) {
            this.selectedSubscription = subscription;
            this.isChangingPlan = true;
        },
        async changePlan(newProduct) {
            try {
                const subscriptionRef = doc(db, 'sales', this.selectedSubscription.id);
                await updateDoc(subscriptionRef, {
                    productId: newProduct.id,
                    productName: newProduct.name,
                    productPrice: newProduct.price,
                });

                this.$swal({
                    title: '¡Plan actualizado!',
                    text: `Tu plan ha sido cambiado a ${newProduct.name}`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                await this.loadUserSubscriptions();
                this.isChangingPlan = false;
                this.selectedSubscription = null;
            } catch (error) {
                console.error('Error changing plan:', error);
                this.$swal({
                    title: 'Error',
                    text: 'No se pudo cambiar el plan',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        async cancelSubscription(subscriptionId) {
            const result = await this.$swal({
                title: '¿Estás seguro?',
                text: '¿Deseas cancelar esta suscripción?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, 'sales', subscriptionId));

                    this.$swal({
                        title: '¡Cancelada!',
                        text: 'Tu suscripción ha sido cancelada',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    await this.loadUserSubscriptions();
                } catch (error) {
                    console.error('Error canceling subscription:', error);
                    this.$swal({
                        title: 'Error',
                        text: 'No se pudo cancelar la suscripción',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        }
    },
}
</script>

<template>
    <div class="flex flex-col items-center px-4 max-w-4xl mx-auto">
        <MainTitle class="text-center">Mi perfil</MainTitle>
        <template v-if="isLoading">
            <LoaderCircle />
        </template>
        <template v-else>
            <div v-if="updateSuccess" class="mt-5 bg-lime-600 p-5 uppercase text-white rounded-md w-full text-center">
                Sus datos han sido modificados exitosamente, por favor <strong>refresque</strong> la página para visualizar
                los cambios.
            </div>

            <!-- Información personal -->
            <div class="w-full md:w-2/3 mt-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex justify-center mb-4">
                        <img src="/img/user.png" alt="User avatar" class="w-24 h-24">
                    </div>

                    <div class="space-y-3 text-gray-700">
                        <div>
                            <p class="font-bold text-sm text-gray-500">Email:</p>
                            <p class="text-lg">{{ user.email }}</p>
                        </div>
                        <div>
                            <p class="font-bold text-sm text-gray-500">Nombre:</p>
                            <p class="text-lg">{{ user.name }}</p>
                        </div>
                        <div>
                            <p class="font-bold text-sm text-gray-500">Apellido:</p>
                            <p class="text-lg">{{ user.last_name }}</p>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-center">
                        <router-link :to="`/usuario/bSl0DPiI9SabCjaYNEva1LzQjCP2/chat`"
                            class="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                            Hablar con el proveedor
                        </router-link>
                    </div>

                    <div v-if="isEditing" class="mt-6 pt-6 border-t border-gray-200">
                        <form @submit.prevent="handleEditForm" class="space-y-4">
                            <input v-model="editData.name" placeholder="Nombre"
                                class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                            <input v-model="editData.last_name" placeholder="Apellido"
                                class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                            <div class="flex gap-2">
                                <button type="submit" class="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                                    Guardar datos
                                </button>
                                <button type="button" @click="isEditing = false" class="px-4 p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>

                    <div v-if="!isEditing" class="mt-6">
                        <BaseButton @click="isEditing = true" class="w-full bg-gray-700 hover:bg-gray-800">
                            Editar información personal
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Suscripciones -->
            <div class="w-full mt-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Mis Suscripciones</h2>

                <div v-if="subscriptions.length === 0" class="bg-gray-100 p-8 rounded-lg text-center text-gray-600">
                    <p class="text-lg">No tienes suscripciones activas</p>
                    <router-link to="/" class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                        Ver planes disponibles
                    </router-link>
                </div>

                <div v-else class="space-y-4">
                    <div v-for="subscription in subscriptions" :key="subscription.id"
                        class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-800">{{ subscription.productName }}</h3>
                                <p class="text-2xl font-bold text-blue-600 mt-2">${{ subscription.productPrice }}</p>
                            </div>

                            <div class="flex flex-col gap-2">
                                <button @click="startChangePlan(subscription)"
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors">
                                    Cambiar plan
                                </button>
                                <button @click="cancelSubscription(subscription.id)"
                                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                                    Cancelar suscripción
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal para cambiar plan -->
            <div v-if="isChangingPlan" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Selecciona tu nuevo plan</h3>
                        <p class="text-gray-600 mb-6">Plan actual: <strong>{{ selectedSubscription?.productName }}</strong></p>

                        <div class="space-y-3">
                            <div v-for="product in availableProducts" :key="product.id"
                                :class="{'opacity-50': product.id === selectedSubscription?.productId}"
                                class="border-2 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                                @click="product.id !== selectedSubscription?.productId && changePlan(product)">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4 class="text-lg font-bold text-gray-800">{{ product.name }}</h4>
                                        <p class="text-sm text-gray-600">{{ product.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-blue-600">${{ product.price }}</p>
                                        <span v-if="product.id === selectedSubscription?.productId"
                                            class="text-xs text-gray-500">Plan actual</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button @click="isChangingPlan = false; selectedSubscription = null"
                                class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
