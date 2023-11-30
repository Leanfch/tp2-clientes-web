<script>
export default {
    name: 'BaseTextArea',

    props: ['modelValue'],
    emit: ['updateModelValue']
}
</script>

<template>
    <textarea class="border-4 p-6 bg-slate-200" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>