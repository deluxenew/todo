<template>
    <button
        :class="classes"
        :type="type"
        :modal="modal"
        name="button"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            classes: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'button',
            },
            modal: {
                type: String,
                default: '',
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
