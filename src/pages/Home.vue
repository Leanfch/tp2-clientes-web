<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchProducts } from "../services/product.js";
import { getUserData } from "../services/auth";
import LoaderCircle from "../components/LoaderCircle.vue";

export default {
    name: "Home",
    components: { LoaderCircle },
    setup() {
        const products = ref([]);
        const productsLoading = ref(true);
        const router = useRouter();

        onMounted(async () => {
            // Intentar cargar desde localStorage primero
            const cachedProducts = localStorage.getItem("products");

            if (cachedProducts) {
                // Si hay productos en caché, usarlos inmediatamente
                products.value = JSON.parse(cachedProducts);
                productsLoading.value = false;
            } else {
                // Si no hay caché, cargar desde Firebase
                products.value = await fetchProducts();
                productsLoading.value = false;
                // Guardar en localStorage para futuras visitas
                localStorage.setItem("products", JSON.stringify(products.value));
            }
        });

        const buyProduct = (productId) => {
            const user = getUserData();

            if (user) { // Check if user is authenticated
                router.push({ name: 'SalePage', params: { productId } });
            } else {
                router.push({ name: 'Login' }); // Redirect to login page if user is not authenticated
            }
        };

        return {
            products,
            productsLoading,
            buyProduct
        };
    },

};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <!-- Hero Section -->
        <div class="max-w-7xl mx-auto mb-16 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Planes de Hosting <span class="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Profesional</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Elige el plan perfecto para tu proyecto. Hosting rápido, seguro y escalable.
            </p>
        </div>

        <!-- Loader -->
        <div v-if="productsLoading" class="flex items-center justify-center py-20">
            <LoaderCircle />
        </div>

        <!-- Cards de Planes -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div v-for="product in products" :key="product.id"
                class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
                :class="{
                    'ring-2 ring-orange-500 ring-offset-2': product.name === 'Vita Plus'
                }">

                <!-- Badge "Popular" para Vita Plus -->
                <div v-if="product.name === 'Vita Plus'"
                    class="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    POPULAR
                </div>

                <div class="p-8">
                    <!-- Nombre del Plan -->
                    <h2 class="text-3xl font-bold text-gray-900 mb-2 text-center">
                        {{ product.name }}
                    </h2>

                    <!-- Descripción -->
                    <p class="text-gray-600 text-center mb-6 min-h-[3rem]">
                        {{ product.description }}
                    </p>

                    <!-- Precio -->
                    <div class="text-center mb-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <div class="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                            ${{ product.price }}
                        </div>
                        <div class="text-sm text-gray-500 mt-2">por mes</div>
                    </div>

                    <!-- Features -->
                    <div class="mb-8">
                        <p class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Incluye:</p>
                        <ul class="space-y-3">
                            <li v-for="feature in product.features" :key="feature"
                                class="flex items-start text-gray-700">
                                <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Botón -->
                    <button @click="buyProduct(product.id)"
                        class="w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Comenzar Ahora
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
