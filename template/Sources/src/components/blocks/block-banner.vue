<template>
    <div class="block block-banner">
        <div class="container">
            <AppLink to="/" class="block-banner__body">
                <div
                    class="block-banner__image block-banner__image--desktop"
                    :style="{
                        backgroundImage: `url(${$url.img('/images/banners/banner-1.jpg')})`
                    }"
                />
                <div
                    class="block-banner__image block-banner__image--mobile"
                    :style="{
                        backgroundImage: `url(${$url.img('/images/banners/banner-1-mobile.jpg')})`
                    }"
                />
                <div class="block-banner__title">
                    {{$t('home.block.banner.title1')}}

                    <br class="block-banner__mobile-br">
                    {{$t('home.block.banner.title2')}}

                </div>
                <div class="block-banner__text">
                    {{$t('home.block.banner.text')}}
                </div>
                <div class="block-banner__button">
                    <span class="btn btn-sm btn-primary">{{$t('home.block.banner.button')}}</span>
                </div>
            </AppLink>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class BlockBanner extends Vue { }

</script>
