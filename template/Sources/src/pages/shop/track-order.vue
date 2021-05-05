<template>
    <div>
        <PageHeader
            :breadcrumb="[
                { title: $t('home.title'), url: '/' },
                { title: $t('checkout.TrackOrder'), url: '' },
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-5 col-lg-6 col-md-8">
                        <div class="card flex-grow-1 mb-0 mt-lg-4 mt-md-3 mt-2">
                            <div class="card-body">
                                <div class="card-title text-center">
                                    <h1 class="pt-lg-0 pt-2">
                                        {{$t('checkout.TrackOrder')}}
                                    </h1>
                                </div>
                                <p class="mb-4 pt-2">
                                    {{$t('checkout.TrackOrderDesc')}}
                                </p>
                                <form>
                                    <div class="form-group">
                                        <label for="track-order-id">{{$t('checkout.OrderID')}}</label>
                                        <input
                                            id="track-order-id"
                                            class="form-control"
                                            type="text"
                                            :placeholder="$t('checkout.OrderID')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="track-email">{{$t('checkout.EmailAddress')}}</label>
                                        <input
                                            id="track-email"
                                            class="form-control"
                                            type="email"
                                            :placeholder="$t('checkout.EmailAddress')"
                                        >
                                    </div>
                                    <div class="pt-3">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                                            {{$t('header.topbar.trackorder')}}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'

@Component({
    components: { PageHeader },
    head () {
        return {
            title: 'Track Order'
        }
    }
})
export default class Page extends Vue { }

</script>
