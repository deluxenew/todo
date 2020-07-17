<template>
    <div ref="block" class="modal-block">
        <transition name="modal">
            <template v-if="value">
                <div class="modal">
                    <div class="modal__dialog" role="document">
                        <div class="modal__content js-modal-block">
                            <button
                                type="button"
                                class="modal__close modal-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="close"
                            >
                                <p-close class="modal-close__icon modal-close__icon_big" />
                            </button>

                            <div v-if="title" class="modal__header">
                                <p class="modal__title">
                                    {{ title }}
                                </p>
                            </div>

                            <div class="modal__body">
                                <slot />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </transition>
    </div>
</template>

<script type="text/javascript">

    export default {
        name: 'Modal',
        components: {
            'p-close': () => import('../../../assets/img/svg/close.svg'),
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            close_by_background: {
                type: Boolean,
                default: false,
            },
        },
        //события
        mounted() {
            //закрытие по esc
            window.addEventListener('keydown', this.handleKeydown, false);
            window.addEventListener('mousedown', this.handleClick);
        },
        //удаление событий
        destroyed() {
            window.removeEventListener('keydown', this.handleKeydown);
            window.removeEventListener('mousedown', this.handleClick);
        },
        methods: {
            close() {
                this.$emit('input', false);
            },
            //закрываем выпадашку если клик во вне
            handleClick(e) {
                if (this.close_by_background && this.value) {
                    const is_inner = e.target.closest('.js-modal-block');

                    if (!is_inner) {
                        this.close();
                    }
                }
            },
            //закрытие по esc
            handleKeydown(e) {
                if (['Escape'].includes(e.key)) {
                    this.close();
                }
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
