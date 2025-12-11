<script>
import MainTitle from '../components/MainTitle.vue';
import LoaderCircle from '../components/LoaderCircle.vue';
import { fetchProducts } from "../services/product.js";
import { db } from "../services/firebase.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import swal from "sweetalert2";
export default {
    name: "Administracion",
    components: { MainTitle, LoaderCircle },
    setup() {
        const products = ref([]);
        const productsLoading = ref(true);
        onMounted(async () => {
            products.value = await fetchProducts();
            productsLoading.value = false;
        });

        return {
            products,
            productsLoading,
        };
    },
    methods: {
        async confirmDelete(productId) {
            const reuslt = await swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede revertir',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            });
            if (reuslt.isConfirmed) {
                await this.deleteProduct(productId);
            }
        },
        async deleteProduct(productId) {
            const productRef = doc(db, 'hosting', productId);
            try {
                await deleteDoc(productRef);

                // Limpiar el caché de localStorage
                localStorage.removeItem('products');

                // Refresh the product list after deleting a product
                this.products = await fetchProducts();

                // Actualizar el caché con los nuevos datos
                localStorage.setItem('products', JSON.stringify(this.products));
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        },
    }
};
</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Panel de Administración</h1>
                <p class="text-lg text-gray-600">
                    Gestiona los planes de hosting disponibles. Puedes crear, editar y eliminar productos.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="productsLoading" class="flex items-center justify-center py-20">
                <LoaderCircle />
            </div>

            <!-- Table Container -->
            <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 text-white">
                                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Descripción</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Características</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Precio</th>
                                <th class="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="product in products" :key="product.id"
                                class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4">
                                    <div class="font-semibold text-gray-900">{{ product.name }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-600 max-w-xs">{{ product.description }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <ul class="text-sm text-gray-600 space-y-1">
                                        <li v-for="feature in product.features" :key="feature"
                                            class="flex items-start">
                                            <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>{{ feature }}</span>
                                        </li>
                                    </ul>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-2xl font-bold text-gray-900">${{ product.price }}</div>
                                    <div class="text-xs text-gray-500">por mes</div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <button @click="confirmDelete(product.id)"
                                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Add Product Button -->
            <div class="mt-8">
                <router-link to="/cargar-hosting"
                    class="inline-block px-8 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 hover:from-slate-800 hover:via-slate-700 hover:to-gray-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Agregar Nuevo Plan
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>