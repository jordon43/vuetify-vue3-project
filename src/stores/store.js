import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        workers: [
            {
                id: 0,
                full_name: "Иванов Иван Иванович",
                inn: "1212121212",
                address: "Киров",
                date_birth: "19.07.2002",
                age: 22,
                type_contract: {
                    id: 0,
                    title: "Трудовой договор",
                    slug: "ТД"
                },
                type_contact_id: 0,
                gender:  {
                    id: 0,
                    title: "Мужской",
                    slug: "men"
                },

                gender_id: 0,
                county: {
                    id: 0,
                    icon: "RU",
                    title: "Россия",
                    slug: "RU"
                },
                county_id: 0,
                position:  {
                    id: 1,
                    name: "Токарь",
                },
                position_id: 1,
                status: {
                    tag_id: 0,
                    tag: {
                        id: 0,
                        title: 'Проблемные',
                        slug: 'trbl',
                        color: 'yellow'
                    },
                    description: 'Есть проблемы'
                },

            },
            {
                id: 1,
                full_name: "Константин Позолотин Сергеевич",
                inn: "1212121212",
                address: "Санкт-Петербург",
                date_birth: "19.07.2002",
                age: 21,
                type_contract: {
                    id: 2,
                    title: "Самозанятый",
                    slug: "СМЗ"
                },
                type_contact_id: 2,
                gender:  {
                    id: 1,
                    title: "Женский",
                    slug: "women"
                },
                gender_id: 1,
                county: {
                    id: 2,
                    icon: "UZ",
                    title: "Узбекистан",
                    slug: "UZ"
                },
                county_id: 2,
                position:  {
                        id: 1,
                        name: "Токарь",
                    },
                position_id: 1,
                status: {
                    tag_id: 3,
                    tag: {
                        id: 3,
                        title: "Выполнено",
                        slug: 'ok',
                        color: "green"
                    },
                    description: 'Все ништяк'
                },

            },
            {
                id: 2,
                full_name: "Константинопольский Константин Константинович",
                inn: "1234567890",
                address: "Санкт-Петербург",
                date_birth: "19.07.2002",
                age: 22,
                type_contract: {
                        id: 0,
                        title: "Трудовой договор",
                        slug: "ТД"
                    },
                type_contact_id: 0,
                gender:  {
                        id: 0,
                        title: "Мужской",
                        slug: "men"
                    },

                gender_id: 0,
                county: {
                        id: 0,
                        icon: "RU",
                        title: "Россия",
                        slug: "RU"
                    },
                county_id: 0,
                position:   {
                    id: 2,
                    name: "Пекарь"
                },
                position_id: 2,
                status: {
                    tag_id: 1,
                    tag: {
                        id: 1,
                        title: "Критические",
                        slug: 'crit',
                        color: "red"
                    },
                    description: 'Все не ништяк'
                },

            },
            {
                id: 3,
                full_name: "Константин Константинович",
                inn: "1234567890",
                address: "Санкт-Петербург",
                date_birth: "19.07.2002",
                age: 22,
                type_contract: {
                    id: 0,
                    title: "Трудовой договор",
                    slug: "ТД"
                },
                type_contact_id: 0,
                gender:  {
                    id: 0,
                    title: "Мужской",
                    slug: "men"
                },

                gender_id: 0,
                county: {
                    id: 1,
                    icon: "TJ",
                    title: "Таджикистан",
                    slug: "TJ"
                },
                county_id: 1,
                position: {
                    id: 0,
                    name: "Промышленный альпинист"
                },
                position_id: 0,
                status: {
                    tag_id: 2,
                    tag:  {
                        id: 2,
                        title: "Есть замечания",
                        slug: 'def',
                        color: "blue"
                    },
                    description: 'Небольшие замечания'
                },

            }
        ]
    }),
    actions: {
        addWorker(newWorker){
            this.workers.unshift(newWorker)
        }
    }

})
