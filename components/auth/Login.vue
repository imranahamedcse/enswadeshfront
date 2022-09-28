<template>
  <div>
    <div
      @click="closeModal"
      class="fixed inset-0 z-50 flex flex-col justify-center items-center md:my-12 m-2"
    >
      <div @click="wait" class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
        <div class="grid md:grid-cols-7">
          <div class="hidden md:contents">
            <div
              class="md:col-span-3 bg-green-4 text-white md:p-6 p-2 flex flex-col justify-between"
            >
              <div>
                <p class="font-bold text-3xl">Login account</p>
                <p class="font-bold text-gray-4">
                  Lorem ipsum dolor sit amet, sadipscing elitr, sed diam nonumy
                </p>
              </div>

              <div class="relative pb-2/3">
                <img
                  class="absolute bottom-0 object-cover"
                  src="~/assets/img/auth.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="md:col-span-4">

            <div class="w-full text-right pr-1 md:bg-white bg-green-4 md:text-green-4 text-white">
              <button
                @click="closeLoginModal"
                class="text-2xl focus:outline-none"
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
            <p class="font-bold text-3xl text-center md:hidden md:bg-white bg-green-4 md:text-green-4 text-white md:pb-0 pb-10">Login account</p>
            <div class="md:p-6 p-2">
              <form @submit.prevent="submitForm">
                <div class="mb-2">
                  <label class="font-bold" for="phone"
                    >Email or Mobile phone number</label
                  >
                  <input
                    class="focus:outline-none input-field"
                    id="phone"
                    type="text"
                    placeholder="hello@example.com"
                    v-model.trim="$v.phone.$model"
                    :class="{ 'is-invalid': $v.phone.$error }"
                  />
                  <div class="error-message">
                    <small
                      v-if="!$v.phone.required"
                      :class="!$v.phone.$error ? 'hidden' : ''"
                      >Field is required.</small
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <label class="font-bold" for="name">Password</label>
                  <div class="relative">
                    <input
                      class="focus:outline-none input-field pr-6"
                      id="name"
                      :type="show ? 'text' : 'password'"
                      placeholder="At least 8 characters"
                      v-model.trim="$v.password.$model"
                      :class="{ 'is-invalid': $v.password.$error }"
                    />
                    <i
                      v-if="!show"
                      @click="showPassword"
                      class="ri-eye-fill absolute top-0 right-0 cursor-pointer pr-2 pt-1 text-xl"
                    ></i>
                    <i
                      v-if="show"
                      @click="showPassword"
                      class="ri-eye-off-fill absolute top-0 right-0 cursor-pointer pr-2 pt-1 text-xl"
                    ></i>
                  </div>
                  <div class="error-message">
                    <small
                      v-if="!$v.password.required"
                      :class="!$v.password.$error ? 'hidden' : ''"
                      >Password is required.</small
                    >
                    <small v-if="!$v.password.minLength"
                      >Password must have at least
                      {{ $v.password.$params.minLength.min }} letters.</small
                    >
                  </div>
                </div>
                <button
                  type="submit"
                  v-if="!btnAction"
                  class="focus:outline-none w-full mb-6"
                  :class="this.$v.$invalid ? 'btn-disabled' : 'btn-active'"
                >
                  Login your swades account
                </button>
                <p
                  v-if="btnAction"
                  class="focus:outline-none w-full mb-2 btn-disabled cursor-wait"
                >
                  Please wait...
                </p>
              </form>
              <div class="border-t text-gray-3 mb-3"></div>

              <div class="flex items-center mb-3">
                <p>Quick access with</p>
                <n-link to="">
                  <i class="ri-facebook-circle-fill text-2xl ml-4"></i>
                </n-link>
                <n-link to="">
                  <i class="ri-google-fill text-2xl ml-4"></i>
                </n-link>
              </div>

              <div class="border-t text-gray-3 mb-6"></div>

              <p>
                Don't have an account?
                <button
                  @click="openRegistrationModal"
                  class="focus:outline-none ml-2 text-orange-1 font-bold"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="closeModal"
      class="opacity-50 fixed inset-0 z-40 bg-green-4"
    ></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      phone: '',
      password: '',
      btnAction: false,
      show: false,
      close_modal: 'closeModal',
    }
  },
  validations: {
    phone: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.closeLoginModal()
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },

    closeLoginModal() {
      this.$emit('closeLoginModal')
    },
    openRegistrationModal() {
      this.$emit('openRegistrationModal')
    },
    showPassword() {
      this.show = !this.show
    },
    submitForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        var formData = new FormData()
        formData.append('phone_number', this.phone)
        formData.append('password', this.password)
        this.$auth
          .login({
            data: formData,
          })
          .then((response) => {
            localStorage.setItem('user', this.$auth.user)
            localStorage.setItem('token', response.data.data.access_token)
            this.$store.dispatch('authcheck/setUser', this.$auth.user)
            this.$store.dispatch(
              'authcheck/setToken',
              response.data.data.access_token
            )
            this.$axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${this.tokenHeader}`
            this.$toast.success('Successfully login your account!')
            this.closeLoginModal()
          })
          .catch((error) => {
            this.btnAction = false
            this.$toast.error('Oops..!-' + error.response.data.message)
          })
        this.btnAction = true
        //this.$toast.info('Thanks for your submission!');
      } else {
        this.$toast.error('Please fill the form correctly!')
      }
    },
  },

  computed: {
    ...mapGetters({
      tokenHeader: 'authcheck/token',
    }),
  },
}
</script>
