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
                            :ids_tag = "ids_tag"
                            :staff_tag="entities.staff_tag"
                            @selectedAllList="ids_tag.splice(0, ids_tag.length)"
                            @changeFilterParams="(btn)=>{
                                let index = ids_tag.indexOf(btn);
                                index === -1 ?
                                ids_tag.push(btn) :
                                ids_tag.splice(index, 1)
                            }"
                        >
                        </ButtonsGroup>

                        <ListWorkers
                            :filteredWorkers="filteredWorkersFunction">
                        </ListWorkers>

                        <div class="blockUpdateList">
                            <v-btn
                                class="btnUpdateList"
                                v-if="maxVisibleWorkres < store.workers.length"
                                @click="maxVisibleWorkres += 4"
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
                            @applyFiltered = "filteredWorkersDemo"
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
const maxVisibleWorkres = ref(4)
const dialog = ref(false);
const ids_tag = ref([])
const filteredWorkersDemo = (filterParams) => {
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

const filteredWorkersFunction = computed(() => {
    let dataFiltered = isFiltered.value ? filteredWorkers.value : store.workers

    if (ids_tag.value.length !== 0) {
        dataFiltered = dataFiltered.filter((worker)=>{
            return ids_tag.value
                .map((item) => item.id)
                .includes(worker.status.tag.id)
        })
    }

    return dataFiltered
        .filter((worker) => worker.full_name.indexOf(search.value) === 0)
        .slice(0, maxVisibleWorkres.value)
});


function addUser(newUser) {
    newUser.value.type_contact_id = newUser.value.type_contract.id;
    newUser.value.gender_id = newUser.value.gender.id;
    newUser.value.county_id = newUser.value.county.id;
    newUser.value.position_id = newUser.value.position.id;
    newUser.value.status.tag_id = newUser.value.status.tag.id;
    store.addWorker(newUser.value)
}


</script>@/entities

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
            border-bottom: black 1px solid
            border-color: #DBE4ED
            padding: 30px 30px
            .v-input
                border-radius: 4px
                border-color: #E0EBEF
                border: none !important

            .v-field__outline__start
                border-radius: 4px
                border-right: none
                border-top-right-radius: 0
                border-bottom-right-radius: 0
                border-color: #E0EBEF
            .v-field__outline__end
                border-left: none
                border-radius: 4px
                border-top-left-radius: 0
                border-bottom-left-radius: 0
                border-color: #E0EBEF
            .searchInput
                background-color: #E8F1F4
                font-family: Montserrat-Regular
                font-size: 15px
                .v-field__input
                    min-height: 46px
            .helpText
                color: #B0BCC7
                font-family: Montserrat-Regular
                padding-top: 10px
                font-size: 13px
                font-weight: lighter

        .textListWorkers
            padding: 30px 30px 0 40px
            font-family: Montserrat-SemiBold
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
        font-family: Montserrat-Medium
        height: 46px
        border: #2A358C solid 1px
        box-shadow: none
        color: #2A358C
</style>
