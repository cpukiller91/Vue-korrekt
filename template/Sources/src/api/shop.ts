/* eslint-disable @typescript-eslint/no-unused-vars,arrow-body-style */
// noinspection ES6UnusedImports
// import qs from 'query-string';
// import qs from 'query-string';
import { getCategories, getCategoryBySlug } from '~/fake-server/endpoints/categories'
import { IShopCategory } from '~/interfaces/category'
import { IProduct, IProductsList } from '~/interfaces/product'
import { IFilterValues, IListOptions } from '~/interfaces/list'
import {
    getDiscountedProducts,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductBySlug,
    getProductsList,
    getRelatedProducts,
    getSuggestions,
    getTopRatedProducts
} from '~/fake-server/endpoints/products'
import { GetterTree, MutationTree } from 'vuex'
import {extend} from "swiper/angular/angular/src/utils/utils";
import {Vue} from "vue-property-decorator";
import {Context} from "@nuxt/types";

export interface GetCategoriesOptions {
    depth?: number;
    locale?: string;
}

export interface GetCategoryBySlugOptions {
    depth?: number;
    locale?: string;
}

export interface GetRelatedProductsOptions {
    limit?: number;
    locale?: string;
}

export interface GetProductsOptions {
    limit?: number;
    category?: string;
    locale?: string;
}

export type GetSuggestionsOptions = {
    limit?: number;
    category?: string;
    locale?: string;
};

//const locale = new localeApi()
//console.log(localeApi.locale)
var shopApi = {
    /**
     * Returns array of categories.
     */

    getCategories: (options: GetCategoriesOptions = {}): Promise<IShopCategory[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        //console.log(localeApi)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?depth=2
         *
         * where:
         * - 2 = options.depth
         */

        const res = fetch(`https://`+lang+`.korrekt.com.ua/categories/list?parent=2`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        //console.log("getCategories", res)
        //return getCategories(options)
        return res
        //return getCategories(options)
    },
    /**
     * Returns category by slug.
     */
    getCategoryBySlug: (slug: string, options: GetCategoryBySlugOptions = {}): Promise<IShopCategory> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getCategoryBySlug",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories/power-tools.json?depth=2
         *
         * where:
         * - power-tools = slug
         * - 2           = options.depth
         */
        // return fetch(`https://example.com/api/categories/${slug}.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());
        // const res = fetch(`https://strapi.api.hosteam.pro/categories/list`)
        //         .then((response) => response.json());
        //
        // // This is for demonstration purposes only. Remove it and use the code above.
        // console.log("getSl",res)
        // return res
        // This is for demonstration purposes only. Remove it and use the code above.
        //return getCategoryBySlug(slug, options)
        var URL = Object.assign(options);
        let urlParameters = Object.entries(URL).map(e => e.join('=')).join('&');
        //console.log(urlParameters)
        const res = fetch(`https://`+lang+`.korrekt.com.ua/products/getcategorybyslug?slug=`+slug+urlParameters)
                .then((response) => response.json());
        //https://strapi.api.hosteam.pro/products/list
        // This is for demonstration purposes only. Remove it and use the code above.
        //console.log("shop/API->getSlug",res)
        console.log("bySlug",res)
        return res

    },
    /**
     * Returns product.
     */
    getProductBySlug: (slug: string): Promise<IProduct> => {
        // let lang = options.locale
        // delete options.locale
        // if(typeof lang =="undefined"){
        //     lang = "ua"
        // }
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/screwdriver-a2017.json
         *
         * where:
         * - screwdriver-a2017 = slug
         */
        //let urlParameters = Object.entries(slug).map(e => e.join('=')).join('&');
         var res = fetch(`https://ua.korrekt.com.ua/products/slug?slug=`+slug)
             .then((response) => response.json());
        console.log("shop/API-getProductBySlug",res)
        return res

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProductBySlug(slug)
    },
    /**
     * Returns array of related products.
     */
    getRelatedProducts: (slug: string, options: GetRelatedProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getRelatedProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
         *
         * where:
         * - screwdriver-a2017 = slug
         * - limit             = options.limit
         */
        // return fetch(`https://example.com/api/products/${slug}/related.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getRelatedProducts(slug, options)
    },
    /**
     * Return products list.
     */
    getProductsList: (options: IListOptions = {}, filters: IFilterValues = {}): Promise<IProductsList> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getProductsList",lang)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products.json?page=2&limit=12&sort=name_desc&filter_category=screwdriwers&filter_price=500-1000
         *
         * where:
         * - page            = options.page
         * - limit           = options.limit
         * - sort            = options.sort
         * - filter_category = filters.category
         * - filter_price    = filters.price
         */
        // const params = { ...options };
        //
        // Object.keys(filters).forEach((slug) => {
        //     params[`filter_${slug}`] = filters[slug];
        // });
        //
         //return fetch(`https://example.com/api/products.json?${qs.stringify(params)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        var URL = Object.assign(filters, options);
        let urlParameters = Object.entries(URL).map(e => e.join('=')).join('&');

        console.log(URL);
        const res = fetch(`https://`+lang+`.korrekt.com.ua/products/list?`+urlParameters)
                .then((response) => response.json());

        // console.log("shop/API->Strapi", res)
        // console.log("shop/API->options", options)
        // console.log("shop/API->filters", filters)
        //return getProductsList(options, filters)
        return res

        const page = 1
        const limit =  12
        const sort =  'default'
        const total = 3
        const pages = 2
        const from = 1
        const to = 1
        let  items = [

            {
                attributes: [
                    {
                        featured: true,
                        name: "Speed",
                        slug: "speed",
                        values: [{name: "750 RPM", slug: "750-rpm"}]
                    }],
                availability: "in-stock",
                badges: ["new"],
                brand: {name: "Brandix", slug: "brandix", image: "assets/images/logos/logo-1.png"},
                categories: [],
                compareAtPrice: null,
                customFields: {},
                id: 1,
                images: ["/images/products/product-1.jpg", "/images/products/product-1-1.jpg"],
                name: "Electric Planer Brandix KL370090G 300 Watts",
                price: 749,
                rating: 4,
                reviews: 12,
                sku: "83690/32",
                slug: "electric-planer-brandix-kl370090g-300-watts"
            },{
                attributes: [{
                    featured: true,
                    name: "Color",
                    slug: "color",
                    values: [{name: "Yellow", slug: "yellow"}]
                }],
                availability: "in-stock",
                badges: ["new"],
                brand: {name: "Brandix", slug: "brandix", image: "assets/images/logos/logo-1.png"},
                categories: [],
                compareAtPrice: null,
                customFields: {},
                id: 2,
                images: ["/images/products/product-1.jpg", "/images/products/product-1-1.jpg"],
                name: "Electric Planer Brandix KL370090G 300 Watts",
                price: 900,
                rating: 4,
                reviews: 12,
                sku: "83690/32",
                slug: "electric-planer-brandix-kl370090g-300-watts"
            }]
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    page,
                    limit,
                    sort,
                    total,
                    pages,
                    from,
                    to,
                    items,
                    "filters": [{
                        "max": 900,
                        "min": 740,
                        "name": "Ціна",
                        "slug": "price",
                        "type": "range",
                        "value": [740,900]
                    },
                        {
                            "items": [{"slug": "brandix", "name": "Brandix", "count": 1}],
                            "name": "Бренд",
                            "slug": "brand",
                            "type": "check",
                            "value": []
                        },{
                            "items": [{"slug": "color", "name": "Color", "count": 1}],
                            "name": "Бренд",
                            "slug": "color",
                            "type": "check",
                            "value": []
                        }
                    ]
                })
            }, 550)
        })



    },
    /**
     * Returns array of featured products.
     */
    getFeaturedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getFeaturedProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/featured-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        return fetch(`https://`+lang+`.korrekt.com.ua/products/getfeaturedproducts`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        console.log("getFeaturedProducts->",getFeaturedProducts(options))
        return getFeaturedProducts(options)
    },
    /**
     * Returns array of latest products.
     */
    getLatestProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getLatestProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/latest-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        return fetch(`https://`+lang+`.korrekt.com.ua/products/getlatestproducts`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getLatestProducts(options)
    },
    /**
     * Returns an array of top rated products.
     */
    getTopRatedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getTopRatedProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        return fetch(`https://`+lang+`.korrekt.com.ua/products/gettopratedproducts`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getTopRatedProducts(options)
    },
    /**
     * Returns an array of discounted products.
     */
    getDiscountedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getDiscountedProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        return fetch(`https://`+lang+`.korrekt.com.ua/products/getdiscountedproducts`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getDiscountedProducts(options)
    },
    /**
     * Returns an array of most popular products.
     */
    getPopularProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getPopularProducts",options)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        return fetch(`https://`+lang+`.korrekt.com.ua/products/getpopularproducts`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getPopularProducts(options)
    },
    /**
     * Returns search suggestions.
     */
    getSuggestions: (query: string, options: GetSuggestionsOptions = {}): Promise<IProduct[]> => {
        let lang = options.locale
        delete options.locale
        if(typeof lang =="undefined"){
            lang = "ua"
        }
        console.log("getSuggestions",options,lang)
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - screwdriver = query
         * - 5           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/search/suggestions.json?${qs.stringify({ ...options, query })}`)
        //     .then((response) => response.json());
        var URL = Object.assign(options);
        let urlParameters = Object.entries(URL).map(e => e.join('=')).join('&');
        // This is for demonstration purposes only. Remove it and use the code above.
        //console.log("getSuggestions",getSuggestions(query, options))
        return fetch(`https://`+lang+`.korrekt.com.ua/products/getsuggestions?`+urlParameters+"&query="+query)
            .then((response) => response.json());

        return getSuggestions(query, options)
    }
}

export default shopApi
