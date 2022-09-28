<template>
  <div>
    <div>
      <markets
        :cols="cols"
        :markets="alls[0].data ? alls[0].data : []"
        :isLoading="isLoading"
      ></markets>
    </div>
    <div>
      <p class="text-2xl font-bold">Shops search result</p>
      <div
        v-if="alls[1].data ? alls[1].data.length > 0 : 0"
        class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-3 py-8"
      >
        <div v-for="(shop, i) in alls[1].data" :key="i" class="">
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
              {{ shop.shop_no }}
            </p>
            <img
              class="sm:h-40 h-32 w-full"
              src="~/assets/img/shutter.png"
              alt="Image"
            />
            <p class="w-full text-center font-bold">{{ shop.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <h1 class="font-bold text-center text-red-400">No result found!</h1>
      </div>
    </div>
    <div>
      <p class="text-2xl font-bold">Products search result</p>
      <div
        v-if="alls[2].data ? alls[2].data.length > 0 : 0"
        class="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-3 pt-6 pb-12"
      >
        <div class="mb-8" v-for="(product, i) in alls[2].data" :key="i">
          <div @click="showModal(product)" class="cursor-pointer h-full mb-10">
            <div class="">
              <img
                class="h-52 w-full"
                :src="
                  product.thumbnail
                    ? basePath + '/storage/' + product.thumbnail
                    : require(`~/assets/img/products/default.png`)
                "
                alt="Image"
              />
            </div>
            <p class="font-bold pt-2">{{ product.name }}</p>
            <p class="">{{ product.color }}</p>
            <p class="font-bold">{{ product.price }} BDT</p>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="font-bold text-center text-red-400">No result found!</h1>
      </div>
      <!-- Product Details -->
      <product-details
        v-if="modal"
        :product="productm"
        :basePath="basePath"
        v-on:product-modal="closeModal($event)"
      ></product-details>
    </div>
  </div>
</template>

<script>
import ProductDetails from '~/components/product-details/Product-details.vue'
import Markets from '~/components/markets/Market.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      productm: {},
      basePath: '',
      modal: false,
      cols: 'lg:grid-cols-4',
      imageUrl: this.$axios.imageURL,
    }
  },

  components: {
    ProductDetails,
    Markets,
  },

  mounted() {
    this.basePath = this.$axios.defaults.baseURL
    this.loadSearch()
  },

  methods: {
    ...mapActions('search', ['loadSearch']),
    showModal(product) {
      this.productm = Object.assign({}, product)
      this.modal = true
    },
    closeModal(e) {
      this.modal = e
    },
  },

  computed: {
    ...mapGetters({
      alls: 'search/result',
      isLoading: 'search/isLoading',
    }),
  },
}
</script>

<style></style>
