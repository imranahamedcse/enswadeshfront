<template>
  <div>
    <p class="title">Personal Information</p>
    <div class="p-4 bg-white">
      <label for="name" class="input-label">Name</label>
      <form @submit.prevent="changeName">
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="text"
              id="name"
              v-model="user.name"
              class="input-field focus:outline-none"
              placeholder="Adam"
            />
          </div>
          <div>
            <button
              type="submit"
              class="focus:outline-none font-bold text-blue-1"
            >
              Change name
            </button>
          </div>
        </div>
      </form>
      <label for="blood_group" class="input-label">Blood Group</label>
      <form @submit.prevent="changeBloodGroup">
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="text"
              id="blood_group"
              v-model="blood_group"
              class="input-field focus:outline-none"
              placeholder="AB+"
            />
          </div>
          <div>
            <button
              type="submit"
              class="focus:outline-none font-bold text-blue-1"
            >
              Change blood group
            </button>
          </div>
        </div>
      </form>
      <label for="dob" class="input-label">Date of birth</label>
      <form @submit.prevent="changeDateOfBirth">
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="date"
              id="dob"
              v-model="dob"
              class="input-field focus:outline-none"
              placeholder="16/08/1994"
            />
          </div>
          <div>
            <button
              type="submit"
              class="focus:outline-none font-bold text-blue-1"
            >
              Change date of birth
            </button>
          </div>
        </div>
      </form>
    </div>
    <p class="title mt-4">Profile Photo</p>
    <div class="p-4 bg-white">
      <div class="grid grid-cols-2 gap-4 items-center justify-center">
        <form @submit.prevent="changeProfileImage">
          <div>
            <div class="mb-2">
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div
                  v-if="!profileUrl"
                  class="py-10 flex items-center justify-center"
                >
                  <i class="ri-attachment-line"></i>
                  <label
                    for="profile_image"
                    class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2"
                    >Add file</label
                  >
                  <img
                    class="avatar"
                    :src="basePath + '/storage/' + image"
                    alt="Image"
                  />
                </div>
                <label for="profile_image" class="cursor-pointer">
                  <div
                    v-if="profileUrl"
                    style="padding-bottom: 40%"
                    class="relative flex flex-row justify-center"
                  >
                    <img class="absolute p-2 h-full m-auto" :src="profileUrl" />
                  </div>
                </label>
                <input
                  class="hidden"
                  @change="profileFile"
                  type="file"
                  id="profile_image"
                />
              </div>
            </div>
          </div>
          <div>
            <button class="focus:outline-none font-bold text-blue-1">
              Change photo
            </button>
          </div>
        </form>
      </div>
    </div>
    <form @submit.prevent="changeProfile">
      <div
        class="grid grid-cols-2 gap-4 items-center justify-center title mt-4"
      >
        <div><p>Address</p></div>
        <div>
          <button
            type="submit"
            class="focus:outline-none font-bold text-blue-1"
          >
            Change address
          </button>
        </div>
      </div>
      <div class="p-4 bg-white mb-4">
        <label for="region" class="input-label">Region</label>
        <input
          type="text"
          id="region"
          v-model="region"
          class="input-field focus:outline-none mb-4"
          placeholder="Dhaka"
        />
        <label for="city" class="input-label">City</label>
        <input
          type="text"
          id="city"
          v-model="city"
          class="input-field focus:outline-none mb-4"
          placeholder="Dhaka"
        />
        <label for="area" class="input-label">Area</label>
        <input
          type="text"
          id="area"
          v-model="area"
          class="input-field focus:outline-none mb-4"
          placeholder="Shahbag"
        />
        <label for="address" class="input-label">Address</label>
        <input
          type="text"
          id="address"
          v-model="address"
          class="input-field focus:outline-none mb-4"
          placeholder="Flat#
          3B, Floor# 2nd, House#23, Road#1A"
        />
      </div>
    </form>
    <form @submit.prevent="changePassword">
      <div
        class="grid grid-cols-2 gap-4 items-center justify-center title mt-4"
      >
        <p class="title">Password</p>
        <div>
          <button class="focus:outline-none font-bold text-blue-1">
            Change password
          </button>
        </div>
      </div>
      <div class="p-4 bg-white">
        <label for="current_password" class="input-label"
          >Current Password</label
        >
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="password"
              id="current_password"
              v-model="current_password"
              class="input-field focus:outline-none"
              placeholder="*****"
            />
          </div>
        </div>
        <label for="password" class="input-label">Password</label>
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="password"
              id="password"
              v-model="password"
              class="input-field focus:outline-none"
              placeholder="*****"
            />
          </div>
        </div>
        <label for="password-confirm" class="input-label"
          >Confirm Password</label
        >
        <div class="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          <div>
            <input
              type="password"
              v-model="confirm_password"
              id="password_confirm"
              class="input-field focus:outline-none"
              placeholder="*****"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      user: {
        name: '',
      },
      region: '',
      city: '',
      area: '',
      address: '',
      blood_group: '',
      image: '',
      profile_image: '',
      dob: '',
      url: null,
      profileUrl: null,

      password: '',
      current_password: '',
      confirm_password: '',
    }
  },

  mounted() {
    this.user = this.$auth.user
    this.region = this.$auth.user.profile?.region
    this.city = this.$auth.user.profile?.city
    this.area = this.$auth.user.profile?.area
    this.address = this.$auth.user.profile?.address
    this.blood_group = this.$auth.user.profile?.blood_group
    this.dob = this.$auth.user.profile?.dob
    this.image = this.$auth.user.profile?.image
  },

  methods: {
    profileFile(event) {
      this.profile_image = event.target.files[0]
      const file = event.target.files[0]
      this.profileUrl = URL.createObjectURL(file)
    },

    async changeName() {
      var formData = new FormData()
      formData.append('model', 'User')
      formData.append('name', this.user.name)
      this.$axios
        .post('api/user-info-update', formData)
        .then((response) => {
          this.$toast.success('User name change successfully save !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async changeBloodGroup() {
      var formData = new FormData()
      formData.append('model', 'Profile')
      formData.append('blood_group', this.blood_group)
      this.$axios
        .post('api/user-info-update', formData)
        .then((response) => {
          this.$toast.success('User blood group change successfully save !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async changeDateOfBirth() {
      var formData = new FormData()
      formData.append('model', 'Profile')
      formData.append('dob', this.dob)
      this.$axios
        .post('api/user-info-update', formData)
        .then((response) => {
          this.$toast.success('User date of birth change successfully save !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async changeProfileImage() {
      var formData = new FormData()
      formData.append('model', 'Profile')
      formData.append('image', this.profile_image)
      this.$axios
        .post('api/user-info-update', formData)
        .then((response) => {
          this.$toast.success('User profile image change successfully save !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async changeProfile() {
      var formData = new FormData()
      formData.append('model', 'Profile')
      formData.append('region', this.region)
      formData.append('city', this.city)
      formData.append('area', this.area)
      formData.append('address', this.address)
      this.$axios
        .post('api/user-info-update', formData)
        .then((response) => {
          this.$toast.success('User address change successfully save !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async changePassword() {
      var formData = new FormData()
      formData.append('current_password', this.current_password)
      formData.append('password', this.password)
      formData.append('confirm_password', this.confirm_password)
      this.$axios
        .post('api/profile/security', formData)
        .then((response) => {
          this.$auth.logout()
          this.$toast.success('User password change successfully !')
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
  },
}
</script>
