import { addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import ru from "react-intl/locale-data/ru"
// import translations form "./translations/index.js"

addLocaleData(en)
addLocaleData(ru)

export const locales = [
    "en",
    "ru"
]

