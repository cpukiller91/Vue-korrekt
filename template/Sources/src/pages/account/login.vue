<template>
    <div>
        <PageHeader
            title="My Account"
            :breadcrumb="[
                {title: 'Home', url: ''},
                {title: 'Breadcrumb', url: ''},
                {title: 'My Account', url: ''},
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 d-flex flex-column">
                        <div class="card flex-grow-1 mb-md-0">
                            <div class="card-body">
                                <h3 class="card-title">
                                    {{ $t('login.page.cardTitle') }}
                                </h3>
                                <form id="app" @submit.prevent="onLogin">
                                    <div class="form-group">
                                        <label for="login-emaill">{{ $t('login.page.loginEmaill') }}</label>
                                        <input
                                            id="login-emaill"
                                            class="form-control"
                                            type="email"
                                            ref="emaill"
                                            :placeholder="$t('login.page.loginEmaill')"

                                        >

                                    </div>

                                    <div class="form-group">
                                        <label for="login-password">{{ $t('login.page.loginPassword') }}</label>
                                        <input
                                            id="login-password"
                                            class="form-control"
                                            type="password"
                                            ref="password"
                                            :placeholder="$t('login.page.loginPassword')"

                                        >
                                        <small class="form-text text-muted">
                                            <a href="">{{$t('login.page.forgottenPassword')}}</a>
                                        </small>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="login-remember"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="login-remember">{{$t('login.page.loginRemember')}}</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-4">
                                        {{$t('login.page.btnLogin')}}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex flex-column mt-4 mt-md-0">
                        <div class="card flex-grow-1 mb-0">
                            <div class="card-body">
                                <h3 class="card-title">
                                    {{$t('login.page.Register')}}
                                </h3>
                                <form @submit.prevent="onRegister">
                                    <div class="form-group">
                                        <label for="register-emailr">{{ $t('login.page.loginEmaill') }}</label>
                                        <input
                                            id="register-emailr"
                                            class="form-control"
                                            type="email"
                                            ref="emailr"
                                            :placeholder="$t('login.page.loginEmaill')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="register-phone"> {{$t('login.page.phone')}}</label>
                                        <input
                                            id="register-phone"
                                            class="form-control"
                                            type="phone"
                                            ref="phone"
                                            :placeholder="$t('login.page.phone')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="register-password">{{$t('login.page.loginPassword')}}</label>
                                        <input
                                            id="register-password"
                                            class="form-control"
                                            type="password"
                                            ref="registerp"
                                            :placeholder="$t('login.page.loginPassword')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="register-confirm">{{$t('login.page.rePassword')}}</label>
                                        <input
                                            id="register-confirm"
                                            class="form-control"
                                            ref="confirmp"
                                            type="password"
                                            :placeholder="$t('login.page.rePassword')"
                                        >
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-4">
                                        {{$t('login.page.Register')}}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'

import axios from 'axios';

@Component({
    components: { PageHeader, Check9x7Svg },
    head: { title: 'Log In' }
})

export default class Page extends Vue {
    //@Getter('locale/language') language!: ILanguage

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

    async onRegister(){
        //console.log(this.$refs.confirmp)
        if(!this.$refs.phone.value){
            this.$refs.phone.focus()
            this.$bvToast.toast('Поле телефон пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }

        if(!this.$refs.emailr.value){
            this.$refs.emailr.focus()
            this.$bvToast.toast('Поле email пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }

        if(!this.$refs.confirmp.value){
            this.$refs.confirmp.focus()
            this.$bvToast.toast('Поле Повторіть пароль пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }

        if(!this.$refs.registerp.value){
            this.$refs.registerp.focus()
            this.$bvToast.toast('Поле пароль пусте', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }
        if(this.$refs.confirmp.value != this.$refs.registerp.value){
            this.$bvToast.toast('Поле Пароль не дорівнює Повторіть пароль', {
                title: `An error occurred:`,
                variant: "danger",
                solid: true,
                toaster: "b-toaster-bottom-right"
            })
        }

        if(
            this.$refs.confirmp.value &&
            this.$refs.registerp.value &&
            this.$refs.emailr.value && this.$refs.confirmp.value == this.$refs.registerp.value){
            const data = {
                username: this.$refs.phone.value,
                email: this.$refs.emailr.value,
                password: this.$refs.registerp.value,
            }
            axios
                .post('https://de.korrekt.com.ua/auth/local/register', data)
                .then(response => {
                    this.$bvToast.toast('Користувач успішно зареєстрований', {
                        title: `Variant`,
                        variant: "success",
                        solid: true,
                        toaster: "b-toaster-bottom-right"
                    })
                    // Handle success.
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                })
                .catch(error => {
                    const ErrorSign = error.response.data.data[0].messages[0].message
                    this.$bvToast.toast(ErrorSign, {
                        title: `An error occurred:`,
                        variant: "danger",
                        solid: true,
                        toaster: "b-toaster-bottom-right"
                    })
                    // Handle error.
                    console.log('An error occurred:', ErrorSign);
                });
            console.log(this.$refs.emailr.value)
        }

        //console.log("dsdsdds")
    }
    async onLogin () {
        console.log(this.$refs,this.$refs.emaill.value)
        //
        // for (let [inp_name,inp] of Object.entries(this.$refs)) {
        //     //console.log("name",inp_name, "value",inp.val)
        //     console.log(inp)
        //     //this.output.push({name:inp_name, value:inp.value});
        // }
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
        //----------------Log Out =====================//
        await this.$auth.logout()
        //----------------Log IN =====================//

    }
}

</script>
