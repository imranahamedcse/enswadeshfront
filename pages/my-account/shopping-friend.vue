<template lang="">
    <div>
        <p class="h2">My Shopping Friends</p>
        <div class="mt-4 bg-white">
            <div class="md:p-4 p-2 flex">
                <nuxt-link v-for="(menu, index) in menus" :key="index" :to="menu.to">
                    <div :class="$route.path == menu.to ? 'bg-green-3' : ''" class="btn-group hover:bg-green-3">
                        {{ menu.title }}
                    </div>
                </nuxt-link>
            </div>
            <div class="divider"></div>
            <div>
                <nuxt-child />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menus: [
                { title: 'Friend list', to: '/my-account/shopping-friend/friend-list' },
                { title: 'Find friends', to: '/my-account/shopping-friend/find-friend' },
                { title: 'Friend requests', to: '/my-account/shopping-friend/friend-request', },
            ]
        }
    }
}
</script>
