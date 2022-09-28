<template>
  <div>
    <div class="md:p-4 p-2">
      <div class="flex md:flex-row flex-col gap-4">
        <div class="search">
          <i class="search-icon ri-search-line"></i>
          <input v-on:keyup="searchData"
            type="text"
            class="search-input focus:outline-none w-full"
            placeholder="Search"
          />
        </div>
        <button @click="addNew" class="btn-add focus:outline-none">
          <i class="ri-add-line mr-2"></i> Add New
        </button>
      </div>
    </div>
    <div class="">
      <table class="w-full">
        <thead class="bg-gray-3 font-semibold">
          <tr>
            <td class="py-1 pl-4"><span class="w-36">Shops</span></td>
            <td><span class="w-40">Nick name</span></td>
            <td><span class="w-36">Notifications</span></td>
            <td><span class="w-36">Actions</span></td>
          </tr>
        </thead>
        <tbody v-if="searchdatas.length > 0">
          <tr
            class="border-b border-gray-3"
            v-for="(subscribed, i) in searchdatas"
            :key="i"
          >
            <td>
              <div class="pl-4 my-1">
                <img
                  class="h-16 w-64"
                  :src="subscribed.subscribe_shop.logo != null ? basePath + '/storage/' + subscribed.subscribe_shop.logo : '~/assets/img/banner_green.png'"
                  alt="Image"
                />
                <p class="h3">{{ subscribed.subscribe_shop.name }}</p>
              </div>
            </td>
            <td>
              <p class="h3">{{ subscribed.nickname }}</p>
            </td>
            <td>
              <span class="relative">
                <button
                  class="focus:outline-none text-xl mr-2"
                  v-tooltip="'New Produt Notification'"
                  @click="showNotifyModal"
                >
                  <i class="ri-notification-2-fill"></i>
                </button>
                <span
                  v-if="count_notification > 0"
                  class="bg-orange-1 text-white absolute notify-tooltip rounded-full"
                  >{{ count_notification }}</span
                >
              </span>
            </td>
            <td>
              <div class="dropdown">
                <i class="dropbtn border rounded p-2 ri-arrow-down-s-fill"></i>
                <div class="dropdown-content font-semibold">
                  <p @click="unsubscribe(subscribed.id)">Unsubscribe</p>
                  <p @click="changeName(subscribed.id, subscribed.nickname)">Change nick name</p>
                </div>
              </div>

              <div class="" v-if="showModal">
                <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
                    <div @click="wait">
                        <div @click="closeModal" class="btn-close">
                            <button class="focus:outline-none"><i class="ri-close-line"></i></button>
                        </div>
                        <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                            <div class="cart-tems-center text-center">
                                <p class="title">Change nickname</p>
                                <div class="p-6">
                                    <form @submit.prevent="changenickname(id)">
                                      <div class="flex flex-col items-center">
                                        <input
                                          type="text"
                                          class="focus:outline-none input-field md:pr-6 w-full mb-4"
                                          placeholder="Enter nickname"
                                          v-model="nickname"
                                        />
                                        <button
                                          type="submit"
                                          :disabled="!Submit"
                                          :class="!Submit ? ' bg-green-1' : ' bg-green-3'"
                                          class="md:px-6 w-full md:py-1 py-1 font-semibold md:text-xl rounded focus:outline-none"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="closeModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            class="border-b border-gray-3"
            v-for="(subscribed, i) in subscribed_shops"
            :key="i"
          >
            <td>
              <nuxt-link :to="{
                name: 'shop-slug-id',
                params: { slug: subscribed.subscribe_shop.slug, id: subscribed.subscribe_shop.id },
              }">
                <div class="relative pl-4 my-1">
                  <img
                    class="h-16 w-64"
                    :src="subscribed.subscribe_shop.logo != null ? basePath + '/storage/' + subscribed.subscribe_shop.logo : '~/assets/img/banner_green.png'"
                    alt="Image"
                  />
                  <p class="absolute top-0 mt-4 ml-4 w-full font-bold text-white text-xl mb-5" >Shop No: {{ subscribed.subscribe_shop.shop_no }}</p>
                  <!-- <p class="h3">{{ subscribed.subscribe_shop.name }}</p> -->
                </div>
              </nuxt-link>
            </td>
            <td>
              <p class="h3">{{ subscribed.nickname }}</p>
            </td>
            <td>
              <span class="relative">
                <button
                  class="focus:outline-none text-xl mr-2"
                  v-tooltip="'New Produt Notification'"
                  @click="showNotifyModal"
                >
                  <i class="ri-notification-2-fill"></i>
                </button>
                <span
                  v-if="count_notification > 0"
                  class="bg-orange-1 text-white absolute notify-tooltip rounded-full"
                  >{{ count_notification }}</span
                >
              </span>
            </td>
            <td>
              <div class="dropdown">
                <i class="dropbtn border rounded p-2 ri-arrow-down-s-fill"></i>
                <div class="dropdown-content font-semibold">
                  <p @click="unsubscribe(subscribed.id)">Unsubscribe</p>
                  <p @click="changeName(subscribed.id, subscribed.nickname)">Change nick name</p>
                </div>
              </div>

              <div class="" v-if="showModal">
                <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
                    <div @click="wait">
                        <div @click="closeModal" class="btn-close">
                            <button class="focus:outline-none"><i class="ri-close-line"></i></button>
                        </div>
                        <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                            <div class="cart-tems-center text-center">
                                <p class="title">Change nickname</p>
                                <div class="p-6">
                                    <form @submit.prevent="changenickname(id)">
                                      <div class="flex flex-col items-center">
                                        <input
                                          type="text"
                                          class="focus:outline-none input-field md:pr-6 w-full mb-4"
                                          placeholder="Enter nickname"
                                          v-model="nickname"
                                        />
                                        <button
                                          type="submit"
                                          :disabled="!Submit"
                                          :class="!Submit ? ' bg-green-1' : ' bg-green-3'"
                                          class="md:px-6 w-full md:py-1 py-1 font-semibold md:text-xl rounded focus:outline-none"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="closeModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4 flex justify-center">
      <button class="btn-border hover:bg-green-3 focus:outline-none">
        View more
      </button>
    </div>
    <remove-subscribe
      v-if="remove"
      v-on:closeModal="closeModal()"
      v-on:yesRemove="yesRemove()"
    ></remove-subscribe>
    <product-notification
      v-if="notify"
      v-on:closeNotify="closeNotifyModal()"
    ></product-notification>
  </div>
</template>
<script>
import RemoveSubscribe from '~/components/my-account/modals/RemoveSubscribe.vue'
import ProductNotification from '~/components/common/ProductNotification.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  head: {
    title: 'Subscribed Shops',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description',
      },
    ],
  },
  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      id: '',
      unsubscribeid:'',
      confirmRemove:'',
      remove: false,
      showModal: false,
      nickname: '',
      notifications: {},
      searchdatas: [],
      count_notification: 0,
      notify: false,
      close_modal: 'closeModal'
    }
  },
  mounted() {
      this.SetsubscribedData()
      this.newProductNotification();
    this.show();
    },
  components: {
    RemoveSubscribe,
    ProductNotification
  },
  computed: {
    ...mapGetters('subscribed_shops', ['subscribed_shops']),
    Submit() {
      return this.nickname
    },
  },
  methods: {
    ...mapActions('subscribed_shops', ['SetsubscribedData']),
    show(){
      console.log(this.subscribed_shops);
    },
    closeModal(){
        if(this.close_modal == 'closeModal')
        {
            this.showModal = false;
        }
    },
    wait(){
        this.close_modal = 'wait';
        setTimeout(() => this.close_modal = 'closeModal', 500);
    },
    async newProductNotification()
      {
        await this.$axios.get('/api/notifications/product-notification')
          .then((res) => {
            this.notifications = res.data.data;
            this.count_notification=Object.keys(this.notifications).length
            this.isLoading = false;
          })
      },
    showNotifyModal()
    {
      this.notify = !this.notify
    },
    closeNotifyModal(value)
    {
      this.notify = false
    },
    async changenickname(id)
    {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        zIndex: 2000,
        opacity: 0.5,
      })
      var formData = new FormData()
      formData.append('nickname', this.nickname)
      formData.append('id', id)
      await this.$axios
        .post('api/rename-nickname', formData)
        .then((response) => {
          loader.hide()
          this.$toast.success('Success change nickname!')
          this.showModal = false
          this.SetsubscribedData()
        })
        .catch((error) => {
          loader.hide()
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    changeName(id,name)
    {
      this.showModal = true
      this.id = id
      this.nickname = name
    },
    unsubscribe(id)
    {
      this.unsubscribeid=id
        if (this.confirmRemove == true) {
        this.$axios
          .get('api/unsubscribe/' + id)
          .then((response) => {
            this.$toast.success('Remove successfully !')
            this.unsubscribeid = ''
            this.confirmRemove = false
            this.SetsubscribedData()
          })
          .catch((error) => {
            this.$toast.error('Oops..!-' + error.response.data.message)
          })
      } else this.remove = true
    },
    yesRemove()
    {
      this.confirmRemove = true
      this.unsubscribe(this.unsubscribeid)
      this.remove = false
    },
    closeModal()
    {
      this.remove = false
    },

    async searchData(e)
    {
      let key = e.target.value;
      if (!key) {
        this.$router.push({path: 'shops'});
        this.searchdatas = [];
      }else{
        await this.$axios.get('/api/search-subscribe-shop/' + key)
        .then((response) => {
          this.searchdatas = response.data.data;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
      }
    },

    addNew(){
      this.$router.push({name: 'cities'});
    }
  },
}
</script>
