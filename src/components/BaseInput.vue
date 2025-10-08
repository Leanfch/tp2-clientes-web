<script>
export default {
    name: 'BaseInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <input autocomplete="off"
        class="border-b-blanco font-bold border-t-verdoso border-e-verdoso border-s-verdoso border-2 bg-[#d6d6d6] my-1 p-4 disabled:bg-slate-400 disabled:cursor-wait placeholder-black"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<style scoped>

input::placeholder {
    color: rgb(114, 114, 114);
    font-weight: 400;
}

</style>