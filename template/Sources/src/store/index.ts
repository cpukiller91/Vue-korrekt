import { OffcanvasCartState } from '~/store/offcanvasCart'
import { MobileMenuState } from '~/store/mobileMenu'
import { OptionsState } from '~/store/options'
import { CurrencyState } from '~/store/currency'
import { QuickviewState } from '~/store/quickview'
import { WishlistState } from '~/store/wishlist'
import { CartState } from '~/store/cart'
import { LocaleState } from '~/store/locale'
import { ShopState } from '~/store/shop'
import { ActionTree } from 'vuex'

export interface RootState {
    cart: CartState;
    offcanvasCart: OffcanvasCartState;
    mobileMenu: MobileMenuState;
    options: OptionsState;
    currency: CurrencyState;
    quickview: QuickviewState;
    wishlist: WishlistState;
    locale: LocaleState;
    shop: ShopState;
}

export const actions: ActionTree<any, any> = {
    async nuxtServerInit({ dispatch }) {
        dispatch('menu/nuxtServerInit')
        dispatch('shop/nuxtServerInit')
        dispatch('departments/nuxtServerInit')
        dispatch('category/nuxtServerInit')
    }
}

