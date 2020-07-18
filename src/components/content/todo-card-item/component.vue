<template>
    <div class="card" :style="collapse ? 'max-height: 100%;' : 'max-height: 200px;'">
        <div class="card__header">
            <div class="card__header_title">
                {{ name }}
            </div>
            <div :class="status ? 'card__header_status-ok' : 'card__header_status-not'">
                {{ status ? 'Сделано' : 'Не сделано' }}
            </div>
        </div>
        <div
            :id="`id${id}`"
            class="card__main"
            :style="collapse ? 'max-height: 100%;' : 'max-height: 100px;'"
        >
            {{ text }}
        </div>
        <div class="card__footer">
            <div class="card__footer_buttons">
                <slot name="buttons" />
                <div class="card__footer_buttons-item">
                    <p-base-button
                        v-if="offset_height"
                        :classes="'btn btn_filled-blue'"
                        @click="collapse = !collapse"
                    >
                        {{ collapse ? 'Скрыть' : 'Развернуть' }}
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
            id: {
                type: Number,
                default: 0,
            },
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
            offset_height: false,
        }),
        mounted() {
            const elmnt = document.getElementById(`id${this.id}`);
            this.offset_height = elmnt.offsetHeight < elmnt.scrollHeight;
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
