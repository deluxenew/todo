<template>
    <button
        :class="classes"
        :type="type"
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
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
