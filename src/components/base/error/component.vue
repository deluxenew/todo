<template>
    <div v-if="is_error" class="form-error">
        <div
            v-for="(options, name) in list"
            :key="name"
            class="form-error__item"
        >
            {{ $t(`form.error.${name}`, options ) }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormError',
        props: {
            validate: {
                type: Object,
                default: () => {
                },
            },
        },
        computed: {
            is_error() {
                return this.validate && this.validate.$error;
            },
            list() {
                const result = {};

                Object.keys(this.validate.$params)
                    .map((key) => {
                        if (!this.validate[key]) {
                            result[key] = this.validate.$params[key];
                        }
                    });
                return result;
            },
        },
    };
</script>

<style lang="scss">
    @import "style";
</style>
