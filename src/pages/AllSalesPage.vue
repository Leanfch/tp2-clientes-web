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
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-12">
        <div class="max-w-6xl mx-auto">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Reporte de Ventas</h1>
                <p class="text-lg text-gray-600">
                    Visualiza todas las ventas concretadas y el total de ingresos.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center py-20">
                <LoaderCircle />
            </div>

            <!-- Sales Content -->
            <div v-else>
                <!-- Stats Card -->
                <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total de Ingresos</p>
                            <p class="text-4xl font-bold text-gray-900">${{ totalSales }}</p>
                        </div>
                        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center text-sm text-gray-600">
                        <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {{ sales.length }} {{ sales.length === 1 ? 'venta realizada' : 'ventas realizadas' }}
                    </div>
                </div>

                <!-- Table Container -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 text-white">
                                    <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Servicio</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Precio</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Cliente</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="(sale, index) in sales" :key="index"
                                    class="hover:bg-gray-50 transition-colors duration-150">
                                    <td class="px-6 py-4">
                                        <div class="font-semibold text-gray-900">{{ sale.productName }}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-xl font-bold text-gray-900">${{ sale.productPrice }}</div>
                                        <div class="text-xs text-gray-500">por mes</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-600">{{ sale.userEmail }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="sales.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">No hay ventas registradas</h3>
                    <p class="text-gray-600">Aún no se han realizado ventas en la plataforma.</p>
                </div>
            </div>
        </div>
    </div>
</template>