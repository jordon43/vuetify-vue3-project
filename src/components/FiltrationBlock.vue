<template>
    <div class="filteredBlock">
        <p class="filteredBlockText">Фильтр</p>
        <v-row class="firstGroup">
            <v-col>
                <label class="textFilterParams">Гражданство</label>
                <v-select
                    variant="solo-filled"
                    hide-details=true
                    class="select"
                    v-model="filterParams.county"
                    :items="[{id: null, title: 'Все страны'}, ...entities.county]"
                    return-object
                ></v-select>
            </v-col>
            <v-col>
                <label class="textFilterParams">Пол</label>
                <v-select
                    variant="solo-filled"
                    class="select"
                    hide-details=true
                    item-icon="mdi-magnify"
                    v-model="filterParams.gender"
                    :items="[{id: null, title: 'Без разницы'}, ...entities.gender]"
                    return-object
                ></v-select>
            </v-col>
        </v-row>

        <v-row class="secondGroup">
            <v-col>
                <label class="textFilterParams">Должность</label>
                <v-select
                    variant="solo-filled"
                    class="select"
                    hide-details=true
                    v-model="filterParams.position"
                    :item-props="(item) => {return {title: item.name}}"
                    :items="[{id: null, name: 'Все должности'}, ...entities.position]"
                    return-object
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <div class="checkboxBlock">
                    <label class="textFilterParams">Тип договора</label>
                    <v-checkbox
                        class="checkbox-item"
                        hide-details=true
                        v-for="contact in entities.type_contact"
                        :label="contact.slug"
                        :key="contact.id"
                        @change="(e)=>{
                            let index = filterParams.ids_type_contract.indexOf(contact);
                            index === -1
                            ? filterParams.ids_type_contract.push(contact)
                            : filterParams.ids_type_contract.splice(index, 1)
                      }"
                    ></v-checkbox>
                </div>

            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-btn class="btnApplyFiltered"
                    @click="() => {
                        $emit('applyFiltered', filterParams)
                    }"
                >
                <span>Применить</span>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn class="btnResetFilters"
                    @click="resetFilters"
                >
                <span>Очистить</span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>

import { ref} from 'vue';
import entities from "@/entities"

defineProps({
    filterParams:{
        type: Object
    }
})

const filterParams = ref({
    gender: {id: null, title: 'Без разницы'},
    county: {id: null, title: 'Все страны'},
    position: {id: null, name: 'Все должности'},
    ids_type_contract: []
})

const resetFilters = () => {
    emits('resetFilters')
    filterParams.value = {
        gender: {id: null, title: 'Без разницы'},
        county: {id: null, title: 'Все страны'},
        position: {id: null, name: 'Все должности'},
        ids_type_contract: [],
        ids_tag: []
    };

}
const emits = defineEmits(['applyFiltered', 'resetFilters']);

</script>

<style lang="sass">

@font-face
    font-family: Montserrat-Regular
    src: url("../assets/fonts/Montserrat-Regular.ttf")

.select .v-input__control, .v-field
    border-radius: 4px !important
    border: none !important
    background-color: #E8F1F4 !important
    box-shadow: none !important
    .v-select__selection-text
        font-family: Montserrat-Regular
        font-size: 15px
    .v-input__slot::after
        border-radius: 4px !important
        border: none !important
        background-color: #E8F1F4 !important
        box-shadow: none !important
        border-bottom: none
    input
        height: 46px
    .v-input--selection-controls__input
        border-bottom: none

.filteredBlock
    border-top: #DBE4ED 1px solid
    padding: 30px
    .textFilterParams
        display: block
        padding-bottom: 10px
        font-size: 15px
        color: #041423
        font-family: Montserrat-Medium
    .filteredBlockText
        font-family: Montserrat-SemiBold
        font-size: 26px
        padding-bottom: 10px
    input
        span
            font-family: Montserrat-Regular
            border-radius: 4px
            background-color: #E8F1F4
            font-size: 15px
            color: #84909B



    .btnApplyFiltered, .btnResetFilters
        letter-spacing: inherit
        width: 100%
        height: 46px
        font-size: 15px
        box-shadow: none
        color: white
        text-transform: lowercase
        font-family: Montserrat-Medium
    .btnApplyFiltered
        background-color: #00AE5B
    .btnApplyFiltered
        span::first-letter
            text-transform: uppercase
    .btnResetFilters
        background-color: #84909B
    .btnResetFilters
        span::first-letter
            text-transform: uppercase


    .checkboxBlock
        border-bottom: #DBE4ED solid 1px
        padding-bottom: 10px
.checkbox-item
    padding-bottom: 10px

    .v-input__control
        font-family: Montserrat-Regular
        height: 20px
        width: 100%
        padding: 0
        margin: 0
        font-size: 15px
        .v-selection-control
            min-height: 20px
            .mdi-checkbox-blank-outline
                height: 20px
                width: 20px
                min-width: 20px
                border-radius: 4px
                border: #DCDCDC 1px solid
            .mdi-checkbox-blank-outline::before
                display: none
    label
        color: #041423

</style>
