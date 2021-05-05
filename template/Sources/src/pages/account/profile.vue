<template>
    <AccountLayout>
        <div class="card">
            <div class="card-header">
                <h5>{{$t('Profile.EditProfile')}}</h5>
            </div>
            <div class="card-divider" />
            <div class="card-body">
                <div class="row no-gutters">
                    <div class="col-12 col-lg-7 col-xl-6">
                        <div class="form-group">
                            <label for="profile-first-name">{{$t('checkout.FirstName')}}</label>
                            <input
                                id="profile-first-name"
                                type="text"
                                class="form-control"
                                :placeholder="$t('checkout.FirstName')"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-last-name">{{$t('checkout.LastName')}}</label>
                            <input
                                id="profile-last-name"
                                type="text"
                                class="form-control"
                                :placeholder="$t('checkout.LastName')"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-email">{{$t('checkout.EmailAddress')}}</label>
                            <input
                                id="profile-email"
                                type="email"
                                class="form-control"
                                :placeholder="$t('checkout.EmailAddress')"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-phone">{{$t('checkout.Phone')}}</label>
                            <input
                                id="profile-phone"
                                type="text"
                                class="form-control"
                                :placeholder="$t('checkout.Phone')"
                            >
                        </div>

                        <div class="form-group mt-5 mb-0">
                            <button type="button" class="btn btn-primary">
                                {{$t('Profile.Save')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AccountLayout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AccountLayout from '~/components/account/account-layout.vue'

@Component({
    components: { AccountLayout },
    head: { title: 'Profile' }
})
export default class Page extends Vue { }

</script>
