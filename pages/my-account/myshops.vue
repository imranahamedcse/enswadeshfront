<template>
  <div>
    <div class="flex justify-between md:px-4 px-2">
      <p class="md:h2 h3">My Shops</p>
      <button
        v-if="$auth.user.owner_id == 1"
        @click="$router.push({ name: 'shop-create' })"
        class="btn-add focus:outline-none"
      >
        Add Shop
      </button>
    </div>

    <div v-if="isLoading" class="text-center">
      <loader></loader>
    </div>
    <div
      v-else
      class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-4 p-2"
    >
      <div v-for="(item, index) in myshops" :key="index">
        <div class="relative target-area">
          <img
            class="h-16 w-full"
            :src="
              item.logo
                ? basePath + '/storage/' + item.logo
                : require(`~/assets/img/banner_green.png`)
            "
            alt="Image"
          />
          <p
            class="absolute top-0 mt-4 w-full text-center font-bold text-white text-xl mb-5"
          >
            {{ item.shop_no }}
          </p>
          <img
            class="sm:h-56 h-40 w-full"
            src="~/assets/img/shutter.png"
            alt="Image"
          />
          <p class="w-full text-center font-bold">{{ item.name }}</p>

          <div
            class="hover-area absolute top-0 left-0 bottom-0 right-0 bg-gray-2 opacity-50"
          ></div>
          <div
            class="hover-area absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
          >
            <button
              @click="
                $router.push({
                  name: 'shop-control-panel-id',
                  params: { id: item.id },
                })
              "
              class="btn-border focus:outline-none bg-green-3 mb-4"
            >
              Control Room
            </button>
            <NuxtLink
              :to="'/shop/self/' + item.id"
              class="btn-border focus:outline-none"
              >Visit Shop</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/lib/Loader.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Loader,
  },
  data() {
    return {
      shops: [],
      basePath: '',
      isLoading: false,
    }
  },
  created() {
    this.basePath = this.$axios.defaults.baseURL
    this.myShopsData()
  },
  computed: {
    ...mapGetters('shops', ['myshops']),
  },
  methods: {
    ...mapActions('shops', ['myShopsData']),
  },
}
</script>
