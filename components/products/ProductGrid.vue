<template>
  <div>
    <div class="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-3 pt-6 pb-12">
      <div
        class="mb-8 cursor-pointer"
        v-for="(item, i) in products"
        :key="i"
      >
        <div @click="showModal(item.product, item.product.name, item.product.slug, item.product.id)" class="cursor-pointer h-full mb-10">
          <div class="h-full">
            <div class="">
              <img
                class="h-52 w-full"
                :src="
                  item.product.thumbnail
                    ? basePath + '/storage/' + item.product.thumbnail
                    : require(`~/assets/img/products/default.png`)
                "
                alt="Image"
              />
            </div>
            <p class="font-bold pt-2">{{ item.product.name }}</p>
            <p class="">{{ item.product.color }}</p>

            <p v-if="item.product.sizes.length > 0" class="font-bold">
            <span
              >{{ item.product.lowsizeprice ? item.product.lowsizeprice.price : '' }} -
              {{ item.product.highsizeprice ? item.product.highsizeprice.price : '' }}
              {{ item.product.currency_type }}</span
            >
          </p>

          <p v-else-if="item.product.weights.length > 0" class="font-bold">
            <span
              >{{ item.product.lowweightprice ? item.product.lowweightprice.price : '' }}
              -
              {{ item.product.highweightprice ? item.product.highweightprice.price : '' }}
              {{ item.product.currency_type }}</span
            >
          </p>

          <p v-else class="font-bold">
            <span
              >{{ item.product.discount_price }} {{ item.product.currency_type }}</span
            >
            <span v-if="item.product.discount" class="text-gray-4 ml-4 line-through"
              >{{ item.product.price }} {{ item.product.currency_type }}</span
            >
          </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <product-details
      v-if="modal"
      :product="productm"
      :basePath="basePath"
      v-on:product-modal="closeModal($event)"
    ></product-details>
  </div>
</template>

<script>
  import ProductDetails from '~/components/product-details/Product-details.vue'
  export default ({
    components: {
      ProductDetails,
    },
    data() {
      return {
        modal: false,
      }
    },
    props:['products', 'basePath'],

    methods: {
      showModal(product, name, slug, id) {
        this.productm = Object.assign({}, product)
        this.modal = true
        localStorage.setItem('product', name)
        localStorage.setItem('product-url', '/product/' + slug + '/' + id)
      },
      closeModal(e) {
        this.modal = e
      },
    }

  })
</script>

