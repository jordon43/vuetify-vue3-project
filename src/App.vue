<template>
    <v-app class="app">
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-main class="main">
                        <div class="searchBlock">
                            <v-text-field
                                height="46px"
                                class="searchInput"
                                v-model="search"
                                label="Поиск сотрудника"
                                append-inner-icon="mdi-magnify"
                                variant="outlined"
                                hide-details
                                single-line
                            ></v-text-field>
                            <p class="helpText">Например: Иванов Иван</p>
                        </div>
                        <p class="textListWorkers">Список сотрудников</p>
                        <ButtonsGroup
                            :ids_tag = "selectedTagFiltration"
                            :staff_tag="entities.staff_tag"
                            @selectedAllList="selectedTagFiltration.splice(0, selectedTagFiltration.length)"
                            @changeFilterParams="(btn)=>{
                                let index = selectedTagFiltration.indexOf(btn);
                                index === -1 ?
                                selectedTagFiltration.push(btn) :
                                selectedTagFiltration.splice(index, 1)
                            }"
                        >
                        </ButtonsGroup>

                        <ListWorkers
                            :filteredWorkers="filteredWorkersComputed.slice(0, maxVisibleWorkers)">
                        </ListWorkers>

                        <div class="blockUpdateList">
                            <v-btn
                                class="btnUpdateList"
                                v-if="isFiltered || selectedTagFiltration.length !==0
                                ? maxVisibleWorkers < lengthFilteredWorkers
                                : maxVisibleWorkers < store.workers.length"
                                @click="maxVisibleWorkers += 4"
                            ><v-icon left>mdi-update</v-icon>
                              Показать ещё</v-btn>
                        </div>
                    </v-main>
                </v-col>

                <v-col class="ml-auto" cols="12" md="4">
                    <div class="rightBlock">
                        <DialogNewWorker
                            @addUser="addUser"
                        >
                        </DialogNewWorker>
                        <FiltrationBlock
                            @applyFiltered = "filteredWorkersStatic"
                            @resetFilters = "isFiltered = false"
                        ></FiltrationBlock>
                    </div>
                </v-col>

            </v-row>
        </v-container>
    </v-app>
</template>

<script setup>
import { useStore } from './stores/store';
import { ref, computed } from 'vue';

import ListWorkers from '@/components/ListWorkers.vue'
import ButtonsGroup from '@/components/ButtonsGroup.vue'
import FiltrationBlock from '@/components/FiltrationBlock.vue'
import DialogNewWorker from '@/components/DialogNewWorker'

import entities from "@/entities"

const store = useStore()
const search = ref('');
const isFiltered = ref(false)
const filteredWorkers = ref([])
const maxVisibleWorkers = ref(4)
const dialog = ref(false);
const selectedTagFiltration = ref([])
const lengthFilteredWorkers = ref(0)


const filteredWorkersStatic = (filterParams) => {
    isFiltered.value = true
    filteredWorkers.value = store.workers
    .filter((worker)=>{
        return filterParams.county.id !== null
        ? worker.county.id === filterParams.county.id
        : true
    })
    .filter((worker)=>{
        return filterParams.gender.id !== null
        ? worker.gender.id === filterParams.gender.id
        : true
    })
    .filter((worker)=>{
        return filterParams.position.id !== null
        ? worker.position.id === filterParams.position.id
        : true
    })
    .filter((worker)=>{
        return filterParams.ids_type_contract.length !== 0
        ? filterParams.ids_type_contract
            .map((item) => item.id)
            .includes(worker.type_contract.id)
        : true
    })
    .filter((worker) => worker.full_name.indexOf(search.value) === 0)
}

const filteredWorkersComputed = computed(() => {
    let dataFiltered = isFiltered.value ? filteredWorkers.value : store.workers
    if (selectedTagFiltration.value.length !== 0) {
        dataFiltered = dataFiltered.filter((worker)=>{
            return selectedTagFiltration.value
                .map((item) => item.id)
                .includes(worker.status.tag.id)
        })
    }
    dataFiltered = dataFiltered
        .filter((worker) => worker.full_name.toLowerCase().indexOf(search.value.toLowerCase()) === 0)
    lengthFilteredWorkers.value = dataFiltered.length
    return dataFiltered
});


function addUser(newUser) {
    newUser.value.type_contact_id = newUser.value.type_contract.id;
    newUser.value.gender_id = newUser.value.gender.id;
    newUser.value.county_id = newUser.value.county.id;
    newUser.value.position_id = newUser.value.position.id;
    newUser.value.status.tag_id = newUser.value.status.tag.id;
    store.addWorker(newUser.value)
}


</script>

<style lang="sass">

@font-face
    font-family: Montserrat-Regular
    src: url("assets/fonts/Montserrat-Regular.ttf")
@font-face
    font-family: Montserrat-SemiBold
    src: url("assets/fonts/Montserrat-SemiBold.ttf")
@font-face
    font-family: Montserrat-Medium
    src: url("assets/fonts/Montserrat-Medium.ttf")

.app
    background-color: #F7F8F9 !important
    .main
        background-color: white
        .searchBlock
            border-bottom: #DBE4ED 1px solid
            padding: 30px 30px
            .v-input
                border-radius: 4px
                border-color: #E0EBEF
                border: none !important

            .v-field__outline__start
                border-right: none
                border-radius: 4px 0 0 4px
                border-color: #E0EBEF
            .v-field__outline__end
                border-left: none
                border-radius: 0 4px 4px 0
                border-color: #E0EBEF
            .searchInput
                background-color: #E8F1F4
                font-family: Montserrat-Regular, serif
                font-size: 15px
                .v-field__input
                    min-height: 46px
            .helpText
                color: #B0BCC7
                font-family: Montserrat-Regular, serif
                padding-top: 10px
                font-size: 13px
                font-weight: lighter

        .textListWorkers
            padding: 30px 30px 0 40px
            font-family: Montserrat-SemiBold, serif
            font-size: 26px
            color: #041423
    .rightBlock
        background-color: white
        border-radius: 10px

.blockUpdateList
    text-align: center
    padding-bottom: 30px
    .btnUpdateList
        text-transform: unset !important
        font-family: Montserrat-Medium, serif
        height: 46px
        border: #2A358C solid 1px
        box-shadow: none
        color: #2A358C
</style>
