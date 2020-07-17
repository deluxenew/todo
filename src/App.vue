<template>
    <div id="app">
        <div class="container">
            <p-content-header>
                <template v-slot:text>
                    <p-base-text
                        v-model.trim="filter"
                        :placeholder="'Фильтр-поиск'"
                    />
                </template>

                <template v-slot:select>
                    <p-base-select
                        :sel_data="complete"
                        @change="filterOnComplete"
                    />
                </template>

                <template v-slot:addgroup>
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="new_group = true,
                                modal = true,
                                modal_title = 'Добавить новую группу'"
                    >
                        Добавить новую группу
                    </p-base-button>
                </template>
            </p-content-header>

            <p-content-todo-card-list
                v-for="group in groups"
                :id="group.group_id"
                :key="group.group_id"
            >
                <template v-slot:head>
                    {{ group.name }}
                </template>

                <template v-slot:buttons>
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="new_card = true,
                                modal = true,
                                current_group = group.group_id,
                                modal_title = 'Добавить новую карточку'"
                    >
                        Добавить карточку
                    </p-base-button>

                    <p-base-button
                        :classes="'btn btn_filled'"
                        @click="deleteGroup(),
                                current_group = group.group_id,
                                modal_title = `Удалить группу  ${group.name}?`"
                    >
                        Удалить группу
                    </p-base-button>
                </template>

                <div
                    class="group__main"
                    :style="`background-color: ${background};`"
                    @dragover="onDragover"
                    @dragend="onDragleave"
                    @drop="onDragleave"
                >
                    <drop
                        class="list"
                        @drop="handleDrop(group.cards, ...arguments)"
                    >
                        <drag
                            v-for="(item, index) in elementsOfGroup(group)"
                            :key="index"
                            class="drag"
                            :transfer-data="{ item, list: group.cards }"
                        >
                            <p-content-todo-card-item
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
                                        <p-base-button
                                            :classes="'btn btn_filled'"
                                            @click="deleteCard(),
                                                    current_group = group.group_id,
                                                    current_card = index,
                                                    modal_title = `Удалить карточку ${item.name}?`"
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

            <p-content-footer>
                Могу сделать не на слотах, а используя вложенность компонентов, передавая данные через пропсы от
                родителей к детям и прокидывая данные через $emit от детей к родителям. Слоты,
                на мой взгляд, лучше подходят для решения этой задачи.
            </p-content-footer>

            <p-popup-modal
                v-model="modal"
                :title="modal_title"
                :close_by_background="true"
                @input="onClose"
            >
                <div v-if="new_group">
                    Введите название новой группы
                    <p-base-text
                        v-model.trim="group_name"
                        :placeholder="'Введите название *'"
                    />
                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        :disabled="group_name === ''"
                        @click="addNewGroup"
                    >
                        Добавить
                    </p-base-button>
                </div>

                <div v-else-if="new_card">
                    Введите название новой карточки
                    <p-base-text
                        v-model.trim="card_name"
                        :placeholder="'Введите название *'"
                    />

                    Введите описание новой карточки
                    <p-base-textarea
                        v-model="card_text"
                        :placeholder="'Введите описание'"
                    />

                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        :disabled="card_name === ''"
                        @click="addNewCard"
                    >
                        Добавить
                    </p-base-button>
                </div>

                <div v-else-if="confirm_group_delete">
                    <p-base-button
                        :classes="'btn btn_filled'"
                        @click="confirmAction"
                    >
                        ДА
                    </p-base-button>

                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="cancelAction"
                    >
                        НЕТ
                    </p-base-button>
                </div>

                <div v-else-if="confirm_card_delete">
                    <p-base-button
                        :classes="'btn btn_filled'"
                        @click="confirmAction"
                    >
                        ДА
                    </p-base-button>

                    <p-base-button
                        :classes="'btn btn_filled-blue'"
                        @click="cancelAction"
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
            'p-content-header': () => import('@c/header/component'),
            'p-content-footer': () => import('@c/footer/component'),
            'p-content-todo-card-list': () => import('@c/todo-card-list/component'),
            'p-content-todo-card-item': () => import('@c/todo-card-item/component'),
            'p-base-button': () => import('@b/button/component'),
            'p-base-select': () => import('@b/select/component'),
            'p-base-text': () => import('@b/text/component'),
            'p-base-textarea': () => import('@b/textarea/component'),
            'p-popup-modal': () => import('@p/modal/component'),
            Drag,
            Drop,
        },
        data: () => ({
            groups: [
                {
                    group_id: 0,
                    name: 'По работе',
                    cards: [
                        {
                            card_id: 0,
                            name: '1. Создать группу',
                            text: 'Создать новую группу "На выходных"',
                            status: false,
                        },
                        {
                            card_id: 1,
                            name: '2. Создать карточку',
                            text: 'Создать в группе "На выходных" карточку "Прогуляться" с описанием "Сходить в парк"',
                            status: false,
                        },
                        {
                            card_id: 2,
                            name: '3. Перетащить карточку',
                            text: 'Перетащить\n карточку\n "Прогуляться"\n в группу\n "По работе"',
                            status: false,
                        },
                        {
                            card_id: 3,
                            name: '4. Уалить карточку "Прогуляться"',
                            text: 'Мы на работе не по парку гуляем, а работаем...',
                            status: false,
                        },
                        {
                            card_id: 4,
                            name: '5. Уалить группу "На выходных"',
                            text: 'С сегодняшнего дня работаем без выходных... :-)',
                            status: false,
                        },
                    ],
                },
            ],
            complete: [
                { value: null, title: 'Не выбрано' },
                { value: true, title: 'Сделано' },
                { value: false, title: 'Не сделано' },
            ],
            filter: '',
            sel_filter: null,
            current_group: 0,
            current_card: 0,
            modal_title: '',
            modal: false,
            new_group: false,
            new_card: false,
            confirm_group_delete: false,
            confirm_card_delete: false,
            group_name: '',
            card_name: '',
            card_text: '',
            background: '',
        }),
        methods: {
            elementsOfGroup(val) {
                return this.sel_filter !== null ? val.cards
                    .filter((el) => (el.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0))
                    .filter((el) => (el.status === this.sel_filter)) : val.cards
                        .filter((el) => (el.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0));
            },

            onClose(val) {
                this.modal = val;
                this.new_group = val;
                this.new_card = val;
                this.confirm_group_delete = val;
                this.confirm_card_delete = val;
                this.group_name = '';
                this.card_name = '';
                this.card_text = '';
            },

            addNewGroup() {
                this.groups.push({
                    group_id: this.groups.length,
                    name: this.group_name,
                    cards: [],
                });
                this.group_name = '';
            },

            addNewCard() {
                const current = this.current_group;

                this.groups[current].cards.push({
                    card_id: this.groups[current].cards.length,
                    name: this.card_name,
                    text: this.card_text,
                    status: false,
                });

                this.card_name = '';
                this.card_text = '';
            },

            cancelAction() {
                this.onClose(false);
            },

            confirmAction() {
                if (this.confirm_group_delete) {
                    this.groups.splice(this.current_group, 1);
                } else if (this.confirm_card_delete) {
                    this.groups[this.current_group].cards.splice(this.current_card, 1);
                }

                this.onClose(false);
            },

            deleteGroup() {
                this.modal = true;
                this.confirm_group_delete = true;
            },

            deleteCard() {
                this.modal = true;
                this.confirm_card_delete = true;
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
                this.background = '#27ae60';
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
