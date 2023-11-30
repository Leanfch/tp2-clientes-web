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
                // Refresh the product list after deleting a product
                this.products = await fetchProducts();
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        },
    }
};
</script>
<template>
    <div>
        <MainTitle class="text-center my-5">Administración</MainTitle>
        <div class="flex flex-col">
            <h2 class="mb-5">
                Este panel es único para administradores, acá podrás crear y eliminar los productos existentes.
            </h2>
        </div>
        <div v-if="productsLoading" class="flex items-center justify-center align-middle my-5">
            <LoaderCircle />
        </div>
        <table class="w-[100%]">
            <thead>
                <tr class="uppercase bg-neutral-300">
                    <th class="border-solid border-2 border-black">Nombre</th>
                    <th class="border-solid border-2 border-black">Descripción</th>
                    <th class="border-solid border-2 border-black">Funciones Principales</th>
                    <th class="border-solid border-2 border-black">Precio</th>
                    <th class="border-solid border-2 border-black">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="text-center">
                    <td class="border-solid border-2 border-black">{{ product.name }}</td>
                    <td class="border-solid border-2 border-black">{{ product.description }}</td>
                    <td class="border-solid border-2 border-black">
                        <ul>
                            <li v-for="feature in product.features" :key="feature">- {{ feature }}</li>
                        </ul>
                    </td>
                    <td class="border-solid border-2 border-black">${{ product.price }}</td>
                    <td class="border-solid border-2 border-black">
                        <button @click="confirmDelete(product.id)"
                            class="p-3 mx-2 rounded-xl border bg-red-500 text-white hover:bg-red-800">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="w-52">
            <router-link to="/cargar-hosting" class="border-black border-2 block text-center mt-3 p-1 color-black uppercase bg-slate-300 hover:bg-slate-400 hover:p-2
                transition-all">Agregar nuevo hosting</router-link>
        </div>
    </div>
</template>