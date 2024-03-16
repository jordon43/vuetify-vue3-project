
<template>
    <v-list class="listBlock" lines="one">
        <v-list-item
            class="listItem"
            v-for="worker in filteredWorkers"
            :key="worker.id"
        >
            <div class="firstGroup">
                <p class="full_name">{{worker.full_name}}</p>
                <p class="inn">ИНН {{worker.inn}}</p>
                <p class="type_contract">{{worker.type_contract.slug}}</p>
                <p class="position">{{worker.position.name}}</p>
            </div>


            <div class="secondGroup">
                <img
                    class="countyIcon"
                    :src="`/src/assets/image/${worker.county.icon}.png`" alt="none"
                >
                <p class="countySlug">{{worker.county.slug}}</p>
                <p class="address">{{worker.address}}</p>
                <p class="dateBirth">Дата рождения: {{worker.date_birth}}</p>
                <p class="age">Возраст: {{worker.age}}</p>
                <p class="genderTitle">Пол: {{worker.gender.title}}</p>
            </div>

            <div class="thirdGroup">
                <p :class="worker.status.tag.color">{{worker.status?.description}}</p>
            </div>

        </v-list-item>
    </v-list>
</template>

<script setup>

import {defineProps} from 'vue'

defineProps({
    filteredWorkers:{
        type: Array,
        requared: true
    }
})

</script>

<style lang="sass">

@font-face
    font-family: Montserrat-SemiBold
    src: url("../assets/fonts/Montserrat-SemiBold.ttf")

@font-face
    font-family: Montserrat-Medium
    src: url("../assets/fonts/Montserrat-Medium.ttf")

.listBlock
    margin: 0 30px
    .listItem
        padding: 25px !important
        border-radius: 4px
        margin-bottom: 15px
        background-color: #E7F3FF
        .firstGroup, .secondGroup, thirdGroup
            p
              display: inline
        .firstGroup
            padding-bottom: 10px
            .full_name
                color: #2A358C
                font-family: Montserrat-SemiBold
                font-size: 18px
                margin-right: 20px
            .inn
                color: #84909B
                font-family: Montserrat-Medium
                background-color: white
                padding: 4px 8px
                font-size: 13px
                border-radius: 4px
                margin-right: 20px
            .type_contract
                color: white
                background-color: #00AE5B
                border-radius: 4px
                font-family: Montserrat-SemiBold
                font-size: 13px
                padding: 4px
                margin-right: 10px
            .position
                font-size: 14px
                font-family: Montserrat-Regular
                color: #041423
        .secondGroup
            padding-bottom: 15px
            .countyIcon
                padding-right: 10px
            .countySlug
                font-size: 14px
                padding-right: 15px
                border-right: black solid 1px
                border-color: #CEDAE5
                font-family: Montserrat-Regular
            .address
                border-right: black solid 1px
                padding: 0 15px
                border-color: #CEDAE5
                font-size: 14px
                font-family: Montserrat-Regular
            .dateBirth
                border-right: black solid 1px
                padding: 0 15px
                border-color: #CEDAE5
                font-size: 14px
                font-family: Montserrat-Regular
            .age
                border-right: black solid 1px
                padding: 0 15px
                border-color: #CEDAE5
                font-size: 14px
                font-family: Montserrat-Regular
            .genderTitle
                padding-left: 15px
                font-size: 14px
                font-family: Montserrat-Regular

        .thirdGroup
            p
                border-radius: 4px
                display: inline
                padding: 4px 8px
                font-family: Montserrat-Medium
                font-size: 14px
                color: white
            .yellow
                background-color: #E2BD06
            .red
                background-color: #E52E2E
            .blue
                background-color: #00B6ED
            .green
                background-color: #00AE5B

</style>
