<template>
  <div>
    <p class="h1">Shop control panel</p>
    <div class="min-h-screen grid grid-cols-4 gap-4 py-4">
      <div>
        <div class="list">
          <ul>
            <li
              class="list-items hover:bg-green-3"
              v-if="
                $auth.user.shop_member_permission == 1 ||
                $auth.user.shop_member_permission == 0
              "
            >
              <NuxtLink :to="'/shop/self/' + this.$route.params.id"
                >View Shop</NuxtLink
              >
            </li>
            <li
              @click="viewAnalytics"
              :class="analytics ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              View analytics
            </li>
            <li
              @click="growBusiness"
              :class="grow ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              Grow your business
            </li>
            <li
              @click="shopMember"
              :class="member ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              Shop members
            </li>
            <li
              @click="products"
              :class="product ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              Products
            </li>
            <li
              @click="salesReport"
              :class="report ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              Sales report
            </li>
            <li
              v-if="
                $auth.user.shop_member_permission == 3 ||
                $auth.user.shop_member_permission == 0
              "
              @click="shopCashbox"
              :class="cashbox ? 'bg-green-3' : ''"
              class="list-items hover:bg-green-3"
            >
              Cashbox
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-3">
        <view-analytics v-if="analytics"></view-analytics>
        <grow-business v-if="grow"></grow-business>
        <shop-member v-if="member"></shop-member>
        <shop-products v-if="product"></shop-products>
        <sales-report v-if="report"></sales-report>
        <cashbox v-if="cashbox"></cashbox>
      </div>
    </div>
  </div>
</template>
<script>
import ViewAnalytics from '~/components/shop-control-panel-menus/view-analytics/ViewAnalytics.vue'
import GrowBusiness from '~/components/shop-control-panel-menus/grow-business/GrowBusiness.vue'
import ShopMember from '~/components/shop-control-panel-menus/shop-member/ShopMember.vue'
import ShopProducts from '~/components/shop-control-panel-menus/shop-products/ShopProducts.vue'
import SalesReport from '~/components/shop-control-panel-menus/sales-report/SalesReport.vue'
import Cashbox from '~/components/shop-control-panel-menus/cashbox/Cashbox.vue'
export default {
  middleware: ['auth'],
  data() {
    return {
      analytics: false,
      grow: false,
      member: false,
      product: false,
      report: false,
      cashbox: false,
    }
  },
  components: {
    ViewAnalytics,
    GrowBusiness,
    ShopMember,
    ShopProducts,
    SalesReport,
    Cashbox,
  },
  methods: {
    viewAnalytics() {
      this.analytics = true
      this.grow = false
      this.member = false
      this.product = false
      this.report = false
      this.cashbox = false
    },
    growBusiness() {
      this.analytics = false
      this.grow = true
      this.member = false
      this.product = false
      this.report = false
      this.cashbox = false
    },
    shopMember() {
      this.analytics = false
      this.grow = false
      this.member = true
      this.product = false
      this.report = false
      this.cashbox = false
    },
    products() {
      this.analytics = false
      this.grow = false
      this.member = false
      this.product = true
      this.report = false
      this.cashbox = false
    },
    salesReport() {
      this.analytics = false
      this.grow = false
      this.member = false
      this.product = false
      this.report = true
      this.cashbox = false
    },
    shopCashbox() {
      this.analytics = false
      this.grow = false
      this.member = false
      this.product = false
      this.report = false
      this.cashbox = true
    },
  },
}
</script>
