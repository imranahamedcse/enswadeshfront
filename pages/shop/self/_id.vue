<template>
  <div>
    <!-- Breadcrumbs -->
    <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>

    <div class="shop market grid grid-cols-2 gap-3">
      <!-- Add photo -->
      <add-photo :cover_image="cover_image" :basePath="basePath"></add-photo>

      <!-- Shop details -->
      <my-shop-details :shop="shop"></my-shop-details>
    </div>

    <!-- Photos -->
    <slider
      :slider_images="slider_images"
      :basePath="basePath"
      class="mb-8 mt-8"
    ></slider>

    <!-- Tabs -->
    <tab :showTab="showTab" :tabs="tabs"></tab>
  </div>
</template>

<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import Slider from '~/components/shop/Slider.vue'
import AddPhoto from '~/components/my-shop/AddPhoto.vue'
import MyShopDetails from '~/components/my-shop/MyShopDetails.vue'
import Tab from '~/components/common/Tab.vue'

export default {
  middleware: ['auth'],

  components: {
    Breadcrumb,
    Slider,
    AddPhoto,
    MyShopDetails,
    Tab,
  },

  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      breadCrumbs: [
        { title: 'Home', url: '/' },
        { title: 'My Shop', url: '' },
        { title: 'Shop name goes to here', url: '' },
      ],
      showTab: 'Products',
      tabs: [
        { name: 'Products', view: 'Products' },
        { name: 'Orders', view: 'Orders' },
        { name: 'Tutorials', view: 'Tutorials' },
        { name: 'Calculator', view: 'Calculator' },
      ],
      shop: '',
      cover_image: '',
      products: [],
      slider_images: [],
    }
  },

  created() {
    this.loadShop()
  },

  computed: {
    set() {
      this.$store.commit('shopstatus/add', this.shop.status)
      this.$store.commit('shopstatus/setID', this.$route.params.id)
    },
  },
  methods: {
    async loadShop() {
      await this.$axios
        .get('/api/my-shops/' + this.$route.params.id)
        .then((res) => {
          this.shop = res.data.data
          this.cover_image = this.shop.cover_image
          this.slider_images = this.shop.shop_gallery
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },
  },
}
</script>
