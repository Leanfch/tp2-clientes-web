<script>
import LoaderCircle from './LoaderCircle.vue';

export default {
    name: 'BaseButton',
    components: { LoaderCircle },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<template>
    <button
        class="p-3 font-bold text-white uppercase disabled:bg-slate-500 rounded-md text-blanco transition-colors bg-red-600 mx-auto hover:bg-red-700 active:bg-red-950"
        type="submit" :disabled="loading">
        <template v-if="!loading">
            <slot>Enviar</slot>
        </template>
        <template v-else>
            <LoaderCircle />
        </template>
    </button>
</template>