<template lang="">
    <div>
        <div class="min-h-screen">
            <div class="relative pb-1/5">
                <img class="absolute w-full h-full object-cover" src="~/assets/img/earn_banner.png" alt="">
                <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white">
                    <div class="text-center">
                        <p class="font-bold text-3xl">Write here why need to earn in 1 line</p>
                        <p>If possible write here how to earn coin and how to people</p>
                        <p>use this coin in swadesh. Maximum two line.</p>
                    </div>
                </div>
            </div>
            <div class="my-4 flex justify-around gap-1">
                <nuxt-link v-for="(menu, i) in menus" :key="i" :class="$route.path == menu.url ? 'bg-green-3' : ''" class="bg-white font-semibold py-4 w-full text-center border border-gray-3 hover:bg-green-3" :to="menu.url">{{ menu.name }}</nuxt-link>
            </div>

            <NuxtChild />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menus: [
                {name:'Creativity', url: '/earn/creativity'},
                {name:'Make shopping friends', url: '/'},
                {name:'Visit shops', url: '/'},
                {name:'Refer to friends', url: '/'},
            ],
        }
    },
}
</script>