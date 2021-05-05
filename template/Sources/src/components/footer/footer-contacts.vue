<template>
    <div class="site-footer__widget footer-contacts">
        <h5 class="footer-contacts__title">
            {{$t("footer.Contact")}}
        </h5>

        <div class="footer-contacts__text">
            {{$t("footer.ContactDesc")}}
        </div>

        <ul class="footer-contacts__contacts">
            <li>
                <i class="footer-contacts__icon fas fa-globe-americas" />
                {{ theme.contacts.address }}
            </li>
            <li>
                <i class="footer-contacts__icon far fa-envelope" />
                {{ theme.contacts.email }}
            </li>
            <li>
                <i class="footer-contacts__icon fas fa-mobile-alt" />
                {{ theme.contacts.phone }}
            </li>
            <li>
                <i class="footer-contacts__icon far fa-clock" />
                {{$t("footer.MonSat")}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import theme from '~/data/theme'

@Component
export default class FooterContacts extends Vue {
    theme = theme
    async mounted(){
        const themes = await fetch(`https://`+this.$store.getters['locale/language'].locale+`.korrekt.com.ua/themes-get`).then((response) => response.json());
        this.theme = themes
        //console.log(themes)
    }
}

</script>
