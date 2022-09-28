<template>
    <div>
        <div class="p-4">
            <div class="search">
                <i class="search-icon ri-search-line"></i>
                <input type="text" class="search-input w-full focus:outline-none" placeholder="Search">
            </div>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:px-4 px-2">
            <div v-for="(shop, index) in shops" :key="index">
                <div class="relative">
                    <nuxt-link :to="{
                        name: 'shop-slug-id',
                        params: { slug: shop.shop.slug, id: shop.shop.id },
                    }">
                        <img class="h-16 w-full" :src="shop.shop.logo != null ? basePath + '/storage/' + shop.shop.logo : '~/assets/img/banner_green.png'" alt="Image"/>
                        <p class="absolute top-0 mt-4 w-full text-center font-bold text-white text-xl mb-5" >Shop No: {{ shop.shop.shop_no }}</p>
                        <img class="sm:h-56 h-40 w-full" src="~/assets/img/shutter.png" alt="Image" />
                        <p class="w-full text-center font-bold">{{ shop.shop.name }}</p>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <!-- <div class="p-4 flex justify-center">
            <button class="btn-border hover:bg-green-3 focus:outline-none">View more</button>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            basePath: this.$axios.defaults.baseURL,
            shops: []
        }
    },
    created(){
        this.recentlyVisit();
    },
    methods: {
        recentlyVisit(){
            this.$axios
            .get('api/recently-visit-shop-list')
            .then((res) => {
                this.shops = res.data;
                console.log(this.shops)
            })
            .catch((error) => {
                this.$toast.error('Oops..! Something wrong..!');
            })
        }
    }
}
</script>