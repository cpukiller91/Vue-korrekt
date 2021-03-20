import { ILanguage } from '~/interfaces/language'

const dataLanguages: ILanguage[] = [
    {
        locale: 'ua',
        code: 'UA',
        name: 'Українська',
        icon: '/images/languages/language-1.png',
        direction: 'ltr',
        messages: require('../locales/ua.json')
    },{
        locale: 'de',
        code: 'De',
        name: 'Deutsche',
        icon: '/images/languages/language-1.png',
        direction: 'ltr',
        messages: require('../locales/de.json')
    }
    // ,{
    //     locale: 'en',
    //     code: 'EN',
    //     name: 'English',
    //     icon: '/images/languages/language-1.png',
    //     direction: 'ltr',
    //     messages: require('../locales/en.json')
    // },
    // {
    //     locale: 'ru',
    //     code: 'RU',
    //     name: 'Russian',
    //     icon: '/images/languages/language-2.png',
    //     direction: 'ltr',
    //     messages: require('../locales/ru.json')
    // },
    // {
    //     locale: 'en-RTL',
    //     code: 'RTL',
    //     name: 'RTL',
    //     icon: '/images/languages/language-3.png',
    //     direction: 'rtl',
    //     messages: require('../locales/en.json')
    // }
]

export const defaultLocale = 'ua'

export default dataLanguages
