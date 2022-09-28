<template>
  <div class="min-h-screen">
    <div class="py-10 text-center">
      <p class="font-bold text-3xl mb-4">Login your swades account!</p>
    </div>
    <div class="bg-green-1">
      <p class="py-2 font-bold max-w-sm m-auto">Account Information</p>
    </div>
    <div class="py-6 max-w-sm m-auto">
      <form @submit.prevent="submitForm">
        <div class="mb-2">
          <label class="font-bold" for="phone"
            >Email or Mobile phone number</label
          >
          <input
            type="text"
            class="focus:outline-none input-field"
            id="phone"
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
          <label class="font-bold" for="password">Password</label>
          <div class="relative mb-1">
            <input
              class="focus:outline-none input-field pr-6"
              id="password"
              :type="show ? 'text' : 'password'"
              placeholder="Enter your password"
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
          <n-link to="" class="text-blue-1">Forgot password?</n-link>
        </div>
        <button
          type="submit"
          v-if="!btnAction"
          class="focus:outline-none w-full"
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

      <div class="border-t text-gray-3 mb-6"></div>

      <p @click="openRegistrationModal" class="text-center">
        Don't have an account?
        <n-link to="#" class="ml-2 text-orange-1 font-bold"
          >Create account</n-link
        >
      </p>
    </div>

    <!-- Registration Modal -->
    <registration
      v-if="registrationModal"
      v-on:closeRegistrationModal="closeRegistrationModal()"
      v-on:openLoginModal="openLoginModal()"
    ></registration>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Registration from '~/components/auth/Registration.vue'

export default {
  middleware: 'auth',
  data() {
    return {
      phone: '',
      password: '',
      btnAction: false,
      show: false,
      registrationModal: false,
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
            this.$auth.$storage.setLocalStorage('user', this.$auth.user)
            this.$auth.$storage.setLocalStorage(
              'token',
              response.data.data.access_token
            )
            this.$store.dispatch('authcheck/setUser', this.$auth.user)
            this.$store.dispatch('authcheck/setToken', this.$auth.token)
            this.$toast.success('Successfully login your account!')
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

    openRegistrationModal() {
      this.registrationModal = true
    },
    closeRegistrationModal() {
      this.registrationModal = false
    },
  },
}
</script>
