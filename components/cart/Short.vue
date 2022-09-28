<template>
  <div>
    <div
      @click="closeCart"
      class="fixed inset-0 z-50 flex flex-col items-end max-w-screen-xl xl:px-10 px-2 m-auto py-12 mt-4"
    >
      <div
        @click="wait"
        class="focus-in max-w-sm shadow-lg p-4 border border-gray-3 bg-white overflow-auto"
      >
        <div class="w-full text-right">
          <button @click="closeCart" class="text-2xl focus:outline-none">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <p class="font-bold text-xl mb-6 text-center">
          Here's what's in your bag.
        </p>
        <table v-if="products.length > 0">
          <tr class="font-semibold">
            <td>Product</td>
            <td><div class="mx-2">Quantity</div></td>
            <td>Price</td>
            <td></td>
          </tr>
          <tr
            v-for="(product, i) in products"
            :key="i"
            class="border-t border-gray-3"
          >
            <td>
              <div class="flex">
                <img
                  class="w-12 h-12 mr-2"
                  :src="
                    product.thumbnail
                      ? basePath + '/storage/' + product.thumbnail
                      : require(`~/assets/img/products/default.png`)
                  "
                  alt=""
                />
                <p>
                  <span class="font-semibold">{{ product.name }}</span
                  ><br /><span class="text-gray-4"
                    >{{ product.count }} PCS</span
                  >
                  <span v-if="product.size" class="text-gray-4"
                    >Size: {{ product.size }}</span
                  >
                  <span v-if="product.weight" class="text-gray-4"
                    >Weight: {{ product.weight }}</span
                  >
                </p>
              </div>
            </td>
            <td>
              <div
                class="flex flex-col rounded border border-gray-3 w-8 text-center m-auto my-1"
              >
                <button
                  @click="
                    removeItemQtn(
                      product,
                      product.count,
                      product.size,
                      product.weight
                    )
                  "
                  class="focus:outline-none bg-gray-3 rounded-t flex items-center justify-center"
                >
                  <i class="ri-subtract-line"></i>
                </button>
                <p>{{ product.count }}</p>
                <button
                  @click="
                    addItemQtn(
                      product,
                      product.count,
                      product.size,
                      product.weight
                    )
                  "
                  class="focus:outline-none bg-gray-3 rounded-b flex items-center justify-center"
                >
                  <i class="ri-add-fill"></i>
                </button>
              </div>
            </td>
            <td class="font-semibold">{{ product.price * product.count }}</td>
            <td>
              <button
                @click="removeProduct(product.id)"
                class="focus:outline-none text-xl text-gray-4"
              >
                <i class="ri-delete-bin-2-line"></i>
              </button>
            </td>
          </tr>
          <tr class="border-t border-gray-3">
            <td colspan="2"><p class="font-bold my-3">Subtotal</p></td>
            <td colspan="2">
              <p class="text-orange-1 font-bold">&#2547; {{ totalPrice }}</p>
            </td>
          </tr>
          <tr class="border-t border-gray-3">
            <td colspan="4">
              <div class="mt-4">
                <n-link to="/cart"
                  ><button
                    @click="closeCart"
                    class="btn border-green-3 focus:outline-none"
                  >
                    View cart
                  </button></n-link
                >

                <n-link to="/checkout"
                  ><button
                    @click="closeCart"
                    class="btn bg-green-3 ml-4 focus:outline-none"
                  >
                    Checkout
                  </button></n-link
                >
              </div>
            </td>
          </tr>
        </table>
        <div v-else>
          <img class="m-auto h-24" src="~/assets/img/empty.png" alt="Image" />
          <p class="font-bold text-center">
            Your shopping bag is currently empty
          </p>
        </div>
      </div>
    </div>
    <div @click="closeCart" class="fixed inset-0"></div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      close_modal: 'closeModal',
      basePath: null,
    }
  },

  mounted() {
    this.addToBuy()
    this.basePath = this.$axios.defaults.baseURL
  },

  methods: {
    closeCart() {
      if (this.close_modal == 'closeModal') {
        this.$emit('closeCart')
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },

    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
      productRemove: 'addtobag/productRemove',
    }),

    addToBuy() {
      var productsadd = localStorage.getItem('addproducts')
        ? JSON.parse(localStorage.getItem('addproducts'))
        : []
      for (let index = 0; index < productsadd.length; index++) {
        const item = productsadd[index]
        const qtn = productsadd[index].count
        const size = productsadd[index].size
        const weight = productsadd[index].weight
        this.addProduct({ item, qtn, size, weight })
      }
    },

    addItemQtn(item, qt, size, weight) {
      console.log(qt)
      const qtn = qt + 1
      this.addProduct({ item, qtn, size, weight })
    },
    removeItemQtn(item, qt, size, weight) {
      const qtn = qt - 1
      this.addProduct({ item, qtn, size, weight })
    },
    removeProduct(id) {
      this.productRemove(id)
    },
  },

  computed: {
    ...mapGetters({
      addproducts: 'addtobag/addproducts',
    }),

    products() {
      return this.addproducts
    },

    totalCount() {
      let sum = 0
      _.each(this.addproducts, (p) => {
        sum += p.count
      })
      return sum
    },

    totalPrice() {
      let sum = 0
      _.each(this.addproducts, (p) => {
        sum += p.count * p.price
      })
      return sum
    },
  },
}
</script>
