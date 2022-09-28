<template>
    <div>
        <!-- Breadcrumbs -->
        <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
        <p class="text-center items-center my-6">
            <i class="ri-service-fill bg-green-1 p-3 rounded-full text-2xl mr-2 text-gray-2"></i>
            <span class="py-1 sm:text-3xl text-xl font-bold ">Thank you, your order has been received.</span>
        </p>

        <div class="grid grid-cols-5 justify-around text-center mb-6">
            <div>
                <p class="font-bold">{{order.order_no}}</p>
                <p class="text-gray-4">Order number</p>
            </div>
            <div>
                <p class="font-bold">{{order.status}}</p>
                <p class="text-gray-4">Status</p>
            </div>
            <div>
                <p class="font-bold">{{order.created_at}}</p>
                <p class="text-gray-4">Date</p>
            </div>
            <div>
                <p class="font-bold">৳ {{order.total_price}}</p>
                <p class="text-gray-4">Total</p>
            </div>
            <div>
                <p v-if="order.payment_gateway === 'cod' " class="font-bold">Cash on delivery</p>
                <p class="text-gray-4">Payment method</p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p class="title">Order Summary</p>
              <div class="p-2">
                <table class="w-full">
                  <thead>
                    <tr class="font-semibold">
                      <td>Product</td>
                      <td><p class="mr-2">Quantity</p></td>
                      <td><p class="w-16">Price</p></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(order_item, i) in order.order_items"
                      :key="i"
                      class="border-t border-gray-3"
                    >
                      <td>
                        <div class="flex my-1">
                          <img
                            class="w-12 h-12 mr-2"
                            :src="order_item.product.thumbnail ? basePath + '/storage/' + order_item.product.thumbnail : require(`~/assets/img/products/default.png`)"
                            alt=""
                          />
                          <p>
                            <span class="font-semibold">{{ order_item.product.name }}</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p>{{ order_item.quantity }}</p>
                      </td>
                      <td>{{ order_item.price }}</td>
                    </tr>
                    <tr class="border-t border-gray-3">
                      <td colspan="2" class="text-gray-2">
                        <p class="mt-2">Subtotal ({{order.total_quantity}} items)</p>
                      </td>
                      <td><p class="mt-2">৳ {{order.sub_total_price}}</p></td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-gray-2">
                        <p class="mb-2">Shipping Fee</p>
                      </td>
                      <td><p class="mb-2">৳ {{order.shipping_fee}}</p></td>
                    </tr>
                    <tr class="border-t border-b border-gray-3 font-semibold">
                      <td colspan="2"><p class="my-2">Total</p></td>
                      <td><p class="my-2">৳ {{order.total_price}}</p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p class="title">Shipping & Billing</p>
              <div class="p-2 font-semibold">
                  <p class="p-2 font-bold">{{order.shipping_name}}</p>
                  <p class="mb-2"><i class="ri-map-pin-fill mr-3"></i>{{order.shipping_address}}, {{order.shipping_area}}, {{order.shipping_city}}</p>
                  <p v-if="order.billing_address == null"  class="mb-2"><i class="ri-bill-fill mr-3"></i>Bill to the same address</p>
                  <p v-else class="mb-2"><i class="ri-map-pin-fill mr-3"></i>{{order.billing_address}}, {{order.billing_area}}, {{order.billing_city}}</p>
                  <p class="mb-2"><i class="ri-phone-fill mr-3"></i>{{order.shipping_phone}}</p>
                  <p class="mb-2"><i class="ri-mail-fill mr-3"></i>{{order.shipping_email}}</p>
              </div>
          </div>
        </div>
        <!-- <div class="mb-8 text-center">
            <n-link to="/shop" class="py-2 px-20 bg-green-3 font-bold text-center border rounded mt-4">Place Order</n-link>
        </div> -->
    </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue';
export default {
    data() {
        return {
            order: '',
            breadCrumbs: [
                {title: 'Shopping bag', url: '/cart'},
                {title: 'Checkout', url: '/checkout'},
                {title: 'Order complete', url: ''},
            ],
            products: [],
            basePath: this.$axios.defaults.baseURL,
        }
    },
    components: {
        Breadcrumb,
    },
     mounted() {
      this.loadData();
    },

    methods: {
      async loadData() {
        await this.$axios.$get(
          '/api/orders/last-order'
        ).then((res) => {
          this.order = res.data;
        })
      },
    }
}
</script>
