<script>
import MainTitle from '../components/MainTitle.vue';
import BaseButton from "../components/BaseButton.vue";
import { collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';


export default {
    props: ['productId', 'userId'],
    data() {
        return {
            product: null,
            user: null
        };
    },
    created() {
        const storagedProducts = JSON.parse(localStorage.getItem("products"));
        const productById = storagedProducts.find((product) => product.id === this.productId);
        this.product = productById;
        const storagedUser = JSON.parse(localStorage.getItem("user"));
        this.user = storagedUser;
    },
    methods: {
        async finalizePurchase() {
            const purchaseRef = doc(collection(db, 'sales'))
            await setDoc(purchaseRef, {
                productId: this.product.id,
                productName: this.product.name,
                productPrice: this.product.price,
                userId: this.user.id,
                userEmail: this.user.email
            });
            this.showAlert();
        },
        showAlert() {
            this.$swal({
                title: '¡Compra realizada!',
                text: 'Tu compra se ha realizado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                this.$router.push('/');
            });
        }
    },
    components: { MainTitle, BaseButton }
};
</script>

<template>
    <div>
        <MainTitle class="text-center my-5">Finalizar compra</MainTitle>

        <form class="w-full max-w-lg mx-auto mt-5">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Servicio
                    </label>
                    <p class="mb-3 p-5 bg-slate-200">{{ product.name }}</p>

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Descripción
                    </label>
                    <p class="mb-3 p-5 bg-slate-200">{{ product.description }}</p>

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Precio
                    </label>
                    <p class="mb-3 p-5 bg-slate-200">{{ product.price }}</p>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Enviar producto a:
                    </label>
                    <p class="mb-3 p-5 bg-slate-200">{{ user.email }}</p>
                </div>
            </div>
            <div class="flex justify-center">
                <BaseButton @click.prevent="finalizePurchase"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Finalizar compra
                </BaseButton>
            </div>
        </form>
    </div>
</template>