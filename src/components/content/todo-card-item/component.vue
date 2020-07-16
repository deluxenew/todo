<template>
    <div class="card">
        <div class="card__header">
            <div class="card__header_title">
                {{ name }}
            </div>
            <div class="card__header_status">
                {{ status ? 'Выполнено' : 'В работе'}}
            </div>
        </div>
        <div
            class="card__main"
        >
            {{ text }}
        </div>
        <div class="card__footer">
            <div class="card__footer_buttons">
                <slot name="buttons" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardItem',
        props: {
            name: {
                type: String,
                default: '',
            },
            text: {
                type: String,
                default: '',
            },
            status: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
