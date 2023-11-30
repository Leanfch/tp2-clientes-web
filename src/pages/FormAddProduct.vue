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
    <div>
        <!-- Tu código existente aquí -->

        <!-- Formulario para agregar un nuevo producto -->
        <div>
            <h1 class="text-2xl font-bold mb-4">Agregar Nuevo Hosting</h1>
            <form @submit.prevent="addProduct" class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre del producto:</label>
                    <input v-model="newProduct.name" type="text" id="name" class="border rounded w-full py-2 px-3"
                        required />
                </div>

                <div class="mb-4">
                    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción del
                        producto:</label>
                    <textarea v-model="newProduct.description" id="description" class="border rounded w-full py-2 px-3"
                        required></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Funciones principales:</label>
                    <ul>
                        <li v-for="(feature, index) in newProduct.features" :key="index">
                            <div class="flex">
                                <input v-model="newProduct.features[index]" type="text"
                                    class="border rounded w-full py-2 px-3 mb-2" required />
                                <button @click="removeFeature(index)" type="button"
                                    class="ml-2 p-2 bg-red-500 text-white rounded">Eliminar</button>
                            </div>
                        </li>
                    </ul>
                    <button @click.prevent="addNewFeature" type="button"
                        class="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700">Agregar Nueva
                        Característica</button>

                </div>

                <div class="mb-4">
                    <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                    <input v-model="newProduct.price" type="number" id="price" class="border rounded w-full py-2 px-3"
                        required />
                </div>

                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Agregar
                    Producto</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Estilos si es necesario */
</style>