<script>
import MainTitle from '../components/MainTitle.vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";

export default {
    name: "FormAddProduct",
    components: { MainTitle },
    data() {
        return {
            newProduct: {
                name: '',
                description: '',
                features: [''],
                price: 0,
            },
        };
    },
    methods: {
        async addProduct() {

            const hostingCollection = collection(db, 'hosting');

            try {
                await addDoc(hostingCollection, {
                    name: this.newProduct.name,
                    description: this.newProduct.description,
                    features: this.newProduct.features,
                    price: this.newProduct.price,
                });

                // Limpiar el caché de productos para forzar recarga desde Firebase
                localStorage.removeItem('products');

                this.newProduct = {
                    name: '',
                    description: '',
                    features: [''],
                    price: 0,
                };


                this.$router.push('/administration');
            } catch (error) {
                console.error('Error al agregar el producto:', error);
            }
        },
        addNewFeature() {
            this.newProduct.features.push('');
        },
        removeFeature(index) {
            this.newProduct.features.splice(index, 1);
        },
    },
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Agregar Nuevo Plan</h1>
                <p class="text-base md:text-lg text-gray-600">
                    Completa el formulario para crear un nuevo plan de hosting.
                </p>
            </div>

            <!-- Form Container -->
            <form @submit.prevent="addProduct" class="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <!-- Nombre -->
                <div class="mb-6">
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Plan
                    </label>
                    <input v-model="newProduct.name" type="text" id="name"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                        placeholder="Ej: VitaHost Plus"
                        required />
                </div>

                <!-- Descripción -->
                <div class="mb-6">
                    <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                        Descripción
                    </label>
                    <textarea v-model="newProduct.description" id="description" rows="3"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors resize-none text-sm md:text-base"
                        placeholder="Describe brevemente el plan..."
                        required></textarea>
                </div>

                <!-- Características -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        Características del Plan
                    </label>
                    <div class="space-y-3">
                        <div v-for="(feature, index) in newProduct.features" :key="index"
                            class="flex flex-col sm:flex-row gap-2">
                            <input v-model="newProduct.features[index]" type="text"
                                class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                                placeholder="Ej: 10GB de almacenamiento"
                                required />
                            <button @click="removeFeature(index)" type="button"
                                class="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base">
                                Eliminar
                            </button>
                        </div>
                    </div>
                    <button @click.prevent="addNewFeature" type="button"
                        class="mt-3 w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm md:text-base">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Agregar Característica
                    </button>
                </div>

                <!-- Precio -->
                <div class="mb-8">
                    <label for="price" class="block text-sm font-semibold text-gray-700 mb-2">
                        Precio Mensual (USD)
                    </label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm md:text-base">$</span>
                        <input v-model="newProduct.price" type="number" id="price" min="0" step="0.01"
                            class="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors text-sm md:text-base"
                            placeholder="0.00"
                            required />
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button type="submit"
                        class="flex-1 px-6 py-4 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base">
                        Guardar Plan
                    </button>
                    <router-link to="/administration"
                        class="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 text-center text-sm md:text-base">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Estilos si es necesario */
</style>