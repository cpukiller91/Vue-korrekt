<template>
    <div class="site-footer__widget footer-newsletter">
        <h5 class="footer-newsletter__title">
            {{$t("footer.newsletter")}}
        </h5>
        <div class="footer-newsletter__text">
            {{$t("footer.praesent")}}
        </div>

        <form action="" class="footer-newsletter__form">
            <label class="sr-only" for="footer-newsletter-address">{{$t("footer.EmailAddress")}}</label>
            <input
                id="footer-newsletter-address"
                class="footer-newsletter__form-input form-control"
                type="text"
                :placeholder="$t('footer.EmailAddress')"
            >

            <button class="footer-newsletter__form-button btn btn-primary">
                {{$t("footer.Subscribe")}}
            </button>
        </form>

        <div class="footer-newsletter__text footer-newsletter__text--social">
            {{$t("footer.Follow")}}
        </div>

        <social-links class="footer-newsletter__social-links" shape="circle" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SocialLinks from '~/components/shared/social-links.vue'

@Component({
    components: { SocialLinks }
})
export default class FooterNewsletter extends Vue { }

</script>
