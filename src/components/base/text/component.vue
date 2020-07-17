<template>
    <div>
        <input
            class="input"
            :class="classes"
            :placeholder="placeholder"
            :type="type"
            :value="value"
            @input="set"
            @focus="focus"
        >
        <slot />
    </div>
</template>

<script>

    export default {
        name: 'InputText',
        components: {

        },
        props: {
            value: {
                type: [Number, String],
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
        },
        computed: {
            classes() {
                const current = ['input-text'];
                return current;
            },
        },
        methods: {
            set(e) {
                const value = e.target.value || '';
                this.$emit('input', value.toString());
            },

            focus(e) {
                this.$emit('focus', e);
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
