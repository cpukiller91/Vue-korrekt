<template>
    <Layout>
        <nuxt :dataHeaderDepartments="brands"/>
    </Layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import Layout from '~/components/layout.vue'
import { Context } from '@nuxt/types'

@Component({
    components: { Layout }
})
export default class DefaultLayout extends Vue {
    brands={}
    async asyncData (context: Context) {
        const brands = fetch(`https://strapi.api.hosteam.pro/brands/mod`).then((response) => response.json());
        return {
            brands:brands
        }
    }
}

</script>
