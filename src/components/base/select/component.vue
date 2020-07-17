<template>
    <div
        :class="show_context !== false ? 'selectric-open' : '' + added_class"
        class="selectric-wrapper selectric-select"
        @mouseleave="showContext"
    >
        <div class="selectric-hide-select">
            <select
                v-model="value"
                class="select"
                :class="classes"
                :placeholder="sel_data[0].title"
            >
                <option
                    v-for="(item, index) in sel_data"
                    :key="index"
                    :data-hint="item.title || ''"
                    :value="item.value"
                    @change="$emit('change', item.value)"
                >
                    {{ item.title }}
                </option>
            </select>
        </div>
        <div
            class="selectric"
            @click="showContext(show_context)"
            @mouseover="onSelectHover"
            @mouseout="onSelectLeave"
        >
            <span class="label">
                {{ set_label }}
            </span>
            <b class="button">
                <span />
            </b>
        </div>
        <div
            class="selectric-items"
            tabindex="-1"
        >
            <div class="selectric-scroll">
                <ul>
                    <li
                        v-for="(item, index) in sel_data"
                        :key="index"
                        :data-hint="item.title || ''"
                        :value="item.value"
                        @click="setValue(item)"
                    >
                        {{ item.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Select',
        props: {
            sel_data: {
                type: Array,
                default: null,
            },
        },
        data: () => ({
            classes: '',
            value: '',
            label: '',
            show_context: false,
            on_hover: false,
            added_class: '',
        }),
        computed: {
            set_label() {
                return this.label === '' ? this.sel_data[0].title : this.label;
            },
        },
        methods: {
            setValue(val) {
                this.value = val.value;
                this.label = val.title;
                this.$emit('change', val.value);
                this.show_context = false;
            },

            showContext(value) {
                this.show_context = !value;
            },

            onSelectHover() {
                this.on_hover = !this.on_hover;
                this.added_class = 'selectric-hover';
            },

            onSelectLeave() {
                this.added_class = '';
            },
        },
    };
</script>

<style lang="scss">
    @import 'style';
</style>
