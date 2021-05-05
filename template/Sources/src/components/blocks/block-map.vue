<template>
    <div class="block-map block">
        <div class="block-map__body">
            <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=Горькая Полонка, Волынская область;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BlockMap extends Vue { }

</script>
