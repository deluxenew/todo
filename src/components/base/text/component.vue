<template>
    <div>
        <input
            class="input"
            :autocomplete="is_autocomplete"
            :autofocus="autofocus"
            :readonly="readonly"
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
            validate: {
                type: Object,
                default: () => {},
            },
            placeholder: {
                type: String,
                default: '',
            },
            autofocus: {
                type: Boolean,
                default: false,
            },
            autocomplete: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            is_autocomplete() {
                return this.autocomplete ? 'on' : 'off';
            },
            classes() {
                const current = ['input-text'];

                if (this.validate && this.validate.$error) {
                    current.push('input-text_error');
                    current.push('has-error');
                }

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
