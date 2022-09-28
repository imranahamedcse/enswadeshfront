<template>
  <div>
    <p class="title">Shipping Address</p>
    <div class="px-2 py-4">
      <label for="name" class="font-semibold">Your name</label>
      <input
        id="name"
        type="text"
        v-model="shipping_name"
        class="input-field focus:outline-none mb-2 mt-1"
        placeholder="Type your name"
      />

      <label for="email" class="font-semibold">Your email</label>
      <input
        id="email"
        v-model="shipping_email"
        type="email"
        class="input-field focus:outline-none mb-2 mt-1"
        placeholder="Type your email"
      />

      <label for="region" class="font-semibold">Region</label>
      <input
        id="region"
        v-model="region"
        type="text"
        class="input-field focus:outline-none mb-2 mt-1"
        placeholder="Type your region"
      >
      <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
        <option value="" selected disabled>Select your region</option>
        <option value="">...</option>
        <option value="">...</option>
        <option value="">...</option>
      </select> -->

      <label for="city" class="font-semibold">City</label>
      <input
        id="city"
        v-model="city"
        type="text"
        class="input-field focus:outline-none mb-2 mt-1"
        placeholder="Type your city"
      >
      <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
        <option value="" selected disabled>Select your city</option>
        <option value="">...</option>
        <option value="">...</option>
        <option value="">...</option>
      </select> -->

      <label for="area" class="font-semibold">Area</label>
      <input
        id="area"
        v-model="area"
        type="email"
        class="input-field focus:outline-none mb-2 mt-1"
        placeholder="Type your email"
      >
      <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
        <option value="" selected disabled>Select your area</option>
        <option value="">...</option>
        <option value="">...</option>
        <option value="">...</option>
      </select> -->

      <label for="address" class="font-semibold">Address</label>
      <input
        id="address"
        type="text"
        v-model="address"
        class="border border-gray-3 rounded focus:outline-none px-2 py-1 mt-1 w-full"
        placeholder="Flat# 3B, Floor# 2nd, House#23, Road#1A"
      />
    </div>
    <p class="title">Billing Address</p>
    <div class="p-2 my-2">
      <div class="flex items-center">
        <input
          @click="closeAnotherAddress"
          class="mr-2 w-4 h-4"
          type="radio"
          name="bill"
          id="shipping"
          checked
        />
        <label for="shipping">Same as the shipping address</label>
      </div>
      <div class="flex items-center">
        <input
          @click="anotherAddress"
          class="mr-2 w-4 h-4"
          type="radio"
          name="bill"
          id="another" />
        <label for="another">Bill to the another address</label>
      </div>
    </div>


    <div class="" v-if="billAddress">
      <div class="px-2 pb-4">
        <label for="name" class="font-semibold">Your name</label>
        <input
          id="name"
          type="text"
          class="input-field focus:outline-none mb-2 mt-1"
          placeholder="Type your name"
        />

        <label for="email" class="font-semibold">Your email</label>
        <input
          id="email"
          type="email"
          class="input-field focus:outline-none mb-2 mt-1"
          placeholder="Type your email"
        />

        <label for="region" class="font-semibold">Region</label>
        <select id="region" class="input-field focus:outline-none mb-2 mt-1">
          <option value="" selected disabled>Select your region</option>
          <option value="">...</option>
          <option value="">...</option>
          <option value="">...</option>
        </select>

        <label for="region" class="font-semibold">City</label>
        <select id="region" class="input-field focus:outline-none mb-2 mt-1">
          <option value="" selected disabled>Select your city</option>
          <option value="">...</option>
          <option value="">...</option>
          <option value="">...</option>
        </select>

        <label for="region" class="font-semibold">Area</label>
        <input
          id="area"
          v-model="billing_area"
          type="email"
          class="input-field focus:outline-none mb-2 mt-1"
          placeholder="Type your email"
        >
        <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
          <option value="" selected disabled>Select your area</option>
          <option value="">...</option>
          <option value="">...</option>
          <option value="">...</option>
        </select> -->

        <label for="address" class="font-semibold">Address</label>
        <input
          id="address"
          type="text"
          class="border border-gray-3 rounded focus:outline-none px-2 py-1 mt-1 w-full"
          placeholder="Flat# 3B, Floor# 2nd, House#23, Road#1A"
        />
      </div>
    </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
      billAddress: false,
      phone_no:'',
      shipping_name : '',
      shipping_email : '',
      region: '',
      city: '',
      area: '',
      address: '',
    }
  },
  mounted() {
    this.phone_no = this.$auth.user.phone,
    this.shipping_name = this.$auth.user.name
    this.shipping_email = this.$auth.user.email
    this.region = this.$auth.user.profile?.region
    this.city = this.$auth.user.profile?.city
    this.area = this.$auth.user.profile?.area
    this.address = this.$auth.user.profile?.address
  },
  methods: {
    anotherAddress(){
      this.billAddress = true
    },
    closeAnotherAddress(){
      this.billAddress = false
    }
  }
}
</script>
