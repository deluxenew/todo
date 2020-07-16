<template>
    <ui-popup-dropdown-block
        ref="list"
        v-model="is_open"
        class="dropdown-list"
        :sender="sender"
        :is_wide="is_wide"
    >
        <template v-if="is_action" #header>
            <div class="dropdown-list__action">
                <input
                    ref="filter"
                    v-model="filter"
                    autocomplete="off"
                    class="input-text"
                    placeholder="Фильтровать"
                    type="text"
                >
            </div>
        </template>

        <template>
            <div
                v-for="(option, key) in list"
                :key="option.id || `key_${key}`"
                :class="optionClass(option)"
                role="button"
                @click="itemSelect(option)"
            >
                <slot :option="option" name="option">
                    {{ option.name }}
                    <span class="hint hint_row" v-html="option.hint || ''" />
                </slot>
            </div>
        </template>
    </ui-popup-dropdown-block>
</template>

<script type="text/javascript">
    export default {
        name: 'DropdownList',
        components: {
            'ui-popup-dropdown-block': () => import('@ui/popup/dropdown-block/component'),
        },
        props: {
            //установленное значение списка
            value: {
                type: Boolean,
                default: false,
            },
            //блок, для которого выпадающий список
            sender: {
                default: null,
            },
            //выбранный пункт списка клавишами (стрелками)
            selected: {
                type: [Number, String],
                required: true,
            },
            //список вариантов выбора
            list: {
                type: Array,
                default: () => [],
            },
            //раскрывается на всю ширину родителя
            is_wide: {
                type: Boolean,
                default: false,
            },
            //отображается блок фильтрации
            is_action: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                is_open: false,
                filter: '',
            };
        },
        watch: {
            value(is_open) {
                if (this.is_open !== is_open) {
                    this.$set(this, 'is_open', is_open);
                }
            },
            is_open(value) {
                if (value) {
                    if (this.$refs.filter) {
                        setTimeout(() => {
                            this.$refs.filter.focus();
                        }, 100);
                    }
                } else {
                    this.sender.focus();
                }

                if (this.value !== value) {
                    this.$emit('input', value);
                }
            },
            filter(text) {
                this.$emit('filter', text);
            },
        },
        created() {
            this.$set(this, 'is_open', this.value);
        },
        mounted() {
            window.addEventListener('keydown', this.handleKeydown, false);
        },
        //удаление событий
        destroyed() {
            window.removeEventListener('keydown', this.handleKeydown);
        },
        methods: {
            optionClass(item) {
                const list = ['dropdown-list__item'];

                if (item.id === this.selected) {
                    list.push('dropdown-list__item_active');
                }

                if (item.block) {
                    list.push('dropdown-list__item_block');
                }

                return list.join(' ');
            },
            //выбираем пункт из списка
            itemSelect(item) {
                this.$emit('change', item);
            },
            itemSet(item) {
                this.$emit('set', item);
            },
            //ловим нажатие клавиш
            handleKeydown(e) {
                if (!this.is_open || !this.list || this.list.length < 1) {
                    return null;
                }

                //нет выбранного пункта, выбираем первый
                if (['ArrowUp', 'ArrowDown'].includes(e.key) && !this.selected) {
                    e.preventDefault();
                    this.selectFirst();

                //выбираем предыдущий
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.selectPrev();
                    this.scrollSelectedIntoView();

                //выбираем следующий
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.selectNext();
                    this.scrollSelectedIntoView();

                //закрываем выпадающий список без отправки формы, с сохранением фокуса
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.$emit('keyEnter');
                }
            },
            //выбираем первый элемент отображаемого списка
            selectFirst() {
                this.itemSet(this.list[0]);
            },
            //выбираем предыдущией элемент отображаемого списка
            selectPrev() {
                const index = this.list.findIndex((t) => t.id === this.selected);

                if (index < 1) {
                    return null;
                }

                this.itemSet(this.list[index - 1]);
            },
            //выбираем следующий элемент отображаемого списка
            selectNext() {
                const index = this.list.findIndex((t) => t.id === this.selected);

                if (index < 0 || index > this.list.length - 2) {
                    return null;
                }

                this.itemSet(this.list[index + 1]);
            },
            //прокручиваем выбранный элемент в область видимости
            scrollSelectedIntoView() {
                setTimeout(() => {
                    const block = this.$refs.list.$el;
                    const parent = block.querySelector('.dropdown-block__inner');
                    const active = parent.querySelector('.dropdown-list__item_active');

                    if (!parent || !active) {
                        return null;
                    }

                    const parent_rect = parent.getBoundingClientRect();
                    const active_rect = active.getBoundingClientRect();
                    const is_up = active_rect.top < parent_rect.top;
                    const is_down = active_rect.top + active_rect.height > parent_rect.top + parent_rect.height;

                    if (is_up || is_down) {
                        parent.scrollTo(0, parent.scrollTop + (active_rect.top - parent_rect.top) + 1);
                    }
                }, 10);
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
