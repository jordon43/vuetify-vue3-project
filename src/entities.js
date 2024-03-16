const staff_tag = [
    {
        id: 0,
        title: "Проблемные",
        slug: 'trbl',
        color: "yellow"
    },
    {
        id: 1,
        title: "Критические",
        slug: 'crit',
        color: "red"
    },
    {
        id: 2,
        title: "Есть замечания",
        slug: 'def',
        color: "blue"
    },
    {
        id: 3,
        title: "Выполнено",
        slug: 'ok',
        color: "green"
    },
]
const county = [
    {
        id: 0,
        icon: "RU",
        title: "Россия",
        slug: "RU"
    },
    {
        id: 1,
        icon: "TJ",
        title: "Таджикистан",
        slug: "TJ"
    },
    {
        id: 2,
        icon: "UZ",
        title: "Узбекистан",
        slug: "UZ"
    },
]
const position = [
    {
        id: 0,
        name: "Промышленный альпинист"
    },
    {
        id: 1,
        name: "Токарь"
    },
    {
        id: 2,
        name: "Пекарь"
    }
]
const type_contact = [
    {
        id: 0,
        title: "Трудовой договор",
        slug: "ТД"
    },
    {
        id: 1,
        title: "Гражданско-правовой договор",
        slug: "ГПЗ"
    },
    {
        id: 2,
        title: "Самозанятый",
        slug: "СМЗ"
    },
    {
        id: 3,
        title: "Кандидат",
        slug: "Кандидат"
    },
]
const gender = [
    {
        id: 0,
        title: "Мужской",
        slug: "men"
    },
    {
        id: 1,
        title: "Женский",
        slug: "women"
    },
]

export default {staff_tag, county, position, type_contact, gender, status}
