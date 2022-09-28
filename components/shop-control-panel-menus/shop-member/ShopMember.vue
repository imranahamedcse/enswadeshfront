<template>
  <div>
    <div v-if="!add">
      <div class="bg-white flex justify-between p-4">
        <p class="h2">Shop members</p>
        <button @click="addNew" class="btn-add focus:outline-none">
          Add New
        </button>
      </div>
      <div class="divider"></div>
      <div v-if="!shopMember" class="list-items-center">
        <div
          class="text-6xl w-32 h-32 mt-10 rounded-full bg-gray-3 text-gray-4 flex items-center justify-center"
        >
          <i class="ri-group-fill"></i>
        </div>
        <p class="h2 text-gray-4 mb-10">Your shop has no member in Swadesh</p>
      </div>
      <div v-if="shopMember" class="bg-white p-4">
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="(mem, i) in member"
            :key="i"
            class="flex flex-col items-center border-2 border-r-4 border-b-4 rounded-lg p-2"
          >
            <img
              class="avatar"
              src="~/assets/img/default_market.png"
              alt="Image"
            />
            <p class="h3 mt-3">{{ mem.user.name }}</p>
            <p class="btn-add focus:outline-none">{{ mem.title }}</p>
            <div
              class="w-full mt-4 flex items-center justify-center gap-4 text-xl"
            >
              <button class="rounded w-8 h-8 bg-green-1">
                <i class="ri-message-2-fill"></i>
              </button>
              <button class="rounded w-8 h-8 bg-green-1">
                <i class="ri-phone-fill"></i>
              </button>
              <button class="rounded w-8 h-8 bg-green-1">
                <i class="ri-video-chat-fill"></i>
              </button>
            </div>
            <button
              @click="removeMember(mem.user_id)"
              class="mt-4 btn-border hover:bg-green-3 focus:outline-none"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="add">
      <div class="bg-white flex justify-between p-4">
        <p class="h2">Shop members</p>
      </div>
      <div class="divider"></div>
      <div class="bg-white p-4">
        <p class="h3 mb-4">Add new member</p>
        <form @submit.prevent="shopMemberCreate">
          <label class="input-label" for="phone_number">Mobile number</label>
          <input
            class="input-field focus:outline-none"
            type="text"
            id="phone_number"
            v-model="phone_number"
            @keyup="searchMember"
            placeholder="01***"
          />
          <input type="hidden" v-model="user_id" />
          <div class="my-4 grid grid-cols-5 gap-4" v-if="resultMember">
            <div
              v-for="(profile, i) in profiles"
              :key="i"
              @click="setProfileData(profile)"
              class="cursor-pointer"
            >
              <div
                class="border border-gray-3 rounded-md shadow-md p-2 flex items-center justify-center"
              >
                <img
                  class="h-10 w-10 rounded-full mr-4"
                  src="~/assets/img/default_market.png"
                  alt="Image"
                />
                <p class="font-bold">{{ profile.name }}</p>
              </div>
            </div>
          </div>
          <label class="input-label" for="name">Name</label>
          <input
            class="input-field focus:outline-none mb-4"
            type="text"
            id="name"
            v-model="name"
            placeholder="Adam"
          />
          <label class="input-label" for="email">Email</label>
          <input
            class="input-field focus:outline-none mb-4"
            type="text"
            id="email"
            v-model="email"
            placeholder="Adam@gmail.com"
          />
          <label class="input-label" for="title">Add as</label>
          <input
            class="input-field focus:outline-none mb-4"
            type="text"
            id="title"
            v-model="title"
            placeholder="Salesman, Partner, Cashier, etc"
          />
          <p class="h3 mb-4">Select working hour:</p>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="input-label" for="start"
                >Start time (hh:mm am/pm)</label
              >
              <input
                class="input-field focus:outline-none mb-4"
                type="time"
                id="start_time"
                v-model="start_time"
                placeholder="Adam"
              />
            </div>
            <div>
              <label class="input-label" for="end"
                >End time (hh:mm am/pm)</label
              >
              <input
                class="input-field focus:outline-none mb-4"
                type="time"
                id="end_time"
                v-model="end_time"
                placeholder="Adam"
              />
            </div>
          </div>
          <div v-if="resultMember">
            <p class="h3 mb-4">Set password:</p>
            <label for="password" class="input-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="input-field focus:outline-none mb-4"
              placeholder="*****"
            />
            <label for="password-confirm" class="input-label"
              >Confirm Password</label
            >
            <input
              type="password"
              v-model="password_confirm"
              id="password_confirm"
              class="input-field focus:outline-none mb-4"
              placeholder="*****"
            />
          </div>
          <label class="input-label" for="">Permissions</label>
          <div class="flex flex-row mb-4">
            <div class="flex items-center justify-center mr-4">
              <input
                class="w-4 h-4 mr-2"
                type="radio"
                v-model="shop_member_permission"
                value="1"
                id="shop_member_permission"
              />
              <label for="control_room">Control room</label>
            </div>
            <div class="flex items-center justify-center mr-4">
              <input
                class="w-4 h-4 mr-2"
                type="radio"
                value="2"
                v-model="shop_member_permission"
                id="shop_member_permission"
              />
              <label for="control_room">Shop</label>
            </div>
            <div class="flex items-center justify-center mr-4">
              <input
                class="w-4 h-4 mr-2"
                type="radio"
                value="3"
                v-model="shop_member_permission"
                id="shop_member_permission"
              />
              <label for="control_room">Cash box</label>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex items-center justify-center pt-4">
            <button class="btn-border bg-green-3 focus:outline-none">
              Ask to join
            </button>
          </div>
        </form>
      </div>
    </div>
    <remove-member
      v-if="remove"
      v-on:closeModal="closeModal()"
      v-on:yesRemove="yesRemove()"
    ></remove-member>
  </div>
</template>
<script>
import RemoveMember from '~/components/shop-control-panel-menus/shop-member/modals/RemoveMember.vue'
import Index from '../../lib/index.vue'
export default {
  components: {
    RemoveMember,
    Index,
  },
  data() {
    return {
      shops: [],
      shopMember: true,
      remove: false,
      removeMemberid: '',
      confirmRemove: false,
      add: false,
      resultMember: true,
      rows: ['', '', ''],
      name: '',
      user_id: '',
      email: '',
      title: '',
      start_time: '',
      end_time: '',
      phone_number: '',
      password: '',
      password_confirm: '',
      shop_member_permission: '',
      member: {},
      profiles: [],
    }
  },
  mounted() {
    this.memberList()
  },
  methods: {
    removeMember(id) {
      this.removeMemberid = id
      if (this.confirmRemove == true) {
        this.$axios
          .get('api/staff/' + id)
          .then((response) => {
            this.$toast.success('Member remove successfully !')
            this.removeMemberid = ''
            this.confirmRemove = false
            this.memberList()
          })
          .catch((error) => {
            this.$toast.error('Oops..!-' + error.response.data.message)
          })
      } else this.remove = true
    },
    yesRemove() {
      this.confirmRemove = true
      this.removeMember(this.removeMemberid)
      this.remove = false
    },
    closeModal() {
      this.remove = false
    },
    addNew() {
      this.add = true
    },
    setProfileData(profile) {
      if (this.$auth.user.phone_number == profile.phone_number) {
        this.$toast.error('Oops..!-Your are not execute ')
      } else {
        this.name = profile.name
        this.email = profile.email
        this.phone_number = profile.phone_number
        this.user_id = profile.id
        this.resultMember = false
      }
    },
    searchMember(e) {
      let phone = e.target.value
      let phone_len = phone.toString()
      if (phone_len.length === 10) {
        var formData = new FormData()
        formData.append('keyword', e.target.value)
        this.$axios
          .post('api/search/shop/member', formData)
          .then((response) => {
            this.profiles = response.data.data
            if (this.profiles != null) this.resultMember = true
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.$nuxt.error({ statusCode: 404, message: 'err message' })
            }
          })
      }
    },

    async memberList() {
      await this.$axios
        .get('api/staffs/' + this.$route.params.id)
        .then((response) => {
          this.member = response.data.data
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },

    async shopMemberCreate() {
      var formData = new FormData()
      formData.append('name', this.name)
      formData.append('phone_number', this.phone_number)
      formData.append('title', this.title)
      formData.append('start_time', this.start_time)
      formData.append('end_time', this.end_time)
      formData.append('email', this.email)
      formData.append('user_id', this.user_id)
      formData.append('shop_id', this.$route.params.id)
      formData.append('password', this.password)
      formData.append('password_confirm', this.password_confirm)
      formData.append('shop_member_permission', this.shop_member_permission)
      this.$axios
        .post('api/staff-create', formData)
        .then((response) => {
          this.$toast.success('Shop member create successfully!')
          this.add = false
          this.shopMember = true
          this.memberList()
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
  },
}
</script>
