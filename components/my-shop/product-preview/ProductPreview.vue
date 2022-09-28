<template>
  <div>
    <div
      @click="closeModal"
      class="fixed inset-0 z-50 flex flex-col justify-center items-center xl:m-10 m-2"
    >
      <div @click="wait" class="focus-in max-w-screen-xl shadow-lg bg-white overflow-auto">
        <div class="md:col-span-4">
            <div class="w-full text-right pr-1 md:bg-white bg-green-4 md:text-green-4 text-white">
              <button
                @click="closeModal"
                class="text-2xl focus:outline-none"
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
            <div class="md:p-6 p-2">
              <div class="grid sm:grid-cols-7 lg:gap-12 md:gap-4 sm:gap-2 py-4">
                <div class="sm:col-span-2">
                    <div class="relative pb-full">
                        <img
                          class="absolute h-full w-full object-cover"
                          :src="
                            getProductPreviewData.thumb_url
                              ? getProductPreviewData.thumb_url
                              : require(`~/assets/img/products/default.png`)
                          "
                          alt="Image"
                        />
                    </div>
                        <div class="grid grid-cols-4 gap-2 mt-2">
                        <div class="relative pb-3/4" v-for="(photo, i) in getProductPreviewData.gallary_images_url" :key="i">
                            <img class="absolute h-full w-full object-cover" :src="photo" alt="">
                        </div>
                    </div>
                </div>
                <div class="sm:col-span-3 sm:mt-0 mt-4">
                    <p class="font-bold text-2xl mb-2">{{ getProductPreviewData.name }}</p>
                    <!-- <div class="flex items-center gap-8">
                        <p class="bg-green-4 px-2 py-1 text-white inline">
                            4.5<i class="ri-star-fill ml-2 text-yellow-2"></i>
                        </p>
                        <p class="font-semibold text-blue-1">Rate this product</p>
                    </div> -->
                    Product type : {{ getProductPreviewData.product_type }}
                    <table class="w-full mt-4">
                        <tbody>
                            <tr>
                                <td>Price:</td>
                                <td class="font-semibold">
                                  <span>{{getProductPreviewData.price}} {{getProductPreviewData.currency_type}}</span>
                                  <!-- <span class="text-gray-4 ml-4 line-through">90 TK</span> -->
                                </td>
                            </tr>
                            <!-- <tr v-if="getProductPreviewData.product_type == 'size_wise'">
                              <td>Stock:</td>
                              <td
                                v-if="getProductPreviewData.stocks > 0 || sizeStocks > 0"
                                class="font-semibold"
                              >
                                Available
                              </td>
                              <td v-else class="text-red-500 font-semibold">Unavailable</td>
                            </tr> -->
                            <!--
                            <tr v-else-if="product.weights.length > 0">
                              <td>Stock:</td>
                              <td v-if="product.stocks > 0" class="font-semibold">
                                Available
                              </td>
                              <td v-else class="text-red-500 font-semibold">Unavailable</td>
                            </tr> -->
                            <tr>
                              <td>Stock:</td>
                              <td v-if="getProductPreviewData.stocks > 0" class="font-semibold">
                                Available
                              </td>
                              <td v-else class="text-red-500 font-semibold">Unavailable</td>
                            </tr>
                            <!-- <tr>
                                <td>Brand:</td>
                                <td> </td>
                            </tr> -->
                            <tr>
                                <td>SKU:</td>
                                <td class="font-semibold">{{getProductPreviewData.sku}}</td>
                            </tr>

                            <!-- <tr class="my-3" v-if="getProductPreviewData.sizes.length > 0">
                              <td>Select Size:</td>
                              <td>
                                <span v-for="(size, k) in getProductPreviewData.sizes" :key="k">
                                  <span
                                    @click="selectSize(size)"
                                    :class="size.size == selectedSize ? 'bg-green-3' : ''"
                                    class="p-1 text-center cursor-pointer border mr-3"
                                  >
                                    {{ size.size }}
                                  </span>
                                </span>
                              </td>
                            </tr> -->
                        </tbody>
                    </table>
                    <div>
                      <p class="font-semibold mt-4">Available Offers</p>
                      <ul>
                          <li><p>{{getProductPreviewData.offers}}</p></li>
                      </ul>
                    </div>
                    <p class="font-semibold mt-4 mb-2">Quantity</p>
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <div class="grid grid-cols-4 rounded border border-gray-3 font-semibold">
                            <button @click="minus" class="focus:outline-none bg-gray-3 rounded-l text-xl flex items-center justify-center">
                                <i class="ri-subtract-line"></i>
                            </button>
                            <div class="col-span-2 text-center py-1">
                                {{ quantity }}
                            </div>
                            <button @click="plus" class="focus:outline-none bg-gray-3 rounded-r text-xl flex items-center justify-center">
                                <i class="ri-add-fill"></i>
                            </button>
                        </div>
                    </div>
                    <p class="font-semibold text-purple-2 mt-4">Deliver Offer: {{getProductPreviewData.delivery_offer}}</p>
                </div>
                <div class="sm:col-span-2 sm:mt-0 mt-4">
                    <p class="font-bold">Audio Description</p>
                    <div class="flex items-center">
                        <i class="ri-play-circle-fill mr-2 text-orange-1 text-xl"></i>
                        <audio controls>
                            <source :src="getProductPreviewData.audio_url">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    <p class="font-bold mt-4">Video Description</p>
                    <div class="border-2 border-green-4">
                        <iframe width="300" height="250" :src="getProductPreviewData.video_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <button class="block font-semibold py-2 bg-blue-2 text-white rounded w-full mt-4 focus:outline-none">
                        <div class="flex items-center justify-center">
                            <i class="ri-facebook-fill mr-2"></i>
                            Share on Facebook
                        </div>
                    </button>
                </div>
              </div>

              <!-- Tabs -->
              <tab :showTab="showTab" :tabs="tabs"></tab>

            </div>
        </div>
      </div>
    </div>
    <div
      @click="closeModal"
      class="opacity-50 fixed inset-0 z-40 bg-green-4"
    ></div>
  </div>
</template>
<script>
import Tab from '~/components/common/Tab.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      close_modal: 'closeModal',
      quantity: 1,
      showTab: 'Informations',
      tabs:[
        {name: 'Informations',view: 'Informations'},
        {name: 'Feature',view: 'Feature'},
      ],
      selectedSize: 0,
      selectedWeight: 0,
      sizePrice: '',
      sizeStocks: '',
      weightPrice: '',
      weightStocks: '',

    }
  },
  components: {
    Tab,
  },
  methods: {
    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.$emit('closePreviewModal')
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },
    plus(){
        this.quantity += 1;
    },
    minus(){
        if(this.quantity > 0)
            this.quantity -= 1;
    },
     selectSize(size) {
      this.selectedSize = size.size
      this.sizePrice = size.price
      this.sizeStocks = size.stocks
      // alert(size.size)
    },
    selectWeight(weight) {
      this.selectedWeight = weight.weight
      this.weightPrice = weight.price
      this.weightStocks = weight.stocks
    },

  },
  computed: {

    // ...mapGetters('brand', ['brands']),
    ...mapGetters('products', ['getProductPreviewData']),

    // getBrand() {
    //   return this.brands.filter(brand => {
    //     console.log(brand.id === this.getProductPreviewData.brand_id)
    //   })
    // },
  },
}
</script>
