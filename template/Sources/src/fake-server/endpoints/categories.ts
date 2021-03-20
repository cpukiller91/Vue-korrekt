import { categoriesTreeData, categoriesListData, prepareCategory } from '../database/categories'
import { IShopCategory } from '~/interfaces/category'
import {Vue} from "vue-property-decorator";

export interface GetCategoriesOptions {
    depth?: number;
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export function getCategories (options: GetCategoriesOptions = {}): Promise<IShopCategory[]> {
    return Promise.resolve(
        categoriesTreeData.map(x => prepareCategory(x, options.depth))
    )
}

export function getCategoryBySlug (slug: string, options: GetCategoryBySlugOptions = {}): Promise<IShopCategory> {
    const category = categoriesListData.find(x => x.slug === slug)

    return category ? Promise.resolve(prepareCategory(category, options.depth)) : Promise.reject(new Error())
}
// export class localeApi extends Vue {
//     //locale:string = this.$store.getters['locale/language'].locale
//     dataGet(){
//         return this.$store.getters['locale/language'].locale
//     }
//     // locale:[] = []
//     // static async asyncData (context: Context) {
//     //     console.log("asyncData==>",context.store.getters['locale/language'].locale)
//     //    return context.store.getters['locale/language'].locale
//     //
//     // }
//     //
//
// }
