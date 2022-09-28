<template>
    <div>
        <!-- Breadcrumbs -->
        <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
        
        <p class="text-3xl font-bold mb-4">Shops (1)</p>

        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-3 py-8">
            <div class="">
                <NuxtLink to="">
                    <img class="h-16 w-full" src="~/assets/img/banner_green.png" alt="Image">
                    <p style="margin-top: -48px;" class="w-full text-center font-bold text-white text-xl mb-5">01</p>
                    <img class="sm:h-56 h-40 w-full" src="~/assets/img/shutter.png" alt="Image">
                    <p class="w-full text-center font-bold lg:text-xl">Shop name gose hear</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue';
export default {
    components: {
        Breadcrumb,
    },
    data() {
        return {
            breadCrumbs: [
                {title: 'My Shop', url: '/'},
                {title: 'Own Shop', url: ''},
            ],
        };
    },
}
</script>
