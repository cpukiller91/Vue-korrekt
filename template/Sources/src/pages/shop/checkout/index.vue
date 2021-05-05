<template>
    <div>
        <client-only>
            <PageHeader
                :title="$t('checkout.Checkout')"
                :breadcrumb="[
                    { title: $t('home.title'), url: $url.home() },
                    { title: $t('cart.ShoppingCart'), url: $url.cart() },
                    { title: $t('checkout.Checkout'), url: '' },
                ]"
            />

            <div class="checkout block">
                <form
                    id="checkout"
                    @submit.prevent="checkForm"
                    method="post"
                    ref="form"
                >
                    <div class="container">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <div class="alert alert-primary alert-lg">
                                {{$t('checkout.ReturningCustomer')}}
                                <AppLink :to="$url.signIn()">
                                    {{$t('checkout.ClickHereToLogin')}}
                                </AppLink>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-7">
                            <div class="card mb-lg-0">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        {{$t('checkout.BillingDetails')}}
                                    </h3>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="checkout-first-name">{{$t('checkout.FirstName')}}</label>
                                            <input
                                                id="checkout-first-name"
                                                class="form-control"
                                                type="text"
                                                name="FirstName"
                                                :placeholder="$t('checkout.FirstName')"
                                            >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="checkout-last-name">{{$t('checkout.LastName')}}</label>
                                            <input
                                                id="checkout-last-name"
                                                class="form-control"
                                                type="text"
                                                name="last"
                                                :placeholder="$t('checkout.LastName')"
                                            >
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="checkout-company-name">
                                            {{$t('checkout.CompanyName')}}
                                            <span class="text-muted">({{$t('checkout.Optional')}})</span>
                                        </label>
                                        <input
                                            id="checkout-company-name"
                                            class="form-control"
                                            type="text"
                                            name="company"
                                            :placeholder="$t('checkout.CompanyName')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-country">{{$t('checkout.Country')}}</label>
                                        <select name="country" id="checkout-country" class="form-control">
                                            <option>{{$t('checkout.SelectACountry')}}</option>
                                            <option>United States</option>
                                            <option>Russia</option>
                                            <option>Italy</option>
                                            <option>France</option>
                                            <option>Ukraine</option>
                                            <option>Germany</option>
                                            <option>Australia</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-street-address">{{$t('checkout.StreetAddress')}}</label>
                                        <input
                                            id="checkout-street-address"
                                            class="form-control"
                                            type="text"
                                            name="street"
                                            :placeholder="$t('checkout.StreetAddress')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-address">
                                            {{$t('checkout.Apartment')}}
                                            <span class="text-muted">({{$t('checkout.Optional')}})</span>
                                        </label>
                                        <input
                                            id="checkout-address"
                                            class="form-control"
                                            type="text"
                                            name="apartment"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-city">{{$t('checkout.TownCity')}}</label>
                                        <input
                                            id="checkout-city"
                                            class="form-control"
                                            type="text"
                                            name="town"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-state">{{$t('checkout.StateCounty')}}</label>
                                        <input
                                            id="checkout-state"
                                            class="form-control"
                                            type="text"
                                            name="state"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-postcode">{{$t('checkout.PostcodeZIP')}}</label>
                                        <input
                                            id="checkout-postcode"
                                            class="form-control"
                                            type="text"
                                            name="postcode"
                                        >
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="checkout-email">{{$t('checkout.EmailAddress')}}</label>
                                            <input
                                                id="checkout-email"
                                                class="form-control"
                                                type="email"
                                                name="email"
                                                :placeholder="$t('checkout.EmailAddress')"
                                            >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="checkout-phone">{{$t('checkout.Phone')}}</label>
                                            <input
                                                id="checkout-phone"
                                                class="form-control"
                                                type="text"
                                                name="phone"
                                                :placeholder="$t('checkout.Phone')"
                                            >
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-create-account"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                        name="reate-account"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-create-account">
                                                {{$t('checkout.CreateAnAccount')}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-divider" />
                                <div class="card-body">
                                    <h3 class="card-title">
                                        {{$t('checkout.ShippingDetails')}}
                                    </h3>

                                    <div class="form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-different-address"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                        name="different-address"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-different-address">
                                                {{$t('checkout.ShipTo')}}
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="checkout-comment">
                                            {{$t('checkout.OrderNotes')}}
                                            <span class="text-muted">({{$t('checkout.Optional')}})</span>
                                        </label>
                                        <textarea id="checkout-comment" name="comment" class="form-control" :rows="4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        {{$t('checkout.YourOrder')}}
                                    </h3>

                                    <table class="checkout__totals">
                                        <thead class="checkout__totals-header">
                                            <tr>
                                                <th>{{$t('cart.Product')}}</th>
                                                <th>{{$t('cart.Total')}}</th>
                                            </tr>
                                        </thead>
                                        <tbody class="checkout__totals-products">
                                            <tr v-for="item in cart.items" :key="item.id">
                                                <td>{{ item.product.name }} × {{ item.quantity }}</td>
                                                <td>{{ $price(item.total) }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-if="cart.totals.length > 0" class="checkout__totals-subtotals">
                                            <tr>
                                                <th>{{$t('cart.Subtotal')}}</th>
                                                <td>{{ $price(cart.subtotal) }}</td>
                                            </tr>
                                            <tr v-for="(total, index) in cart.totals" :key="index">
                                                <th>{{ total.title }}</th>
                                                <td>{{ $price(total.price) }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot class="checkout__totals-footer">
                                            <tr>
                                                <th>{{$t('cart.Total')}}</th>
                                                <td>{{ $price(cart.total) }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div class="payment-methods">
                                        <ul class="payment-methods__list">
                                            <Collapse
                                                v-for="(payment, index) in payments"
                                                :key="index"
                                                v-slot:default="{ itemClasses, contentClasses }"
                                                :is-open="currentPayment === payment.key"
                                                item-open-class="payment-methods__item--active"
                                            >
                                                <li :class="['payment-methods__item', itemClasses]">
                                                    <label class="payment-methods__item-header">
                                                        <span class="payment-methods__item-radio input-radio">
                                                            <span class="input-radio__body">
                                                                <input
                                                                    type="radio"
                                                                    class="input-radio__input"
                                                                    name="checkout_payment_method"
                                                                    :value="payment.key"
                                                                    :checked="currentPayment === payment.key"
                                                                    @change="handlePaymentChange"
                                                                    @click="handlePaymentClick"
                                                                >
                                                                <span class="input-radio__circle" />
                                                            </span>
                                                        </span>
                                                        <span class="payment-methods__item-title">
                                                            {{ payment.title }}
                                                        </span>
                                                    </label>
                                                    <div :class="['payment-methods__item-container', contentClasses]">
                                                        <div class="payment-methods__item-description text-muted">
                                                            {{ payment.description }}
                                                        </div>
                                                    </div>
                                                </li>
                                            </Collapse>
                                        </ul>
                                    </div>

                                    <div class="checkout__agree form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-terms"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                        name="checkout-terms"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-terms">
                                                {{$t('checkout.IHaveRead')}}
                                                <AppLink :to="$url.terms()">
                                                    {{$t('checkout.TermsAndConditions')}}
                                                </AppLink>
                                                *
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary btn-xl btn-block">
                                        {{$t('checkout.PlaceOrder')}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </client-only>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IPayment } from '~/interfaces/payment'
import { RootState } from '~/store'
import { Cart } from '~/interfaces/cart'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'
import dataShopPayments from '~/data/shopPayments'

@Component({
    components: { PageHeader, AppLink, Check9x7Svg, Collapse },
    head () {
        return {
            title: 'Checkout'
        }
    }
})
export default class Page extends Vue {
    @State((store: RootState) => store.cart) cart!: Cart

    currentPayment: string = dataShopPayments[0].key

    payments: IPayment[] = dataShopPayments

    clickTimer: any = null
    $refs!: {
        vue: Vue,
        element: HTMLInputElement,
        vues: Vue[],
        elements: HTMLInputElement[],
        name:HTMLInputElement,
        // emaill:HTMLInputElement,
        // password:HTMLInputElement,
        // confirmp:HTMLInputElement,
        // registerp:HTMLInputElement,
        // phone:HTMLInputElement

    }
    // noinspection JSUnusedGlobalSymbols
    async mounted(){
        const CatListHome = await fetch(`https://`+this.$store.getters['locale/language'].locale+`.korrekt.com.ua/payments`).then((response) => response.json());
        this.payments = CatListHome
        //console.log("dsdsdsd",CatListHome)
    }

    beforeMount () {
        if (this.cart.quantity < 1) {
            this.$router.push(this.$url.cart())
        }
    }
    checkForm(){
        // this.$refs.forEach(function(item){
        //     console.log(item)
        // })

        // if(!this.$refs.name.value){
        //
        //     alert("prevent")
        // }
        console.log(this.$refs)
    }
    handlePaymentChange (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.currentPayment = event.target.value
        }
    }

    // prevents unwanted scrolling
    handlePaymentClick (event: InputEvent) {
        const input = event.target

        clearTimeout(this.clickTimer)

        if (input instanceof HTMLInputElement) {
            input.blur()

            this.clickTimer = setTimeout(() => {
                input.focus()
            }, 500)
        }
    }
}

</script>
