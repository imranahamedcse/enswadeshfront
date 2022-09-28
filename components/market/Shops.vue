<template>
  <div>
    <!-- Shops -->
    <div class="">
      <div class="grid md:grid-cols-2 mb-4">
        <div class="">
          <p class="h2">{{ floor }}</p>
        </div>
        <div class="flex md:justify-end justify-between gap-4">
          <div class="search">
            <i class="search-icon ri-search-line mr-2"></i>
            <input
              @keyup="searchShopByMarket"
              v-model="keyword"
              class="search-input focus:outline-none"
              type="text"
              placeholder="Search shops"
            />
          </div>
          <button
            type="button"
            @click="
              $router.push({
                name: 'shop-create',
                params: {
                  city_id: market.city.id,
                  area_id: market.area.id,
                  market_id: market.id,
                  market_name: market.name,
                },
              })
            "
            class="btn-add focus:outline-none"
          >
            Add Shop
          </button>
        </div>
      </div>
      <div
        v-if="shopss.length === 0"
        class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-3 md:py-8 py-3"
      >
        <div v-for="(shop, i) in shops" :key="i" class="">
          <div @click="setShop(shop.name, shop.slug, shop.id)">
            <NuxtLink
              :to="{
                name: 'shop-slug-id',
                params: { slug: shop.slug, id: shop.id },
              }"
            >
              <img
                class="h-16 w-full"
                :src="
                  shop.logo
                    ? basePath + '/storage/' + shop.logo
                    : require(`~/assets/img/banner_green.png`)
                "
                alt="Image"
              />
              <p
                style="margin-top: -48px"
                class="w-full text-center font-bold text-white text-xl mb-5"
              >
                Shop No: {{ shop.shop_no }}
              </p>
              <img
                class="sm:h-56 h-40 w-full"
                src="~/assets/img/shutter.png"
                alt="Image"
              />
              <p class="w-full text-center font-bold">{{ shop.name }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        v-else
        class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-3 py-8"
      >
        <div v-for="(shop, i) in shopss.data" :key="i" class="">
          <NuxtLink
            :to="{
              name: 'shop-slug-id',
              params: { slug: shop.slug, id: shop.id },
            }"
          >
            <img
              class="h-16 w-full"
              :src="
                shop.logo
                  ? basePath + '/storage/' + shop.logo
                  : require(`~/assets/img/banner_green.png`)
              "
              alt="Image"
            />
            <p
              style="margin-top: -48px"
              class="w-full text-center font-bold text-white text-xl mb-5"
            >
              Shop No: {{ shop.shop_no }}
            </p>
            <img
              class="sm:h-56 h-40 w-full"
              src="~/assets/img/shutter.png"
              alt="Image"
            />
            <p class="w-full text-center font-bold">{{ shop.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      shopss: [],
    }
  },
  props: ['shops', 'basePath', 'market', 'floor', 'floorId'],
  methods: {
    searchShopByMarket: _.debounce(function (e) {
      this.fId == 0
        ? this.$axios.post('/api/shops/search/shops-by-market/', {
            params: {
              keyword: this.keyword,
              id: this.market.id,
              floorId: this.floorId,
            },
          })
        : this.$axios
            .post('/api/shops/search/shops-by-market/', {
              params: {
                keyword: this.keyword,
                id: this.market.id,
                floorId: this.fId,
              },
            })
            .then((res) => {
              this.shopss = res.data.data
            })
    }, 500),

    setShop(name, slug, id) {
      this.visit(id);
      localStorage.setItem('shop', name)
      localStorage.setItem('shop-url', '/shop/' + slug + '/' + id)
    },

    visit(id){
      this.$axios
      .post('/api/shops/visit/', {'shop_id': id,})
      .then((res) => {
        // console.log('success');
      })
    }
  },

  computed: {
    ...mapGetters({
      floorIds: 'floorserchid/floorIds',
    }),
    fId() {
      return this.floorIds
    },
  },
}
</script>
