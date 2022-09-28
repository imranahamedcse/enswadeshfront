<template>
    <div>
        <!-- Breadcrumbs -->
        <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
        
        <p class="text-3xl font-bold mb-4">Shops (1)</p>

        <div class="p-8 bg-green-6 text-center mb-6">
            <p class="text-3xl font-bold">Your shop is verified by our team</p>
        </div>
        <p class="text-center font-bold mb-6">Your store will appear here after setup.</p>
        <div class="flex justify-center mb-6">
            <button class="font-semibold border border-gray-3 py-1 px-16 focus:outline-none bg-green-3 rounded">Setup Now</button>
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
