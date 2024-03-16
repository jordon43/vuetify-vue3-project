<template>
    <div class="buttonGroup">
        <v-btn
            class="btnAllList"
            @click="$emit('selectedAllList');"
        >
            <p class="textAllList textBtn">Весь список</p>
        </v-btn>

        <v-btn
            v-for="(tag) in staff_tag"
            :text="tag.title"
            :key="tag.id"
            class="btn"
            v-bind:class="tag.color"
            @click="e => changeFilterParams(tag)"
            :class="{ active: ids_tag.includes(tag) }"
        >
        </v-btn>
    </div>
</template>


<script setup>
    import {defineProps} from 'vue';

    defineProps({
        staff_tag:{
            type: Object
        },
        ids_tag:{
          type: Array
        }
    })
    const emits = defineEmits(['selectedAllList', 'changeFilterParams']);
    const changeFilterParams = (tag) => {
        emits('changeFilterParams', tag)
    }
</script>

<style lang="sass">

@font-face
    font-family: Montserrat-Regular
    src: url("../assets/fonts/Montserrat-Regular.ttf")

.buttonGroup
    padding: 20px 0 0 40px
    button
        margin-bottom: 20px
        text-transform: unset !important
        color: white
        border-radius: 30px
        font-family: Montserrat-Regular
        font-size: 14px
        margin-right: 10px
        box-shadow: none
    button:hover
        box-shadow: none
    .btnAllList
        background-color: #B0BCC7
    .yellow
        border: #E2BD06 1px solid
        background-color: #FFFDF1
        color: #E2BD06
    .red
        border: #E52E2E 1px solid
        background-color: #FFF8F8
        color: #E52E2E
    .blue
        border: #00B6ED 1px solid
        background-color: #F3FCFF
        color: #00B6ED
    .green
        border: #00AE5B 1px solid
        background-color: #F2FFF9
        color: #00AE5B
    .yellow.active
        color: white !important
        background-color: #E2BD06 !important
    .red.active
        color: white !important
        background-color: #E52E2E !important
    .blue.active
        color: white !important
        background-color: #00B6ED !important
    .green.active
        color: white !important
        background-color: #00AE5B !important


</style>
