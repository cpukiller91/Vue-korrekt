import { ActionTree, GetterTree, MutationTree } from 'vuex'

// export interface menuState {
//     title: string;
//     url: string;
//     parent: number;
//     submenu:[
//         {type: string;}
//     ]
// }

export interface departments {
    departments: any,
    test:string
}

function getDefaultState () {
    return {
        departments:[
            { title: 'Power Machinery', url: '' },
            { title: 'Measurement', url: '' },
            { title: 'Clothes & PPE', url: '' },
            { title: 'Plumbing', url: '' },
            { title: 'Storage & Organization', url: '' },
            { title: 'Welding & Soldering', url: '' }
        ],
        test:"0"

    }
}

export const state = getDefaultState

export const getters: GetterTree<departments, {}> = {
    all (store) {
        return store
    }
}

export const mutations: MutationTree<departments> = {
    async setDepartments (state, locale:[]) {
        state.departments = locale

        console.log("Mutation",locale)

    },
    set (state,locale) {
        state.test = 'test1'
        console.log("set",state.test)
    }
}

export const actions: ActionTree<any, any> = {
    reloadStore({commit},data:[]){

        // fetch(`https://de.korrekt.com.ua/products/getdepartments`)
        //     .then(function(response) {
        //     // The response is a Response instance.
        //     // You parse the data into a useable format using `.json()`
        //         return response.json()
        //     })
        //     .then(function(data) {
        //         commit('setDepartments',data)
        //         // `data` is the parsed version of the JSON returned from the above endpoint.
        //         //console.log(data)  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        //     })
            // (response) => {
            //     response
            //     console.log("reloadStorev error",response.json())
            //     //commit('setDepartments',response.json())
            // }

        // try {
        //
        //
        // }catch(error) {
        //     console.log("reloadStorev error",error)
        //     //failureCallback(error);
        // }
        //console.log("reloadStorev action",menu)
        // const departments = await fetch(`https://`+lang+`.korrekt.com.ua/products/getdepartments`).then((response) => response.json());
        // console.log("reloadStorev action departments",departments)
        //const menu = await fetch(`https://de.korrekt.com.ua/products/getdepartments`).then((response) => response.json());
        // const menu = [{}]
        //commit('setDepartments',departments)
        //commit('set')
        //commit('setDepartments',departments)
        //console.log(commit('setDepartments',departments ))
    },
    async nuxtServerInit({commit}){
        //const menu  = await this.$axios.get('https://de.korrekt.com.ua/products/getdepartments')
        //const menu = await fetch(`https://de.korrekt.com.ua/products/getdepartments`).then((response) => response.json());
        //console.log("nuxtServerInit-->",menu.data);
        //commit('setDepartments',[{ title: 'Welding & Soldering', url: '' }])
        //commit('set',"test1")
    }
}
