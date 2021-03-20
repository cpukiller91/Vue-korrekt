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
    categoryHome: menuState[]
}

function getDefaultState () {
    return {
        categoryHome:[]

    }
}

export const state = getDefaultState

export const getters: GetterTree<Menu, {}> = {
    home_list (store) {
        return store.categoryHome
    }
}

export const mutations: MutationTree<Menu> = {
    setCategoryHome (state, categoryHome) {
        state.categoryHome = categoryHome
    }
}

export const actions: ActionTree<any, any> = {
    async nuxtServerInit({commit}){
        //commit.store.getters['locale/language'].locale
        //const menu = await fetch(`https://strapi.api.hosteam.pro/menus`).then((response) => response.json());
        //console.log("nuxtServerInit",app);
        //commit('set')
    }
}
