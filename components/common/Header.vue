<template>
  <div>
    <div class="hidden md:contents">
      <div class="bg-yellow-3">
        <div class="w-full lg:pt-2">
          <div
            class="max-w-screen-xl xl:px-10 px-2 m-auto grid grid-cols-3 items-center justify-center gap-2"
          >
            <div>
              <n-link
                to="/"
                class="text-4xl"
                :class="currentRouteName == 'index' ? 'text-orange-1' : ''"
              >
                <img
                  class="h-20"
                  src="~/assets/img/logo.png"
                  alt="Logo"
                />
              </n-link>
            </div>
            <div class="flex flex-row items-center justify-center">
              <div
                class="border border-gray-4 px-2 py-1 rounded-l-full bg-yellow-3"
              >
                <select
                  class="focus:outline-none font-semibold bg-yellow-3"
                  v-model="selectType"
                >
                  <option
                    v-for="(searchdata, keysearchdata) in searchdatas"
                    :key="keysearchdata"
                    :value="searchdata.value"
                    selected
                  >
                    {{ searchdata.title }}
                  </option>
                </select>
              </div>
              <div
                style="margin-left: -1px"
                class="flex items-center border border-gray-4 px-2 py-1 rounded-r-full overflow-hidden bg-yellow-3"
              >
                <i class="ri-search-line mr-2"></i>
                <input
                  @keyup="mainSearchInHearder"
                  v-model="keyword"
                  class="focus:outline-none w-full font-semibold bg-yellow-3"
                  type="text"
                  placeholder="Search anything"
                />
              </div>
            </div>
            <div class="flex flex-row justify-end">
              <div>
                <button
                  class="focus:outline-none text-xl mr-2"
                  v-tooltip="'Chat'"
                >
                  <i class="ri-chat-4-fill"></i>
                </button>
                <span class="relative">
                  <button
                    class="focus:outline-none text-xl mr-2"
                    v-tooltip="'Notification'"
                    @click="showNotifyModal"
                  >
                    <i class="ri-notification-2-fill"></i>
                  </button>
                  <div
                    v-if="notify_count > 0"
                    class="bg-orange-1 text-white absolute notify-tooltip rounded-full flex items-center justify-center"
                  >
                    <span>{{ notify_count }}</span>
                  </div>
                </span>

                <div v-if="$auth.loggedIn" class="dropdown">
                  <i
                    class="dropbtn hover:text-orange-1 text-xl ri-user-fill"
                  ></i>
                  <div
                    class="dropdown-content w-64 shadow-lg border border-gray-3 bg-white"
                  >
                    <n-link to="/my-account/shops">
                      <div
                        class="p-4 flex flex-row items-center justify-center gap-2 hover:bg-purple-1 delay-100"
                      >
                        <img
                          class="avatar"
                          :src="$auth.user.profile.image != null ? profileImage : require('~/assets/img/user.png')"
                          alt="Image"
                        />
                        <span class="font-bold">{{ $auth.user.name }}</span>
                      </div>
                    </n-link>
                    <div class="divider"></div>
                    <div class="p-4">
                      <n-link
                        to="/my-account/shops"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >Shops</n-link
                      >
                      <n-link
                        to="/my-account/shopping-friend/friend-list"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My Shopping Friends</n-link
                      >
                      <n-link
                        to="/my-account/myshops"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My shops</n-link
                      >
                      <n-link
                        to="/my-wallet"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My Wallet</n-link
                      >
                      <n-link
                        to="/my-account/myorders"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My orders</n-link
                      >
                      <n-link
                        to="/my-account/mywishlist"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My wishlist</n-link
                      >
                      <n-link
                        to="/my-account/myreviews"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My Reviews</n-link
                      >
                      <n-link
                        to="/my-account/my-contributions"
                        class="font-semibold hover:bg-green-3 block p-1 delay-100"
                        >My Contributions</n-link
                      >
                    </div>
                    <div class="divider"></div>
                    <div class="p-4">
                      <span
                        @click.prevent="logout"
                        class="font-bold hover:bg-green-3 block p-1 delay-100 cursor-pointer"
                        >Sign out</span
                      >
                    </div>
                  </div>
                </div>

                <button
                  v-if="!$auth.loggedIn"
                  v-tooltip="'Account'"
                  @click="showLoginModal"
                  :class="
                    loginModal || registrationModal ? 'text-orange-1' : ''
                  "
                  class="focus:outline-none text-xl"
                >
                  <i class="ri-user-fill"></i>
                </button>
                <span class="relative">
                  <button
                    v-tooltip="'Cart'"
                    @click="showCartModal"
                    :class="
                      cart ||
                      currentRouteName == 'cart' ||
                      currentRouteName == 'checkout'
                        ? 'text-orange-1'
                        : ''
                    "
                    class="focus:outline-none text-xl ml-2"
                  >
                    <i class="ri-shopping-bag-2-fill"></i>
                  </button>
                  <span
                    v-if="totalCount > 0"
                    class="bg-orange-1 text-white absolute notify-tooltip rounded-full"
                    >{{ totalCount }}</span
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-xl xl:px-10 pb-2 m-auto sm:font-bold">
          <div class="flex flex-row items-center justify-center">
            <n-link
              to="/earn"
              :class="currentRouteName == 'earn' ? 'text-orange-1' : ''"
            >
              <div class="flex items-center">
                <i class="ri-hand-coin-line mr-1"></i>
                <span>Earn</span>
              </div>
            </n-link>
            <n-link to="/flash-sale" class="sm:pl-6 pl-2">
              <div
                class="flex items-center"
                :class="
                  currentRouteName == 'flash-sales' ? 'text-orange-1' : ''
                "
              >
                <i class="ri-flashlight-fill"></i>
                <span>Flash Sales</span>
              </div>
            </n-link>
            <n-link to="/festival-sale" class="sm:pl-6 pl-2">
              <div
                class="flex items-center"
                :class="currentRouteName == 'festivals' ? 'text-orange-1' : ''"
              >
                <img
                  class="inline sm:h-5 h-4 my-1"
                  src="~/assets/icons/festivals.png"
                  alt="Icon"
                />
                <span>Festivals</span>
              </div>
            </n-link>
          </div>
        </div>
      </div>
    </div>
    <div class="md:hidden bg-yellow-3 p-2 flex flex-wrap items-center">
      <div class="flex-1 flex justify-between items-center">
        <n-link
          to="/"
          class="text-4xl"
          :class="currentRouteName == 'index' ? 'text-orange-1' : ''"
        >
          <img
            class="h-16"
            src="~/assets/img/logo.png"
            alt="Logo"
          />
        </n-link>
      </div>

      <div class="flex flex-row justify-end">
        <div>
          <button class="focus:outline-none text-xl mr-2" v-tooltip="'Chat'">
            <i class="ri-chat-4-fill"></i>
          </button>
          <span class="relative">
            <button
              class="focus:outline-none text-xl mr-2"
              v-tooltip="'Notification'"
              @click="showNotifyModal"
            >
              <i class="ri-notification-2-fill"></i>
            </button>
            <span
              v-if="notify_count > 0"
              class="bg-orange-1 text-white absolute notify-tooltip rounded-full"
              >{{ notify_count }}</span
            >
          </span>

          <div v-if="$auth.loggedIn" class="dropdown">
            <i class="dropbtn hover:text-orange-1 text-xl ri-user-fill"></i>
            <div
              class="dropdown-content w-64 shadow-lg border border-gray-3 bg-white"
            >
              <n-link to="/my-account/shops">
                <div
                  class="p-4 flex flex-row items-center justify-center gap-2 hover:bg-purple-1 delay-100"
                >
                  <img
                    class="avatar"
                    :src="$auth.user.profile.image != null ? profileImage : require('~/assets/img/user.png')"
                    alt="Image"
                  />
                  <span class="font-bold">{{ $auth.user.name }}</span>
                </div>
              </n-link>
              <div class="divider"></div>
              <div class="p-4">
                <n-link
                  to="/my-account/shops"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >Shops</n-link
                >
                <n-link
                  to="/my-account/shopping-friend/friend-list"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My Shopping Friends</n-link
                >
                <n-link
                  to="/my-account/myshops"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My shops</n-link
                >
                <n-link
                  to="/my-wallet"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My Wallet</n-link
                >
                <n-link
                  to="/my-account/myorders"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My orders</n-link
                >
                <n-link
                  to="/my-account/mywishlist"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My wishlist</n-link
                >
                <n-link
                  to="/my-account/myreviews"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My Reviews</n-link
                >
                <n-link
                  to="/my-account/my-contributions"
                  class="font-semibold hover:bg-green-3 block p-1 delay-100"
                  >My Contributions</n-link
                >
              </div>
              <div class="divider"></div>
              <div class="p-4">
                <span
                  @click.prevent="logout"
                  class="font-bold hover:bg-green-3 block p-1 delay-100 cursor-pointer"
                  >Sign out</span
                >
              </div>
            </div>
          </div>

          <button
            v-if="!$auth.loggedIn"
            v-tooltip="'Account'"
            @click="showLoginModal"
            :class="loginModal || registrationModal ? 'text-orange-1' : ''"
            class="focus:outline-none text-xl"
          >
            <i class="ri-user-fill"></i>
          </button>

          <button
            v-tooltip="'Cart'"
            @click="showCartModal"
            :class="
              cart ||
              currentRouteName == 'cart' ||
              currentRouteName == 'checkout'
                ? 'text-orange-1'
                : ''
            "
            class="focus:outline-none text-xl ml-2"
          >
            <i class="ri-shopping-bag-2-fill"></i>
          </button>

          <span
            v-if="!modal"
            @click="openModal"
            class="cursor-pointer md:hidden"
          >
            <i class="font-bold text-xl ml-2 ri-menu-line"></i>
          </span>
        </div>
      </div>

      <div v-if="modal">
        <div @click="closeModal" class="fixed inset-0 z-50">
          <div class="flex flex-row">
            <div
              class="focus-in max-w-screen-sm shadow-lg bg-green-4 h-screen overflow-auto w-3/4 md:p-4"
            >
              <ul class="font-bold text-gray-5">
                <li class="mt-3 px-2 py-1">
                  <div
                    @click="wait"
                    class="flex flex-row items-center justify-center text-green-4"
                  >
                    <div
                      class="border border-gray-4 px-2 py-1 rounded-l-full bg-white"
                    >
                      <select
                        class="focus:outline-none font-semibold bg-white"
                        v-model="selectType"
                      >
                        <option
                          v-for="(searchdata, keysearchdata) in searchdatas"
                          :key="keysearchdata"
                          :value="searchdata.value"
                          selected
                        >
                          {{ searchdata.title }}
                        </option>
                      </select>
                    </div>
                    <div
                      style="margin-left: -1px"
                      class="flex items-center border border-gray-4 px-2 py-1 rounded-r-full overflow-hidden bg-white"
                    >
                      <i class="ri-search-line mr-2"></i>
                      <input
                        @keyup="mainSearchInHearder"
                        v-model="keyword"
                        class="focus:outline-none w-full font-semibold bg-white"
                        type="text"
                        placeholder="Search anything"
                      />
                    </div>
                  </div>
                </li>
                <li class="mt-3 px-4 py-1" v-for="(menu, i) in menus" :key="i">
                  <n-link class="block" :to="menu.url">{{ menu.name }}</n-link>
                </li>
                <li
                  v-if="$auth.loggedIn"
                  @click.prevent="logout"
                  class="mt-3 px-4 py-1"
                >
                  Sign Out
                </li>
              </ul>
            </div>
            <div @click="closeModal" class="font-bold text-3xl text-gray-5">
              <button class="focus:outline-none">
                <i class="ri-close-line"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          @click="closeModal"
          class="opacity-50 fixed inset-0 z-40 bg-green-4"
        ></div>
      </div>
    </div>

    <!-- Cart Modal -->
    <cart v-if="cart" v-on:closeCart="closeCartModal()"></cart>
    <!-- Notification Modal  -->
    <notification
      v-if="notify"
      v-on:closeNotify="closeNotifyModal()"
    ></notification>
    <!-- Login Modal -->
    <login
      v-if="loginModal"
      v-on:closeLoginModal="closeLoginModal()"
      v-on:openRegistrationModal="openRegistrationModal()"
    ></login>
    <!-- Registration Modal -->
    <registration
      v-if="registrationModal"
      v-on:closeRegistrationModal="closeRegistrationModal()"
      v-on:openLoginModal="openLoginModal()"
    ></registration>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import Login from '../auth/Login.vue'
import Cart from '../cart/Short.vue'
import Notification from '../common/Notification.vue'
import Registration from '../auth/Registration.vue'

export default {
  components: {
    Cart,
    Notification,
    Login,
    Registration,
  },

  data() {
    return {
      proCount: '',
      alls: [],
      markets: [],
      shops: [],
      products: [],
      searchdatas: [
        { value: 0, title: 'All' },
        { value: 1, title: 'Market' },
        { value: 2, title: 'Shop' },
        { value: 3, title: 'Product' },
      ],
      cart: false,
      notify: false,
      loginModal: false,
      registrationModal: false,
      selectType: 0,
      keyword: '',
      notify_count: 0,

      modal: false,
      close_modal: 'closeModal',
      menus: [
        { name: 'S-Wallet', url: '' },
        { name: 'Earn', url: '/earn' },
        { name: 'Flash Sales', url: '/flash-sale' },
        { name: 'Festivals', url: '/festival-sale' },
      ],
    }
  },
  mounted() {
    this.addToBuy()
    this.loadNotifications()
  },
  methods: {
    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
    }),

    openModal() {
      this.modal = true
    },
    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.modal = false
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },
    showCartModal() {
      this.cart = !this.cart
    },
    closeCartModal() {
      this.cart = false
    },
    showNotifyModal() {
      this.notify = !this.notify
    },
    closeNotifyModal(value) {
      this.notify = false
    },
    showLoginModal() {
      this.loginModal = true
    },
    closeLoginModal() {
      this.loginModal = false
    },
    openRegistrationModal() {
      this.loginModal = false
      this.registrationModal = true
    },
    closeRegistrationModal() {
      this.registrationModal = false
    },
    openLoginModal() {
      this.loginModal = true
      this.registrationModal = false
    },
    mainSearchInHearder: _.debounce(function (e) {
      let data = {
        keyword: e.target.value,
        selectType: this.selectType,
      }
      this.$store.dispatch('search/loadSearch', data)
    }, 500),

    async loadNotifications() {
      if (this.$auth.loggedIn) {
        await this.$axios.get('/api/notifications').then((res) => {
          this.notify_count = res.data.data.length
        })
      }
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully logout from your account!')
      this.$router.push('/')
    },

    addToBuy() {
      var productsadd = localStorage.getItem('addproducts')
        ? JSON.parse(localStorage.getItem('addproducts'))
        : []
      for (let index = 0; index < productsadd.length; index++) {
        const item = productsadd[index]
        const qtn = productsadd[index].count
        this.addProduct({ item, qtn })
      }
    },
  },

  computed: {
    ...mapGetters({
      addproducts: 'addtobag/addproducts',
    }),

    // totalCount() {
    //   let sum = 0
    //   _.each(this.addproducts, (p) => {
    //     sum += p.count
    //   })
    //   return sum
    // },

    totalCount() {
      return this.addproducts ? this.addproducts.length : 0
    },

    currentRouteName() {
      return this.$route.name
    },

    profileImage(){
      return this.$axios.defaults.baseURL + '/storage/' + this.$auth.user.profile.image;
    }
  },
}
</script>
