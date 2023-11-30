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
            products.value = await fetchProducts();
            productsLoading.value = false;
            const products2 = products.value.map((product) => product);
            localStorage.setItem("products", JSON.stringify(products2));
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
    <div>
        <h1 class="mb-20 font-bold text-5xl text-center mt-10">Servicio de hosting</h1>
        <div v-if="productsLoading" class="flex items-center justify-center align-middle">
            <LoaderCircle />
        </div>
        <div class="flex justify-center">
            <div class="flex-col w-[30%] mx-3 p-5 rounded-xl" v-for="product in products" :class="{
                'bg-[#f8982b]': product.name === 'Vita Basic',
                'bg-[#47b0e0]': product.name === 'Vita Plus',
                'bg-[#d13d3d]': product.name === 'Vita Premium',
                'bg-[#44b64e]': product.name !== 'Vita' //Nuevo producto agregado
            }" :key="product.id">
                <h2 class="text-center text-4xl mb-1 font-bold uppercase h-10">{{ product.name }}</h2>
                <p class="text-center mb-2 text-xl italic h-[75px]">{{ product.description }}</p>
                <p class="font-bold mb-2 text-xl text-center">Funciones principales:</p>
                <ul>
                    <li v-for="feature in product.features" :key="feature">- {{ feature }}</li>
                </ul>
                <div class="flex justify-center items-center">
                    <p class="font-bold rounded-3xl mt-5 text-center text-5xl">${{ product.price }}</p>
                </div>
                <div class="flex justify-center mt-10">
                    <button @click="buyProduct(product.id)"
                        class="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-950 hover:text-white transition-colors text-black uppercase font-bold rounded">Comprar</button>
                </div>
            </div>
        </div>
    </div>
</template>