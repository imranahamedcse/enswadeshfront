<template>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between items-center bg-green-1 p-4"
    >
      <div>
        <p class="h3">My Orders</p>
        <p>Total Order: {{ orders.length }}</p>
      </div>
      <div class="flex items-center justify-center">
        <p class="h2 mr-2">Status:</p>
        <select
          @change="loadOrdersByStatus"
          class="input-field focus:outline-none bg-green-1 font-semibold"
        >
          <option selected value="null">Select Any</option>
          <option value="0">Canceled</option>
          <option value="1">Pending</option>
          <option value="2">Processing</option>
          <option value="3">Delivery</option>
          <option value="4">Complete</option>
          <option value="5">Refund</option>
        </select>
      </div>
    </div>
    <div v-if="orders.length > 0">
      <div class="bg-white p-4" v-for="order in orders" :key="order.index">
        <p class="h3 mb-4">
          Your order ID:
          <span class="text-orange-1">{{ order.order_no }}</span> ({{
            order.order_items ? order.order_items.length : ''
          }}
          Items)
        </p>
        <p :class="order" class="warning-alart inline mb-4">
          {{ order.status }}
        </p>
        <div
          class="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 md:mb-4 mb-2"
        >
          <div v-for="(item, index) in order.order_items" :key="index">
            <div class="pb-full relative mt-4">
              <img
                :src="
                  item.product.thumbnail
                    ? basePath + '/storage/' + item.product.thumbnail
                    : require(`~/assets/img/products/default.png`)
                "
                alt="Image"
                class="absolute w-full h-full object-cover"
              />
            </div>
            <p class="font-bold">{{ item.product ? item.product.name : '' }}</p>
            <p v-if="item.size != 'null'" class="text-gray-2">
              Size: {{ item.size }}
            </p>
            <p v-if="item.weight != 'null'" class="text-gray-2">
              Weight: {{ item.weight }}
            </p>
            <p class="h3">{{ item.price }} BDT</p>
          </div>
        </div>
        <div class="divider mb-4"></div>
      </div>
    </div>
    <div v-else>
      <p class="title">My Orders</p>
      <div class="list-items-center">
        <div
          class="text-6xl w-32 h-32 mt-10 rounded-full bg-gray-3 text-gray-4 flex items-center justify-center"
        >
          <i class="ri-shopping-bag-2-fill"></i>
        </div>
        <p class="h2 text-gray-4 mb-10">You have no order</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: true,
      basePath: null,
      orders: [],
    }
  },
  mounted() {
    this.loadOrders()
    this.basePath = this.$axios.defaults.baseURL
  },

  methods: {
    async loadOrders() {
      await this.$axios.$get('/api/orders/self').then((res) => {
        this.orders = res.data
      })
    },

    async loadOrdersByStatus(e) {
      let status = e.target.value
      await this.$axios
        .$get(
          status === 'null' ? '/api/orders/self' : '/api/orders/self/' + status
        )
        .then((res) => {
          this.orders = res.data
          console.log(this.orders)
        })
    },
  },
}
</script>
