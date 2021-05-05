<template>
    <div class="account-menu">

        <div v-if="this.$auth.loggedIn">
            <div class="account-menu__divider" />
            <AppLink :to="$url.account()" class="account-menu__user">
                <div class="account-menu__user-avatar">
                    <img :src="$url.img('/images/avatars/avatar-3.jpg')" alt="">
                </div>
                <div class="account-menu__user-info">
                    <div class="account-menu__user-name">
                        Helena Garcia
                    </div>
                    <div class="account-menu__user-email">
                        stroyka@example.com
                    </div>
                </div>
            </AppLink>
            <div class="account-menu__divider" />
            <ul class="account-menu__links">
                <li>
                    <AppLink :to="$url.accountProfile()">
                        Edit Profile
                    </AppLink>
                </li>
                <li>
                    <AppLink :to="$url.accountOrders()">
                        Order History
                    </AppLink>
                </li>
                <li>
                    <AppLink :to="$url.accountAddresses()">
                        Addresses
                    </AppLink>
                </li>
                <li>
                    <AppLink :to="$url.accountPassword()">
                        Password
                    </AppLink>
                </li>
            </ul>
            <div class="account-menu__divider" />
            <ul class="account-menu__links">
                <li>
                    <AppLink :to="$url.logOut()">
                        Logout
                    </AppLink>
                </li>
            </ul>
        </div>

        <form v-else class="account-menu__form" @submit.prevent="onLogin">
            <div class="account-menu__form-title">
                {{$t('login.accounMmenu.accountMenuTitle')}}
            </div>
            <div class="form-group">
                <label for="header-signin-email" class="sr-only">{{$t('login.page.loginEmaill')}}</label>
                <input id="header-signin-email" type="email" class="form-control form-control-sm"
                       :placeholder="$t('login.page.loginEmaill')"
                       ref="emaill">
            </div>
            <div class="form-group">
                <label for="header-signin-password" class="sr-only">{{$t('login.page.loginPassword')}}</label>
                <div class="account-menu__form-forgot">
                    <input id="header-signin-password" type="password" class="form-control form-control-sm"
                           :placeholder="$t('login.page.loginPassword')"
                           ref="password">
                    <a href="" class="account-menu__form-forgot-link">{{$t('login.accounMmenu.forgot')}}</a>
                </div>
            </div>
            <div class="form-group account-menu__form-button">
                <button type="submit" class="btn btn-primary btn-sm">
                    {{$t('login.page.btnLogin')}}
                </button>
            </div>
            <div class="account-menu__form-link">
                <AppLink to="/account/login">
                   {{$t('login.accounMmenu.CreateAnAccount')}}
                </AppLink>
            </div>
        </form>

    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class AccountMenu extends Vue {
    $refs!: {
        vue: Vue,
        element: HTMLInputElement,
        vues: Vue[],
        elements: HTMLInputElement[],
        emailr:HTMLInputElement,
        emaill:HTMLInputElement,
        password:HTMLInputElement,
        confirmp:HTMLInputElement,
        registerp:HTMLInputElement,
        phone:HTMLInputElement

    }
    async onLogin () {
        if(!this.$refs.emaill.value){
            this.$refs.emaill.focus()
            this.$bvToast.toast('Поле email пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }
        if(!this.$refs.password.value){
            this.$refs.password.focus()
            this.$bvToast.toast('Поле пароль пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }
        let data = {
            identifier: this.$refs.emaill.value,
            password: this.$refs.password.value,
        }
        //const loginWith =  JSON.parse(JSON.stringify(await this.$auth.loginWith('local', { data })))
        this.$auth.loginWith('local', { data })
            .then((data) => {
                if(data){
                    const token = data.data.jwt
                    this.$auth.setUserToken(token)
                        .then(() => {
                            console.log('User set!')
                        })
                }

                //console.log('User set!',data.data)
            })
            .catch(error => {
                const ErrorSign = error.response.data.data[0].messages[0].message
                this.$bvToast.toast(ErrorSign, {
                    title: `An error occurred:`,
                    variant: "danger",
                    solid: true,
                    toaster: "b-toaster-bottom-right"
                })
                //console.log(error)
            })
        //console.log(loginWith.status)
        // this.$auth.setUser(loginWith.data.user)
        // if(loginWith.status == 200){

        //     console.log("--->",loginWith,this.$auth.loggedIn)
        // }


    }
    async mounted () {

    }
}

</script>
