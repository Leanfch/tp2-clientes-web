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
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
                <p class="text-lg text-gray-600">Gestiona tu información personal y suscripciones</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center py-20">
                <LoaderCircle />
            </div>

            <template v-else>
                <!-- Success Message -->
                <div v-if="updateSuccess" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-green-700">
                            <strong>¡Actualizado!</strong> Tus datos han sido modificados exitosamente. Refresca la página para ver los cambios.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <!-- Información Personal -->
                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 sticky top-24">
                            <!-- Avatar -->
                            <div class="flex justify-center mb-6">
                                <div class="relative">
                                    <div class="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center text-white">
                                        <svg class="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <div class="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                                </div>
                            </div>

                            <!-- User Info Display -->
                            <div v-if="!isEditing" class="space-y-4">
                                <div class="text-center border-b border-gray-200 pb-4">
                                    <h2 class="text-xl md:text-2xl font-bold text-gray-900">{{ user.name }} {{ user.last_name }}</h2>
                                    <p class="text-sm text-gray-500 mt-1">{{ user.email }}</p>
                                </div>

                                <div class="space-y-3 pt-2">
                                    <div class="flex items-center gap-3 text-gray-700">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                        <span class="text-sm">{{ user.email }}</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-gray-700">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        <span class="text-sm">{{ user.name }} {{ user.last_name }}</span>
                                    </div>
                                </div>

                                <div class="pt-4 space-y-2">
                                    <button @click="isEditing = true"
                                        class="w-full px-4 py-3 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                                        Editar Perfil
                                    </button>
                                    <router-link :to="`/usuario/bSl0DPiI9SabCjaYNEva1LzQjCP2/chat`"
                                        class="w-full px-4 py-3 bg-white border-2 border-slate-300 hover:border-slate-500 text-slate-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                        Contactar Soporte
                                    </router-link>
                                </div>
                            </div>

                            <!-- Edit Form -->
                            <div v-else class="space-y-4">
                                <h3 class="text-lg font-bold text-gray-900 mb-4">Editar Información</h3>
                                <form @submit.prevent="handleEditForm" class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                        <input v-model="editData.name" type="text" required
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                                            placeholder="Tu nombre" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                                        <input v-model="editData.last_name" type="text" required
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                                            placeholder="Tu apellido" />
                                    </div>
                                    <div class="flex gap-2 pt-2">
                                        <button type="submit"
                                            class="flex-1 px-4 py-3 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md">
                                            Guardar
                                        </button>
                                        <button type="button" @click="isEditing = false"
                                            class="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200">
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Suscripciones -->
                    <div class="lg:col-span-2">
                        <div class="mb-6">
                            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mis Suscripciones</h2>
                            <p class="text-gray-600">Administra tus planes activos</p>
                        </div>

                        <!-- Empty State -->
                        <div v-if="subscriptions.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                            </svg>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">No tienes suscripciones activas</h3>
                            <p class="text-gray-600 mb-6">Explora nuestros planes y encuentra el que mejor se adapte a tus necesidades</p>
                            <router-link to="/"
                                class="inline-block px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Ver Planes Disponibles
                            </router-link>
                        </div>

                        <!-- Subscriptions List -->
                        <div v-else class="space-y-4">
                            <div v-for="subscription in subscriptions" :key="subscription.id"
                                class="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Activo</span>
                                        </div>
                                        <h3 class="text-2xl font-bold text-gray-900">{{ subscription.productName }}</h3>
                                        <div class="flex items-baseline gap-2 mt-2">
                                            <span class="text-4xl font-bold text-gray-900">${{ subscription.productPrice }}</span>
                                            <span class="text-gray-500">/ mes</span>
                                        </div>
                                    </div>

                                    <div class="flex flex-col sm:flex-row gap-2">
                                        <button @click="startChangePlan(subscription)"
                                            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                            </svg>
                                            Cambiar Plan
                                        </button>
                                        <button @click="cancelSubscription(subscription.id)"
                                            class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal para cambiar plan -->
                <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="isChangingPlan" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                            @click.stop>
                            <!-- Modal Header -->
                            <div class="bg-gradient-to-r from-slate-600 to-gray-600 p-6">
                                <h3 class="text-2xl md:text-3xl font-bold text-white">Cambiar Plan</h3>
                                <p class="text-gray-200 mt-1">Plan actual: <strong>{{ selectedSubscription?.productName }}</strong></p>
                            </div>

                            <!-- Modal Body -->
                            <div class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                                <div class="space-y-3">
                                    <div v-for="product in availableProducts" :key="product.id"
                                        :class="{
                                            'opacity-50 cursor-not-allowed': product.id === selectedSubscription?.productId,
                                            'cursor-pointer hover:border-slate-500 hover:shadow-lg': product.id !== selectedSubscription?.productId
                                        }"
                                        class="border-2 border-gray-200 rounded-xl p-4 md:p-6 transition-all duration-200"
                                        @click="product.id !== selectedSubscription?.productId && changePlan(product)">
                                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-2 mb-2">
                                                    <h4 class="text-lg md:text-xl font-bold text-gray-900">{{ product.name }}</h4>
                                                    <span v-if="product.id === selectedSubscription?.productId"
                                                        class="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                                                        Actual
                                                    </span>
                                                </div>
                                                <p class="text-sm text-gray-600">{{ product.description }}</p>
                                            </div>
                                            <div class="text-left sm:text-right">
                                                <p class="text-3xl font-bold text-gray-900">${{ product.price }}</p>
                                                <p class="text-sm text-gray-500">por mes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal Footer -->
                            <div class="border-t border-gray-200 p-6 bg-gray-50">
                                <button @click="isChangingPlan = false; selectedSubscription = null"
                                    class="w-full px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-xl transition-all duration-200">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>
