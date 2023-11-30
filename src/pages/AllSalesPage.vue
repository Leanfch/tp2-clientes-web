<script>
import MainTitle from '../components/MainTitle.vue';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import LoaderCircle from '../components/LoaderCircle.vue';

export default {
    components: {
        MainTitle, LoaderCircle
    },
    data() {
        return {
            sales: [],
            isLoading: false
        };
    },
    computed: {
        totalSales() {
            return this.sales.reduce((total, sale) => total + sale.productPrice, 0);
        },
    },
    async created() {
        this.isLoading = true;
        const querySnapshot = await getDocs(collection(db, "sales"));
        querySnapshot.forEach((doc) => {
            this.sales.push(doc.data());
        });
        this.isLoading = false;
    }
};
</script>
<template>
    <div>
        <MainTitle class="text-center mt-5">Ventas</MainTitle>
        <p class="text-center">Aquí apareceran las ventas concretadas</p>
        <div class="flex justify-center mt-10">
            <template v-if="isLoading">
                <LoaderCircle />
            </template>
            <div class="flex justify-center mt-10 flex-col w-[50%]" v-else>
                <table>
                    <thead>
                        <tr class="uppercase bg-neutral-300">
                            <th class="border-solid border-2 border-black">Servicio</th>
                            <th class="border-solid border-2 border-black">Precio</th>
                            <th class="border-solid border-2 border-black">E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sale, index) in sales" :key="index" class="text-center">
                            <td class="border-solid border-2 border-black">{{ sale.productName }}</td>
                            <td class="border-solid border-2 border-black">$ {{ sale.productPrice }}</td>
                            <td class="border-solid border-2 border-black">{{ sale.userEmail }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-center mt-5 uppercase">Total: $ <strong class="text-xl">{{ totalSales }}</strong></p>
            </div>
        </div>
    </div>
</template>