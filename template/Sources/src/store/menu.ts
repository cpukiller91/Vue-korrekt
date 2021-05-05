import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface menuState {
    title: string;
    url: string;
    parent: number;
    submenu:[
        {type: string;}
    ]
}

export interface Menu {
    menu: menuState[]
}

function getDefaultState () {
    return {
        menu:[
            {
            title: 'Головна',
            url: '/',
            // submenu: {
            //     type: 'menu',
            //     menu: [
            //         { title: 'Головна 1', url: '/' },
            //         { title: 'Головна 2', url: '/home-two' },
            //         { title: 'Offcanvas Cart', url: '/offcanvas-cart' }
            //     ]
            // }
        },
        //     {
        //         title: 'Меню',
        //         url: '',
        //         submenu: {
        //             type: 'megamenu',
        //             menu: {
        //                 size: 'nl',
        //                 columns: [
        //                     {
        //                         size: 6,
        //                         links: [
        //                             {
        //                                 title: 'Power Tools',
        //                                 url: '',
        //                                 children: [
        //                                     { title: 'Engravers', url: '' },
        //                                     { title: 'Wrenches', url: '' },
        //                                     { title: 'Wall Chaser', url: '' },
        //                                     { title: 'Pneumatic Tools', url: '' }
        //                                 ]
        //                             },
        //                             {
        //                                 title: 'Machine Tools',
        //                                 url: '',
        //                                 children: [
        //                                     { title: 'Thread Cutting', url: '' },
        //                                     { title: 'Chip Blowers', url: '' },
        //                                     { title: 'Sharpening Machines', url: '' },
        //                                     { title: 'Pipe Cutters', url: '' },
        //                                     { title: 'Slotting machines', url: '' },
        //                                     { title: 'Lathes', url: '' }
        //                                 ]
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         size: 6,
        //                         links: [
        //                             {
        //                                 title: 'Hand Tools',
        //                                 url: '',
        //                                 children: [
        //                                     { title: 'Screwdrivers', url: '' },
        //                                     { title: 'Handsaws', url: '' },
        //                                     { title: 'Knives', url: '' },
        //                                     { title: 'Axes', url: '' },
        //                                     { title: 'Multitools', url: '' },
        //                                     { title: 'Paint Tools', url: '' }
        //                                 ]
        //                             },
        //                             {
        //                                 title: 'Garden Equipment',
        //                                 url: '',
        //                                 children: [
        //                                     { title: 'Motor Pumps', url: '' },
        //                                     { title: 'Chainsaws', url: '' },
        //                                     { title: 'Electric Saws', url: '' },
        //                                     { title: 'Brush Cutters', url: '' }
        //                                 ]
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         }
        //     },
            {
                title: 'Магазин',
                url: '/shop/catalog',
                submenu: {
                    type: 'menu',
                    menu: [
                        // {
                        //     title: 'Shop Grid',
                        //     url: '/shop/category-grid-3-columns-sidebar',
                        //     children: [
                        //         { title: '3 Columns Sidebar', url: '/shop/category-grid-3-columns-sidebar' },
                        //         { title: '4 Columns Full', url: '/shop/category-grid-4-columns-full' },
                        //         { title: '5 Columns Full', url: '/shop/category-grid-5-columns-full' }
                        //     ]
                        // },
                        // { title: 'Shop List', url: '/shop/category-list' },
                        // { title: 'Shop Right Sidebar', url: '/shop/category-right-sidebar' },
                        // {
                        //     title: 'Product',
                        //     url: '/shop/product-standard',
                        //     children: [
                        //         { title: 'Product', url: '/shop/product-standard' },
                        //         { title: 'Product Alt', url: '/shop/product-columnar' },
                        //         { title: 'Product Sidebar', url: '/shop/product-sidebar' }
                        //     ]
                        // },
                        // { title: 'Cart', url: '/shop/cart' },
                        // { title: 'Checkout', url: '/shop/checkout' },
                        // { title: 'Order Success', url: '/shop/checkout/success' },
                        { title: 'Список Бажань', url: '/shop/wishlist' },
                        { title: 'Порівняння', url: '/shop/compare' },
                        { title: 'Відслідкувати замовлення', url: '/shop/track-order' }
                    ]
                }
            },
            // {
            //     title: 'Кабінет',
            //     url: '/account',
            //     submenu: {
            //         type: 'menu',
            //         menu: [
            //             { title: 'Login', url: '/account/login' },
            //             { title: 'Dashboard', url: '/account/dashboard' },
            //             { title: 'Edit Profile', url: '/account/profile' },
            //             { title: 'Order History', url: '/account/orders' },
            //             { title: 'Order Details', url: '/account/orders/5' },
            //             { title: 'Address Book', url: '/account/addresses' },
            //             { title: 'Edit Address', url: '/account/addresses/5' },
            //             { title: 'Change Password', url: '/account/password' }
            //         ]
            //     }
            // },
            // {
            //     title: 'Новини',
            //     url: '/blog/category-classic',
            //     submenu: {
            //         type: 'menu',
            //         menu: [
            //             { title: 'Blog Classic', url: '/blog/category-classic' },
            //             { title: 'Blog Grid', url: '/blog/category-grid' },
            //             { title: 'Blog List', url: '/blog/category-list' },
            //             { title: 'Blog Left Sidebar', url: '/blog/category-left-sidebar' },
            //             { title: 'Post Page', url: '/blog/post-classic' },
            //             { title: 'Post Without Sidebar', url: '/blog/post-full' }
            //         ]
            //     }
            // },
            // {
            //     title: 'Сторінки',
            //     url: '/site/about-us',
            //     submenu: {
            //         type: 'menu',
            //         menu: [
            //             { title: 'About Us', url: '/site/about-us' },
            //             { title: 'Contact Us', url: '/site/contact-us' },
            //             { title: 'Contact Us Alt', url: '/site/contact-us-alt' },
            //             { title: '404', url: '/site/not-found' },
            //             { title: 'Terms And Conditions', url: '/site/terms' },
            //             { title: 'FAQ', url: '/site/faq' },
            //             { title: 'Components', url: '/site/components' },
            //             { title: 'Typography', url: '/site/typography' }
            //         ]
            //     }
            // },
            { title: 'Про нас', url: '/site/about-us' },
            { title: 'Контакти', url: '/site/contact-us' },
            { title: 'Правила', url: '/site/terms' },
            { title: 'FAQ', url: '/site/faq' }]

    }
}

export const state = getDefaultState

export const getters: GetterTree<Menu, {}> = {
    all (store) {
        return store.menu
    }
}

export const mutations: MutationTree<Menu> = {
    set (state, locale: string) {
        // state.menu = [{
        //     title: "Home0",
        //     parent:0
        // }]
    }
}

export const actions: ActionTree<any, any> = {
    async nuxtServerInit({commit}){
        //const menu = await fetch(`https://strapi.api.hosteam.pro/menus`).then((response) => response.json());
        //console.log("nuxtServerInit",menu);
        //commit('set')
    }
}
