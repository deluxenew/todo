<template>
    <div ref="block" :class="classes">
        <div ref="header" class="dropdown-block__header">
            <slot name="header" />
        </div>

        <div ref="inner" class="dropdown-block__inner">
            <slot />
        </div>

        <div ref="footer" class="dropdown-block__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        name: 'DropdownBlock',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            sender: {
                default: null,
            },
            is_wide: {
                type: Boolean,
                default: false,
            },
            close_by_tab: {
                type: Boolean,
                default: true,
            },
            close_by_esc: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            classes() {
                const current = ['dropdown-block'];

                if (this.value) {
                    current.push('dropdown-block_open');
                }

                return current;
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
