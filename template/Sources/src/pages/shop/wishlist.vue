<template>
    <div>
        <PageHeader
            :title="$t('products.Wishlist')"
            :breadcrumb="[
                { title: 'Головна', url: '/' },
                { title: 'Список бажань', url: '' },
            ]"
        />

        <client-only>
            <div v-if="!items.length" class="block block-empty">
                <div class="container">
                    <div class="block-empty__body">
                        <div class="block-empty__message">
                            {{$t('products.YourWishList')}}
                        </div>
                        <div class="block-empty__actions">
                            <AppLink to="/" class="btn btn-primary btn-sm">
                                {{$t('cart.Continue')}}
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="items.length" class="block">
                <div class="container">
                    <table class="wishlist">
                        <thead class="wishlist__head">
                            <tr class="wishlist__row">
                                <th class="wishlist__column wishlist__column--image">
                                    {{$t('products.Image')}}
                                </th>
                                <th class="wishlist__column wishlist__column--product">
                                    {{$t('cart.Product')}}
                                </th>
                                <th class="wishlist__column wishlist__column--stock">
                                    {{$t('products.StockStatus')}}
                                </th>
                                <th class="wishlist__column wishlist__column--price">
                                    {{$t('cart.Price')}}
                                </th>
                                <th class="wishlist__column wishlist__column--tocart" :aria-label="$t('cart.Addtocart')" />
                                <th class="wishlist__column wishlist__column--remove" :aria-label="$t('cart.Remove')" />
                            </tr>
                        </thead>
                        <tbody class="wishlist__body">
                            <tr v-for="item in items" :key="item.id" class="wishlist__row">
                                <td class="wishlist__column wishlist__column--image">
                                    <div v-if="item.images.length > 0" class="product-image">
                                        <AppLink :to="$url.product(item)" class="product-image__body">
                                            <!--suppress HtmlUnknownTarget -->
                                            <img class="product-image__img" :src="$url.img(item.images[0])" alt="">
                                        </AppLink>
                                    </div>
                                </td>
                                <td class="wishlist__column wishlist__column--product">
                                    <AppLink :to="$url.product(item)" class="wishlist__product-name">
                                        {{ item.name }}
                                    </AppLink>
                                    <div class="wishlist__product-rating">
                                        <Rating :value="item.rating" />
                                        <div class="wishlist__product-rating-legend">
                                            {{ item.reviews }} {{$t('cart.Reviews')}}
                                        </div>
                                    </div>
                                </td>
                                <td class="wishlist__column wishlist__column--stock">
                                    <div class="badge badge-success">
                                        {{$t('cart.InStock')}}
                                    </div>
                                </td>
                                <td class="wishlist__column wishlist__column--price">
                                    {{ $price(item.price) }}
                                </td>
                                <td class="wishlist__column wishlist__column--tocart">
                                    <AsyncAction
                                        v-slot:default="{ run, isLoading }"
                                        :action="() => $store.dispatch('cart/add', { product: item })"
                                    >
                                        <button
                                            type="button"
                                            :class="[
                                                'btn btn-primary btn-sm',
                                                {'btn-loading': isLoading}
                                            ]"
                                            @click="run"
                                        >
                                            {{$t('cart.Addtocart')}}
                                        </button>
                                    </AsyncAction>
                                </td>
                                <td class="wishlist__column wishlist__column--remove">
                                    <AsyncAction
                                        v-slot:default="{ run, isLoading }"
                                        :action="() => $store.dispatch('wishlist/remove', { productId: item.id })"
                                    >
                                        <button
                                            type="button"
                                            :class="[
                                                'btn btn-light btn-sm btn-svg-icon',
                                                {'btn-loading': isLoading}
                                            ]"
                                            :aria-label="$t('cart.Remove')"
                                            @click="run"
                                        >
                                            <Cross12Svg />
                                        </button>
                                    </AsyncAction>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { IProduct } from '~/interfaces/product'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import Rating from '~/components/shared/rating.vue'
import AsyncAction from '~/components/shared/async-action.vue'
import Cross12Svg from '~/svg/cross-12.svg'

@Component({
    components: { PageHeader, AppLink, Rating, AsyncAction, Cross12Svg },
    head () {
        return {
            title: 'Wish List'
        }
    }
})
export default class Page extends Vue {
    @State((state: RootState) => state.wishlist.items) items!: IProduct[]
}

</script>
