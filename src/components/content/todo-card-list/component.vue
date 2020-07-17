<template>
    <div class="group">
        <div class="group__head">
            <div class="group__head_name">
                <slot name="head" />
            </div>
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
    };
</script>

<style lang="scss">
    @import 'style';
</style>
