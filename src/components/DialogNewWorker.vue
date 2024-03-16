<template>
    <v-dialog>
        <template
            v-slot:activator="{ props: activatorProps }">
            <div class="btnNewWorker">
                <v-btn
                    v-bind="activatorProps"
                    prepend-icon="mdi-account-plus-outline"
                >
                    <p class="btnNewWorkerText">Добавить нового сотрудника</p>
                </v-btn>
            </div>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card class="addWorkerCard">
                <v-card-title class="titleWorkerCard">
                    Добавление пользователя
                </v-card-title>
                <v-form ref="form">
                    <v-card-text class="addWorkerContent">
                        <v-text-field
                            v-model="newUser.full_name"
                            label="ФИО"
                            :rules="[value => !!value || 'Заполните ФИО']"
                        ></v-text-field>

                        <v-text-field
                            v-model="newUser.inn"
                            label="ИНН"
                            :rules="[
                                value => !!value || 'Заполните ИНН',
                                value => (value && /^[0-9]+$/.test(value)) || 'ИНН должен содержать только цифры',
                                value => (value && value.length === 10) || 'ИНН должен содержать 10 цифр'
                                ]"
                        ></v-text-field>

                        <v-text-field
                            v-model="newUser.address"
                            label="Адрес"
                            :rules="[value => !!value || 'Заполните адрес']"
                        ></v-text-field>

                        <v-text-field
                            v-model="newUser.date_birth"
                            label="Дата рождения"
                            :rules="[
                                value => !!value || 'Заполните дату рождения',
                                value => /^\d{2}\.\d{2}\.\d{4}$/.test(value) || 'Неверный формат даты. Используйте формат DD.MM.YYYY',
                            ]"
                        ></v-text-field>

                        <v-text-field
                            v-model="newUser.age"
                            label="Возраст"
                            :rules="[
                                value => !!value || 'Заполните возраст',
                                value => (value && /^[0-9]+$/.test(value)) || 'Возраст должен содержать только цифры',
                                ]"
                        ></v-text-field>

                        <v-select
                            v-model="newUser.type_contract"
                            label="Тип договора"
                            return-object
                            :items="entities.type_contact"
                            :rules="[value => !!newUser.type_contract || 'Обязательно для выбора']"
                        ></v-select>

                        <v-select
                            v-model="newUser.gender"
                            :items="entities.gender"
                            return-object
                            label="Пол"
                            :rules="[value => !!newUser.gender || 'Обязательно для выбора']"
                        ></v-select>

                        <v-select
                            v-model="newUser.county"
                            :items="entities.county"
                            return-object
                            label="Гражданство"
                            :rules="[value => !!newUser.county || 'Обязательно для выбора']"
                        ></v-select>

                        <v-select
                            v-model="newUser.position"
                            :rules="[value => !!newUser.position || 'Обязательно для выбора']"
                            :item-props="(item) => {return {title: item.name}}"
                            :items="entities.position"
                            return-object
                            label="Должность"
                        ></v-select>

                        <p class="statusTextAddWorkerContent">Статус:</p>
                        <v-select
                            v-model="newUser.status.tag"
                            label="Выберете тег"
                            :items="entities.staff_tag"
                            :rules="[value => !!newUser.status.tag || 'Обязательно для выбора']"
                            return-object
                        ></v-select>

                        <v-text-field
                            v-model="newUser.status.description"
                            label="Описание"
                            :rules="[value => !!value || 'Заполните описание']"
                        ></v-text-field>

                    </v-card-text>

                    <v-card-actions class="addWorkerButtonsGroup">
                        <v-btn
                            class="addBtn"
                            @click="addUser(); isActive.value = false"
                            :disabled="isAddButtonDisabled"
                        >
                        Добавить</v-btn>
                        <v-btn
                            class="closeBtn"
                            @click="isActive.value = false"
                            type="submit"
                        >
                        Закрыть</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import {computed, ref} from 'vue';
import entities from "@/entities"

const emits = defineEmits(['addUser']);

const newUser = ref({
    id: 0,
    full_name: null,
    inn: null,
    address: null,
    date_birth: null,
    age: null,
    type_contract: null,
    type_contact_id: null,
    gender: null,
    gender_id: null,
    county: null,
    county_id: null,
    position: null,
    position_id: null,
    status: {
            tag_id: null,
            tag: null,
            description: null
        },
});

const validateDemo = computed(() => {
    return (
        newUser.value.full_name &&
        newUser.value.inn &&
        /^[0-9]+$/.test(newUser.value.inn) &&
        newUser.value.inn?.length === 10 &&
        newUser.value.address &&
        newUser.value.date_birth &&
        /^\d{2}\.\d{2}\.\d{4}$/.test(newUser.value.date_birth) &&
        newUser.value.age &&
        /^[0-9]+$/.test(newUser.value.age) &&
        newUser.value.type_contract &&
        newUser.value.gender &&
        newUser.value.county &&
        newUser.value.position &&
        newUser.value.status.tag &&
        newUser.value.status.description
    );
});

const isAddButtonDisabled = computed(() => !validateDemo.value);

const addUser = () => {

  emits('addUser', newUser)

    newUser.value = {
        id: 0,
        full_name: null,
        inn: null,
        address: null,
        date_birth: null,
        age: null,
        type_contract: null,
        type_contact_id: null,
        gender: null,
        gender_id: null,
        county: null,
        county_id: null,
        position: null,
        position_id: null,
        status: {
            tag_id: null,
            tag: null,
            description: null
        },
    };

}

</script>


<style lang="sass">
@font-face
    font-family: Montserrat-Regular
    src: url("../assets/fonts/Montserrat-Regular.ttf")

.btnNewWorker
    padding: 30px
    button
        box-shadow: 0px 10px 20px rgba(0, 182, 237, 0.2)
        width: 100%
        height: 64px !important
        background-color: #00B6ED
        font-size: 20px
        color: white
        text-transform: lowercase
    .btnNewWorkerText
        font-family: Montserrat-Regular
        letter-spacing: 1px
        font-style: normal
        font-weight: 500
        font-size: 20px
    .btnNewWorkerText::first-letter
        text-transform: uppercase


.addWorkerCard
    margin: 0 auto
    width: 60%
    .titleWorkerCard
        text-align: center
        font-size: 30px
        font-family: Montserrat-Regular
        margin: 0 30px
        padding: 30px 0
        border-bottom: #CEDAE5 1px solid
    .addWorkerContent
        padding-top: 30px !important

    .statusTextAddWorkerContent
        font-size: 14px
        font-family: Montserrat-Regular
        padding-bottom: 15px

    .addWorkerButtonsGroup
        padding: 10px 0 30px 0
        margin: 0 30px
        .addBtn
            background-color: #00c853
            color: white
        .closeBtn
            background-color: #c62828
            color: white

@media screen and (max-width: 1200px)
    .addWorkerCard
        width: 95%

</style>
