<template>
  <div>
    <div class="bg-white">
      <div class="p-4 grid md:grid-cols-3 gap-4 items-center">
        <div class="flex items-center gap-4">
          <span class="font-bold">Show</span>
          <select
            class="w-16 border border-gray-4 rounded focus:outline-none py-1 px-2"
          >
            <option>5</option>
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>ALL</option>
          </select>
          <span class="font-bold">entries</span>
        </div>
        <div class="search">
          <i class="search-icon ri-search-line mr-2"></i>
          <input
            class="search-input focus:outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold">Status:</span>
          <select class="input-field focus:outline-none">
            <option disabled selected>Select Any</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Canceled</option>
            <option>Refund</option>
          </select>
        </div>
      </div>
      <div class="p-4 mb-4">
        <table class="w-full">
          <thead class="bg-green-1 font-bold">
            <td><div class="py-1">Order No</div></td>
            <td>Payment Method</td>
            <td>Order Status</td>
            <td>Date</td>
            <!-- <td>Change Status</td> -->
            <td>Total</td>
            <td>Action</td>
          </thead>
          <tbody class="px-4">
            <tr v-for="(order, index) in orders" :key="index">
              <td>
                {{ order.order_no }}
              </td>
              <td class="uppercase">{{ order.payment_gateway }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.created_at }}</td>
              <td>৳ {{ order.total_price }}</td>
              <td>
                <n-link
                  :to="`/shop/control-panel/view-order/${order.id}`"
                  class="font-bold text-blue-1"
                  ><i class="ri-eye-line"></i
                ></n-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between p-4">
        <p class="font-bold">Showing 1 to 10 of 57 entries</p>
        <!-- <paginate></paginate>
  -->
        <Paginate
          :totalPages="totalPages"
          :total="total"
          :currentPage="currentPage"
          :perPage="perPage"
          v-on:pagechanged="setOrdersByShop"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Paginate from '~/components/common/Paginate'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      totalPages: 2,
      total: 0,
      currentPage: 0,
      perPage: 0,
    }
  },
  components: {
    Paginate,
  },

  mounted() {
    this.setOrdersByShop()
  },

  methods: {
    async setOrdersByShop() {
      await this.$store.dispatch(
        'orders/setOrdersByShop',
        this.$route.params.id
      )
      // this.total = this.orders.meta.total
      // this.totalPages = this.orders.meta.last_page
      // this.currentPage = this.orders.meta.current_page
      // this.perPage = this.orders.meta.per_page
    },
  },

  computed: {
    ...mapGetters({
      orders: 'orders/getOrdersByShop',
    }),
  },
}
</script>
