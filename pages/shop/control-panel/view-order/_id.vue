<template>
  <div>
    <div class="add_loader" v-if="isLoading">
      <div class="main-loader"><loader></loader></div>
    </div>

    <div class="min-h-screen">
      <p class="h1">View Order</p>
      <div class="mb-4 pt-4">
        <div class="bg-gray-3 flex p-3 justify-between">
          <p class="h3">Receipient</p>
          <div class="flex items-center">
            <label for="status" class="h3 pr-3">Status :</label>
            <select @change="updateStaus" id="status">
              <option value="0" :selected="getOrder.status === 'Canceled'">Canceled</option>
              <option value="1" :selected="getOrder.status === 'Pending'">Pending</option>
              <option value="2" :selected="getOrder.status === 'Processing'">Processing</option>
              <option value="3" :selected="getOrder.status === 'Delivery'">Delivered</option>
              <option value="4" :selected="getOrder.status === 'Complete'">Completed</option>
              <option value="5" :selected="getOrder.status === 'Refund'">Refund</option>
            </select>
          </div>
        </div>
        <div class="p-4 bg-white">
          <p class="h3 mb-2">{{getOrder.shipping_name}}</p>
          <p class="mb-2 flex items-center">
            <i class="mr-2 ri-map-pin-fill"></i>{{getOrder.shipping_address}}, {{getOrder.shipping_area}}, {{getOrder.shipping_city}}
          </p>
          <p v-if="getOrder.billing_address" class="mb-2 flex items-center">
            <i class="mr-2 ri-bank-card-fill"></i> {{getOrder.billing_address}}, {{getOrder.billing_area}}, {{getOrder.billing_city}}
          </p>
          <p v-else class="mb-2 flex items-center">
            <i class="mr-2 ri-bank-card-fill"></i>Bill to the same address
          </p>
          <p class="mb-2 flex items-center">
            <i class="mr-2 ri-phone-fill"></i>{{getOrder.shipping_phone}}
          </p>
          <p class="mb-2 flex items-center">
            <i class="mr-2 ri-mail-fill"></i>{{getOrder.shipping_email}}
          </p>
        </div>
      </div>
      <div class="bg-white">
        <p class="title">Order Summary</p>
        <div class="p-4">
          <table class="w-full">
            <thead class="font-bold">
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Unit Price</td>
                <td>Total Price</td>
              </tr>
            </thead>
            <tbody class="px-4">
              <tr v-for="(item, index) in getOrder.order_items" :key="index">
                <td>
                  <div class="py-1">{{item.product ? item.product.name : ''}}</div>
                </td>
                <td>{{item.quantity}}</td>
                <td>{{item.price/item.quantity}}</td>
                <td>{{item.price}}</td>
              </tr>
              <tr
                class="border-t border-gray-3 text-gray-4 text-lg font-semibold"
              >
                <td colspan="3"><div class="pt-1">Subtotal ({{getOrder.order_items? getOrder.order_items.length : ''}} items)</div></td>
                <td>৳{{getOrder.sub_total_price}}</td>
              </tr>
              <tr
                class="border-b border-gray-3 text-gray-4 text-lg font-semibold"
              >
                <td colspan="3"><div class="pb-1">Shipping Fee</div></td>
                <td>৳ {{getOrder.shipping_fee}}</td>
              </tr>
              <tr class="border-gray-3 text-xl font-bold">
                <td colspan="3"><div class="py-1">Total</div></td>
                <td>৳ {{getOrder.total_price}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/lib/Loader.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      order_status: '',
      isLoading: false,
    }
  },
  components: {
    Loader
  },
  mounted () {
    this.setOrder()
  },
  methods: {
    async setOrder() {
      await this.$store.dispatch(
        'orders/setOrder',
        this.$route.params.id
      )
    },
    updateStaus(e) {
      this.isLoading = true
      let status = e.target.value;
      this.$axios
        .$get('/api/orders/status-update/' + status + '/' + this.$route.params.id)
        .then((res) => {
          this.isLoading = false
          this.$toast.success('Status Updated Successfully')
      })
    }
  },
  computed: {
    ...mapGetters({
      getOrder: 'orders/getOrder',
    }),

    orderStatus() {
      this.order_status = this.getOrder.status;
    }
  }
}
</script>
<style lang=""></style>
