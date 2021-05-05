<template>
    <div>

        <BlockSlideshow layout="with-departments" :slides="slides"/>

        <BlockFeatures />

        <BlockProductsCarouselContainer
            v-slot:default="{ products, isLoading, tabs, handleTabChange }"
            :tabs="[
                { id: 1, name: 'Всі', categorySlug: undefined }
            ]"
            :initial-data="featuredProducts"
            :data-source="featuredProductsSource"
        >
            <BlockProductsCarousel
                :title="$t('home.block.featuredProducts')"
                layout="grid-4"
                :products="products"
                :loading="isLoading"
                :groups="tabs"
                @groupClick="handleTabChange"
            />
        </BlockProductsCarouselContainer>

        <BlockBanner/>

        <BlockProducts
            :title="$t('home.columns.bestsellers')"
            layout="large-first"
            :featured-product="(bestsellers || [])[0]"
            :products="(bestsellers || []).slice(1, 7)"
        />

        <BlockCategories
            :title="$t('home.block.popularCategories')"
            layout="classic"
            :categories="categories"
        />

        <BlockProductsCarouselContainer
            v-slot:default="{ products, isLoading, tabs, handleTabChange }"
            :tabs="[
                { id: 1, name: 'Всі', categorySlug: undefined }
            ]"
            :initial-data="latestProducts"
            :data-source="latestProductsSource"
        >
            <BlockProductsCarousel
                :title="$t('home.block.newArrivals')"
                layout="horizontal"
                :rows="2"
                :products="products"
                :loading="isLoading"
                :groups="tabs"
                @groupClick="handleTabChange"
            />
        </BlockProductsCarouselContainer>
<!--
        <BlockPosts
            :title="$t('home.block.latestNews')"
            layout="list"
            :posts="posts"
        />
-->
        <BlockBrands :brands="brands"/>

        <BlockProductColumns :columns="columns" />

    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { runOnlyOnServer } from '~/services/helpers'
import { IProduct } from '~/interfaces/product'
import { ICategory } from '~/interfaces/category'
import { IPost } from '~/interfaces/post'
import { IBrand } from '~/interfaces/brand'

interface SlideImage {
    ltr: string
    rtl: string
}

interface Slide {
    title: string
    text: string
    imageClassic: SlideImage
    imageFull: SlideImage
    imageMobile: SlideImage
}

import { BlockProductColumnsItem } from '~/interfaces/components'
import shopApi from '~/api/shop'
//import VueBarcode from '~/components/barcode/barcode.vue'
import BlockSlideshow from '~/components/blocks/block-slideshow.vue'
import BlockFeatures from '~/components/blocks/block-features.vue'
import BlockProductsCarousel from '~/components/blocks/block-products-carousel.vue'
import BlockProductsCarouselContainer from '~/components/blocks/block-products-carousel-container.vue'
import BlockBanner from '~/components/blocks/block-banner.vue'
import BlockProducts from '~/components/blocks/block-products.vue'
import BlockCategories from '~/components/blocks/block-categories.vue'
import BlockPosts from '~/components/blocks/block-posts.vue'
import BlockBrands from '~/components/blocks/block-brands.vue'
import BlockProductColumns from '~/components/blocks/block-product-columns.vue'
import dataShopBlockCategories from '~/data/shopBlockCategories'
import dataBlogPosts from '~/data/blogPosts'
//----------data section ------------------------//
import dataShopBrands from '~/data/shopBrands'

async function loadColumns (locale:string,translate:any) {
    const topRated = shopApi.getTopRatedProducts({ limit: 3 ,locale:locale})
    const specialOffers = shopApi.getDiscountedProducts({ limit: 3 ,locale:locale})
    const bestsellers = shopApi.getPopularProducts({ limit: 3 ,locale:locale})

    return [
        { title: translate.home.columns.topRatedProducts, products: await topRated },
        { title: translate.home.columns.specialOffers, products: await specialOffers },
        { title: translate.home.columns.bestsellers, products: await bestsellers }
    ]
}

@Component({
    components: {
        //VueBarcode,
        BlockSlideshow,
        BlockFeatures,
        BlockProductsCarousel,
        BlockProductsCarouselContainer,
        BlockBanner,
        BlockProducts,
        BlockCategories,
        BlockPosts,
        BlockBrands,
        BlockProductColumns
    },

    async asyncData (context: Context) {

        context.store.commit('options/setHeaderLayout', 'default')
        context.store.commit('options/setDropcartType', 'dropdown')
        //
        //context.route.meta.title = "sdssd"
        var localeData:any = []
        if(typeof context.app.i18n != "undefined"){
            localeData = context.app.i18n.messages
        }

        //console.log("app lang",localeData[context.store.getters['locale/language'].locale])
        //console.log(context.app.$i18n)
        const featuredProducts = runOnlyOnServer(() => shopApi.getFeaturedProducts({ limit: 8 ,locale:context.store.getters['locale/language'].locale}), null)
        const bestsellers = runOnlyOnServer(() => shopApi.getPopularProducts({ limit: 7 ,locale:context.store.getters['locale/language'].locale}), null)
        const latestProducts = runOnlyOnServer(() => shopApi.getLatestProducts({ limit: 8 ,locale:context.store.getters['locale/language'].locale}), null)
        const columns = runOnlyOnServer(() => loadColumns(context.store.getters['locale/language'].locale,localeData[context.store.getters['locale/language'].locale]), null)
        //----Strapi DATA-----//
        const brands = fetch(`https://`+context.store.getters['locale/language'].locale+`.korrekt.com.ua/brands/mod`).then((response) => response.json());
        const slides = fetch(`https://`+context.store.getters['locale/language'].locale+`.korrekt.com.ua/sliders/mod`).then((response) => response.json());
        const CatListHome = await fetch(`https://`+context.store.getters['locale/language'].locale+`.korrekt.com.ua/categories/categoryhomelist`).then((response) => response.json());

        context.store.commit('category/setCategoryHome',CatListHome )
        const departments = await fetch(`https://`+context.store.getters['locale/language'].locale+`.korrekt.com.ua/products/getdepartments`).then((response) => response.json());
        context.store.commit('departments/setDepartments',departments )
        //context.store.dispatch("departments/reloadStore",departments)
        //----//
        //console.log("async--",departments)
        return {
            keywords: 'Home async',
            description: "Home1 async",
            brands: await brands,
            locale: context.store.getters['locale/language'].locale,
            slides: await slides,
            featuredProducts: await featuredProducts,
            bestsellers: await bestsellers,
            latestProducts: await latestProducts,
            columns: await columns
        }
    },

    head () {
        return {
            title: this.$store.getters['locale/language'].locale,
            meta: [
                { hid: 'description', name: 'description', content: 'Vue JS Radar' },
                { hid: 'keywords', name: 'keywords', content: 'vuejs, nuxt, javascript, tutorials, development, software' }
            ],
        }
    }
})
export default class HomePageOne extends Vue {
    shopApi = shopApi
    locale: string = this.$store.getters['locale/language'].locale
    slides: Slide[] = [
        {
            title: 'Big choice of<br>Plumbing products',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            imageClassic: {
                ltr: '/images/slides/slide-1-ltr.jpg',
                rtl: '/images/slides/slide-1-rtl.jpg'
            },
            imageFull: {
                ltr: '/images/slides/slide-1-full-ltr.jpg',
                rtl: '/images/slides/slide-1-full-rtl.jpg'
            },
            imageMobile: {
                ltr: '/images/slides/slide-1-mobile.jpg',
                rtl: '/images/slides/slide-1-mobile.jpg'
            }
        }
    ]
    brands: IBrand[] = dataShopBrands

    featuredProducts: IProduct[] | null = []

    bestsellers: IProduct[] | null = []

    categories: ICategory[] = this.$store.getters['category/home_list']

    latestProducts: IProduct[] | null = []

    posts: IPost[] = dataBlogPosts

    columns: BlockProductColumnsItem[] | null = []

    mounted () {
        const LangArray = this.$i18n.messages
        console.log(this.$store.getters['departments/all'])
        // fetch(`https://`+this.$store.getters['locale/language'].locale+`.korrekt.com.ua/products/getdepartments`)
        //     .then((response) => {
        //
        //         this.$store.commit('departments/setDepartments',response.json() )
        //     });
        //const departments = await fetch(`https://`+this.$store.getters['locale/language'].locale+`.korrekt.com.ua/products/getdepartments`).then((response) => response.json());
        //this.$store.commit('departments/setDepartments',departments )
        this.$store.dispatch("departments/reloadStore")
        //console.log("locale:",this.$store.getters['locale/language'].locale)
        //console.log("data111", )

        if (this.bestsellers === null) {
            shopApi.getPopularProducts({ limit: 7 ,locale:this.locale}).then((products) => {
                this.bestsellers = products
            })
        }
        if (this.columns === null) {
            loadColumns(this.locale,LangArray[this.locale]).then((columns) => {
                this.columns = columns
            })
        }
    }

    featuredProductsSource (tab: {categorySlug: string}): Promise<IProduct[]> {
        return shopApi.getFeaturedProducts({ limit: 8, category: tab.categorySlug ,locale:this.locale})
    }

    latestProductsSource (tab: {categorySlug: string}): Promise<IProduct[]> {
        return shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug ,locale:this.locale})
    }
}

</script>
