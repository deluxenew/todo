<template>
    <div class="card" :style="collapse ? 'max-height: 100%;' : 'max-height: 200px;'">
        <div class="card__header">
            <div class="card__header_title">
                {{ name }}
            </div>
            <div class="card__header_status" :style="status ? 'background-color: green;' : ''">
                {{ status ? 'Выполнено' : 'В работе' }}
            </div>
        </div>
        <div
            class="card__main"
            :style="collapse ? 'max-height: 100%;' : 'max-height: 100px;'"
        >
            {{ text }}
        </div>
        <div class="card__footer">
            <div class="card__footer_buttons">
                <slot name="buttons"/>
                <div class="card__footer_buttons-item">
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="collapse = !collapse"
                    >
                        развернуть/скрыть
                    </p-base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardItem',
        components: {
            'p-base-button': () => import('@b/button/component'),
        },
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
        data: () => ({
            collapse: false,
        }),
    };
</script>

<style lang="scss">
    @import 'style';
</style>
