<template>
  <div>
    <div>
      <p class="font-bold md:text-left text-center text-xl">{{ shop.name }}</p>
      <p class="text-gray-2 md:text-left text-center">{{ shop.total_subscriber }} Subscribers</p>
      <p class="text-gray-2 md:text-left text-center">{{ active }} Active Customers</p>
      <div class="flex md:justify-start justify-center text-yellow-2">
        <i class="ri-star-fill"></i>
        <i class="ri-star-fill"></i>
        <i class="ri-star-fill"></i>
        <i class="ri-star-fill"></i>
        <i class="ri-star-half-line"></i>
        <p class="text-gray-2 ml-2">(4.5)</p>
      </div>
      <div class="flex items-center md:justify-start justify-center text-center gap-4 pt-2">
        <n-link to="">
          <i class="rounded-lg bg-green-1 p-2 ri-message-2-fill"></i>
          <p>Text us</p>
        </n-link>
        <n-link to="">
          <i class="rounded-lg bg-green-1 p-2 ri-phone-fill"></i>
          <p>Call us</p>
        </n-link>
        <n-link to="">
          <i class="rounded-lg bg-green-1 p-2 ri-video-chat-fill"></i>
          <p>Video call</p>
        </n-link>
      </div>
      <div class="md:my-4 my-2 grid grid-cols-2 text-center">
        <a
          href="javascript:void(0);"
          @click="subscribeShopLogin"
          v-if="!$auth.loggedIn"
          class="w-full md:px-6 px-3 md:py-1 py-1 font-semibold md:text-xl rounded-lg bg-green-3"
          >Subscribe</a
        >
        <button
          id="show-modal"
          @click="showModal = true"
          v-if="$auth.loggedIn"
          :disabled="disable"
          :class="subscribeCheck == null ? ' bg-green-3' : ' bg-green-1'"
          class="md:px-6 px-3 md:py-1 py-1 font-semibold md:text-xl rounded-lg focus:outline-none"
        >
          {{ subscribeCheck ? 'Subscribed' : 'Subscribe' }}
        </button>
        <n-link
          to=""
          class="md:px-6 px-3 py-1 font-semibold md:text-xl rounded-lg border border-orange-1 bg-white md:ml-3 ml-1"
          >Invite Friend</n-link
        >
      </div>
      <div>
        <div class="text-purple-2 border border-purple-2 rounded-lg md:p-2 p-1">
          <p><strong>Note:</strong> {{ shop.subscription_note }}</p>
        </div>
      </div>
    </div>
    <!-- use the modal component, pass in the prop -->
    <!-- <div v-if="showModal" @click="$emit('close')">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="model-header">
                <button class="close-btn" @click="close">
                  <i class="ri-close-line"></i>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="subscribeShop(shop.id)">
                  <div class="flex">
                    <input
                      type="text"
                      class="focus:outline-none input-field pr-6"
                      placeholder="Enter nickname"
                      v-model="nickname"
                    />

                    <button
                      type="submit"
                      :disabled="!Submit"
                      :class="!Submit ? ' bg-green-1' : ' bg-green-3'"
                      class="md:px-6 px-3 ml-3 md:py-1 py-1 font-semibold md:text-xl rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div> -->
    <div class="" v-if="showModal">
      <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
          <div @click="wait">
              <div @click="closeModal" class="btn-close">
                  <button class="focus:outline-none"><i class="ri-close-line"></i></button>
              </div>
              <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                  <div class="cart-tems-center text-center">
                      <p class="title">Subscribe Shop</p>
                      <div class="p-6">
                          <form @submit.prevent="subscribeShop(shop.id)">
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

  </div>
</template>
<script>
export default {
  props: ['shop'],

  data() {
    return {
      showModal: false,
      disable: false,
      subscribeCheck: null,
      count: 0,
      nickname: '',
      close_modal: 'closeModal',
      active: '00'
    }
  },

  mounted() {
    this.getSubscribeCount()
    this.checkSubscribe()
  },
  computed: {
    Submit() {
      return this.nickname
    },
  },
  created(){
    this.activeVisitor();
  },
  methods: {
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

    async subscribeShop(id) {
      // let loader = this.$loading.show({
      //   // Optional parameters
      //   container: this.fullPage ? null : this.$refs.formContainer,
      //   canCancel: true,
      //   onCancel: this.onCancel,
      //   zIndex: 2000,
      //   opacity: 0.5,
      // })

      var formData = new FormData()
      formData.append('nickname', this.nickname)
      formData.append('shop_id', id)
      await this.$axios
        .post('api/subscribe-request', formData)
        .then((response) => {
          this.getSubscribeCount()
          this.checkSubscribe()
          // loader.hide()
          this.$toast.success('Success Subscribed!')
          this.showModal = false;
        })
        .catch((error) => {
          // loader.hide()
          this.$toast.error('Oops! Something wrong!')
        })
    },
    subscribeShopLogin() {
      this.$router.push({ name: 'login' })
    },

    activeVisitor() {
      this.$axios
      .get('/api/shops/active-visitor/' + this.$route.params.id)
      .then((res) => {
        this.active = res.data;
      })
    },

    async getSubscribeCount() {
      await this.$axios
        .$get('/api/subscribe-count-by-shop/' + this.$route.params.id)
        .then((res) => {
          this.count = res.data
        })
    },
    async checkSubscribe() {
      // let loader = this.$loading.show({
      //   // Optional parameters
      //   container: this.fullPage ? null : this.$refs.formContainer,
      //   canCancel: true,
      //   onCancel: this.onCancel,
      //   zIndex: 2000,
      //   opacity: 2,
      // })
      // simulate AJAX

      await this.$axios
        .$get(
          this.$auth.loggedIn
            ? '/api/subscribe-check-by-shop-customer/' + this.$route.params.id
            : '/api/shops/' + this.$route.params.id
        )
        .then((res) => {
          this.subscribeCheck = res.data
          // loader.hide()
          if (this.subscribeCheck != null) {
            this.disable = true
          }
        })
        .catch((error) => {
          // loader.hide()
        })
    },
    async close() {
      this.$emit('close')
      // this.showModal = false
    },
  },
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.model-header {
  position: relative;
}
.close-btn {
  display: block;
  padding: 5px;
  position: absolute;
  top: -20px;
  right: -22px;
}
</style>
