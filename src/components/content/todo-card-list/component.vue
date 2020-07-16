<template>
    <div class="group">
        <div class="group__head">
            <slot name="head" />
            <div class="group__head_buttons">
                <slot name="buttons" />
            </div>
        </div>
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'CardList',
        data: () => ({

        }),
        props: {
            id: {
                type: Number,
                default: 0,
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
