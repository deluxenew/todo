<template>
    <div id="app">
        <div class="container">
            <div class="todo-head">
                <div class="todo-head__name">
                    <h1>
                        ToDo
                    </h1>
                </div>
                <div class="todo-head__filter">
                    <p-base-text
                        v-model="filter"
                        :placeholder="'Фильтр-поиск'"
                    />
                </div>
                <div class="todo-head__filter">
                    <p-base-select
                        :sel_data="complete"
                        @change="filterOnComplete"
                    />
                </div>
                <div class="todo-head__buttons">
                    <div class="todo-head__buttons_item">
                        <p-base-button
                            :classes="'btn btn_filled-blue'"
                            @click="new_group = true, modal = true"
                        >
                            Добавить новую группу
                        </p-base-button>
                    </div>
                </div>
            </div>
            <p-content-todo-card-list
                v-for="group in groups"
                :key="group.group_id"
                :id="group.group_id"
            >
                <template v-slot:head>
                    <div
                        class="group__head_name"
                    >
                        {{ group.name }}
                    </div>
                </template>

                <template v-slot:buttons>
                    <div
                        class="group__head_buttons-item"
                    >
                        <p-base-button
                            :classes="'btn btn_filled-blue'"
                            @click="new_card = true, modal = true, current_group = group.group_id"
                        >
                            Добавить карточку
                        </p-base-button>
                    </div>
                    <div class="group__head_buttons-item">
                        <p-base-button
                            :classes="'btn btn_filled'"
                            @click="deleteGroup(group.group_id)"
                        >
                            Удалить группу
                        </p-base-button>
                    </div>
                </template>

                <div
                    class="group__main"
                    :style="`background-color: ${background};`"
                    @dragover="onDragover"
                    @drop="onDragleave"
                >
                    <drop
                        class="list"
                        @drop="handleDrop(group.cards, ...arguments)"
                    >
                        <drag
                            v-for="(item, index) in sel_filter !== null ? group.cards
                                .filter((el) => (el.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
                                .filter((el) => (el.status === sel_filter))
                                : group.cards
                                    .filter((el) => (el.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0))"
                            :key="index"
                            class="drag"
                            :transfer-data="{ item: item, list: group.cards }"
                        >
                            <p-content-todo-card-item
                                :id="item.card_id"
                                :name="item.name"
                                :text="item.text"
                                :status="item.status"
                            >
                                <template v-slot:buttons>
                                    <div class="card__footer_buttons-item">
                                        <p-base-button
                                            :classes="'btn btn_filled-blue'"
                                            @click="item.status = !item.status"
                                        >
                                            {{ item.status ? 'Вернуть в работу' : 'Завершить' }}
                                        </p-base-button>
                                    </div>
                                    <div class="card__footer_buttons-item">
                                        <p-base-button :classes="'btn btn_filled-blue'">
                                            развернуть/скрыть
                                        </p-base-button>
                                    </div>
                                    <div class="card__footer_buttons-item">
                                        <p-base-button
                                            :classes="'btn btn_filled-blue'"
                                            @click="deleteCard(group.group_id, index)"
                                        >
                                            Удалить
                                        </p-base-button>
                                    </div>
                                </template>
                            </p-content-todo-card-item>
                        </drag>
                    </drop>
                </div>
            </p-content-todo-card-list>
            <div class="todo-foo">
                Харчиков Александр, 2020
            </div>
            <p-popup-modal
                v-model="modal"
                @input="onClose"
            >
                <div
                    v-if="new_group"
                    class="new_group"
                >
                    Введите название новой группы
                    <p-base-text
                        v-model="group_name"
                    />
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="addNewGroup"
                    >
                        Добавить
                    </p-base-button>
                </div>
                <div
                    v-else-if="new_card"
                    class="new_card"
                >
                    Введите название новой карточки
                    <p-base-text
                        v-model="card_name"
                    />
                    Введите описание новой карточки
                    <p-base-text
                        v-model="card_text"
                    />
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="addNewCard"
                    >
                        Добавить
                    </p-base-button>
                </div>
                <div
                    v-else-if="confirm"
                    class="comfirm"
                >
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                    >
                        ДА
                    </p-base-button>
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                    >
                        НЕТ
                    </p-base-button>
                </div>

            </p-popup-modal>
        </div>
    </div>
</template>

<script>
    import { Drag, Drop } from 'vue-drag-drop';

    export default {
        name: 'App',
        components: {
            'p-content-todo-card-list': () => import('@c/todo-card-list/component'),
            'p-content-todo-card-item': () => import('@c/todo-card-item/component'),
            'p-base-button': () => import('@b/button/component'),
            'p-base-select': () => import('@b/select/component'),
            'p-base-text': () => import('@b/text/component'),
            'p-popup-modal': () => import('@p/modal/component'),
            Drag,
            Drop,
        },
        data: () => ({
            groups: [
                {
                    group_id: 0,
                    name: 'по работе',
                    cards: [
                        {
                            card_id: 0, name: 'Задача 1', text: 'Сделать задачу надо.', status: false,
                        },
                        {
                            card_id: 1, name: 'Задача 2', text: 'Сделать задачу тоже надо.', status: false,
                        },
                        {
                            card_id: 2,
                            name: 'Задача 3',
                            text: 'Сделать задачу тоже надо, нужно прямо быстро сделать...',
                            status: false,
                        },
                    ],
                },
            ],
            complete: [
                { value: null, title: 'Не выбрано' },
                { value: true, title: 'Выполнено' },
                { value: false, title: 'В работе' },
            ],
            filter: '',
            sel_filter: null,
            current_group: 0,
            modal: false,
            new_group: false,
            new_card: false,
            confirm: false,
            group_name: '',
            card_name: '',
            card_text: '',
            background: '',
        }),
        computed: {

        },
        methods: {
            onClose(val) {
                this.new_group = val;
                this.new_card = val;
                this.confirm = val;
            },

            addNewGroup() {
                this.groups.push({
                    group_id: this.groups.length,
                    name: this.group_name,
                    cards: [],
                });
            },

            addNewCard() {
                const current = this.current_group;
                this.groups[current].cards.push({
                    card_id: this.groups[current].cards.length,
                    name: this.card_name,
                    text: this.card_text,
                    status: false,
                });
            },

            deleteGroup(val) {
                this.groups.splice(val, 1);
            },

            deleteCard(group_id, val) {
                console.log(group_id);
                this.groups[group_id].cards.splice(val, 1);
            },

            filterOnComplete(val) {
                this.sel_filter = val;
            },

            handleDrop(toList, data) {
                const fromList = data.list;
                if (fromList) {
                    toList.push(data.item);
                    fromList.splice(fromList.indexOf(data.item), 1);
                    toList.sort((a, b) => a > b);
                }
            },
            onDragover() {
                this.background = 'gray';
            },
            onDragleave() {
                this.background = 'white';
            },
        },
    };
</script>

<style lang="scss">
    @import 'assets/css/app';
</style>
