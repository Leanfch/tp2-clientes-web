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
    <div class="px-4 md:px-6">
        <h1 class="mb-10 md:mb-20 font-bold text-3xl md:text-5xl text-center mt-6 md:mt-10">Servicio de hosting</h1>
        <div v-if="productsLoading" class="flex items-center justify-center align-middle">
            <LoaderCircle />
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-6 max-w-7xl mx-auto">
            <div class="flex-col flex w-full justify-between p-6 md:p-8 rounded-2xl shadow-lg transition-transform hover:scale-105" v-for="product in products" :class="{
                'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white': product.name === 'Vita Basic',
                'bg-gradient-to-br from-blue-700 to-indigo-800 text-white': product.name === 'Vita Plus',
                'bg-gradient-to-br from-purple-700 to-pink-800 text-white': product.name === 'Vita Premium',
                'bg-gradient-to-br from-teal-600 to-cyan-700 text-white': !(product.name === 'Vita Basic' || product.name === 'Vita Plus' || product.name === 'Vita Premium')
            }" :key="product.id">
                <h2 class="text-center text-2xl md:text-2xl mb-3 font-bold uppercase h-10">{{ product.name }}</h2>
                <p class="text-center md:leading-none my-4 text-base md:text-md opacity-90 min-h-xl">{{ product.description }}</p>
                <p class="font-bold mb-3 text-base md:text-lg text-center">Funciones principales:</p>
                <ul class="space-y-1 mb-6 text-sm md:text-base flex flex-col">
                    <li v-for="feature in product.features" :key="feature" class="flex items-start">
                        <span class="mr-2">✓</span>
                        <span>{{ feature }}</span>
                    </li>
                </ul>
                <div class="flex flex-col gap-5 justify-center items-center">
                    <p class="font-bold mt-4 text-center text-4xl md:text-5xl">${{ product.price }}</p>
                    <button @click="buyProduct(product.id)"
                        class="w-full md:w-auto px-6 py-3 bg-white text-gray-800 hover:bg-gray-100 transition-all duration-200 uppercase font-bold rounded-lg shadow-md hover:shadow-xl">Comprar</button>
                </div>
            </div>
        </div>
    </div>
</template>
