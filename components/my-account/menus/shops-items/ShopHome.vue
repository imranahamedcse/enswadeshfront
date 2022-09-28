<template lang="">
    <div>
        <p class="h2">Shops</p>
        <div class="mt-4 bg-white">
            <div class="p-4 flex">
                <div @click="subscribedShops" :class="subscribed_shops ? 'bg-green-3':''" class="btn-group rounded-l hover:bg-green-3">
                    Subscribed shops
                </div>
                <div @click="frequentlyVisited" :class="frequently_visited ? 'bg-green-3':''" class="btn-group hover:bg-green-3">
                    Frequently visited
                </div>
                <div @click="recentlyVisited" :class="recently_visited ? 'bg-green-3':''" class="btn-group rounded-r hover:bg-green-3">
                    Recently visited
                </div>
            </div>
            <div class="divider"></div>
            <frequently v-if="frequently_visited"></frequently>
            <recently v-if="recently_visited"></recently>
            <subscribed-shops v-if="subscribed_shops"></subscribed-shops>
        </div>
    </div>
</template>
<script>
import Frequently from '~/components/my-account/menus/shops-items/items/Frequently';
import Recently from '~/components/my-account/menus/shops-items/items/Recently';
import SubscribedShops from '~/components/my-account/menus/shops-items/items/SubscribedShops';
export default {
    data() {
        return {
            subscribed_shops: true,
            frequently_visited: false,
            recently_visited: false,
        }
    },
    components: {
        Frequently,
        Recently,
        SubscribedShops,
    },
    methods: {
        subscribedShops(){
            this.subscribed_shops = true;
            this.frequently_visited = false;
            this.recently_visited = false;
        },
        frequentlyVisited(){
            this.subscribed_shops = false;
            this.frequently_visited = true;
            this.recently_visited = false;
        },
        recentlyVisited(){
            this.subscribed_shops = false;
            this.frequently_visited = false;
            this.recently_visited = true;
        },
    }
}
</script>