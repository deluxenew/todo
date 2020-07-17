<template>
    <div class="header">
        <div class="header__name">
            <h1>
                ToDo
            </h1>
            <div class="todo-head__buttons">
                <div class="todo-head__buttons_item">
                    <slot name="addgroup" />
                </div>
            </div>
        </div>
        <div class="header__filter">
            <div class="header__filter_text">
                Поиск карточки по введенному выражению
                <slot name="text" />
            </div>
            <div class="header__filter_select">
                Фильтрация карточек по статусу выполнения
                <slot name="select" />
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'Header',
    };
</script>

<style lang="scss">
    @import 'style';
</style>
