<template>
  <div>
    <!-- Breadcrumbs -->
    <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>

    <p class="font-bold text-3xl mb-4">Add your shop</p>
    <p class="py-2 title">Shop Information</p>
    <div class="p-2 grid grid-cols-2 gap-8">
      <div class="mb-12">
        <form @submit.prevent="submitForm">
          <input
            v-if="this.$route.params.city_id"
            type="hidden"
            v-model="$v.city.$model"
          />
          <div v-else class="mb-2">
            <label class="input-label" for="city-name"
              >City <span class="require">*</span></label
            >
            <select
              @change="loadArea()"
              class="input-field focus:outline-none"
              id="city-name"
              v-model.trim="$v.city.$model"
              :class="{ 'is-invalid': $v.city.$error }"
            >
              <option value="0" disabled selected>Select City</option>
              <option v-for="(city, i) in cities" :key="i" :value="city.id">
                {{ city.name }}
              </option>
            </select>
            <div class="error-message">
              <small
                v-if="!$v.city.required"
                :class="!$v.city.$error ? 'hidden' : ''"
                >Field is required.</small
              >
            </div>
          </div>

          <input
            v-if="this.$route.params.area_id"
            type="hidden"
            v-model="$v.area.$model"
          />
          <div v-else class="mb-2">
            <label class="input-label" for="area-name"
              >Area <span class="require">*</span></label
            >
            <select
              @change="loadMarket()"
              class="input-field focus:outline-none"
              id="city-name"
              v-model.trim="$v.area.$model"
              :class="{ 'is-invalid': $v.area.$error }"
            >
              <option value="0" disabled selected>Select Area</option>
              <option v-for="(area, i) in areas" :key="i" :value="area.id">
                {{ area.name }}
              </option>
            </select>
            <div class="error-message">
              <small
                v-if="!$v.area.required"
                :class="!$v.area.$error ? 'hidden' : ''"
                >Field is required.</small
              >
            </div>
          </div>
          <div v-if="this.$route.params.market_id" class="mb-2">
            <label class="input-label" for="shop-name"
              >Market Name <span class="require">*</span></label
            >
            <input type="hidden" v-model="$v.market.$model" />
            <input
              class="input-field focus:outline-none"
              id="market-name"
              type="text"
              :placeholder="this.$route.params.market_name"
              disabled
            />
          </div>
          <div v-else class="mb-2">
            <label class="input-label" for="market-name"
              >Market Name <span class="require">*</span></label
            >
            <select
              class="input-field focus:outline-none"
              id="market-name"
              v-model.trim="$v.market.$model"
              :class="{ 'is-invalid': $v.market.$error }"
            >
              <option value="" disabled selected>Select Market</option>
              <option
                v-for="(market, i) in markets"
                :key="i"
                :value="market.id"
              >
                {{ market.name }}
              </option>
            </select>
            <div class="error-message">
              <small
                v-if="!$v.market.required"
                :class="!$v.market.$error ? 'hidden' : ''"
                >Field is required.</small
              >
            </div>
          </div>

          <div class="mb-2">
            <label class="input-label" for="floor">Floor</label>
            <select
              class="input-field focus:outline-none"
              id="floor"
              v-model="floor_id"
            >
              <option value="" disabled selected>Select Floor</option>
              <option
                v-for="(floor, k) in floors"
                :key="k"
                :value="floor.id"
                selected
              >
                {{ floor.floor }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="input-label" for="shop-name"
              >Shop Name <span class="require">*</span></label
            >
            <input
              class="input-field focus:outline-none"
              id="shop-name"
              type="text"
              placeholder="XYZ varieties store"
              v-model.trim="$v.name.$model"
              :class="{ 'is-invalid': $v.name.$error }"
            />
            <div class="error-message">
              <small
                v-if="!$v.name.required"
                :class="!$v.name.$error ? 'hidden' : ''"
                >Shop Name is required.</small
              >
            </div>
          </div>
          <div class="mb-2">
            <label class="input-label" for="shop-number"
              >Shop Number <span class="require">*</span></label
            >
            <input
              class="input-field focus:outline-none"
              id="shop-number"
              type="text"
              placeholder="123"
              v-model.trim="$v.shopNo.$model"
              :class="{ 'is-invalid': $v.shopNo.$error }"
            />
            <div class="error-message">
              <small
                v-if="!$v.shopNo.required"
                :class="!$v.shopNo.$error ? 'hidden' : ''"
                >Field is required.</small
              >
            </div>
          </div>
          <div class="mb-2">
            <label class="input-label" for="block">Block Number (If any)</label>
            <input
              class="input-field focus:outline-none"
              id="block"
              type="text"
              v-model="block"
              placeholder="A"
            />
          </div>

          <div class="divider my-6"></div>

          <button
            type="submit"
            v-if="!btnAction"
            class="focus:outline-none w-full mb-4"
            :class="this.$v.$invalid ? 'btn-disabled' : 'btn-active'"
          >
            Submit
          </button>
          <p
            v-if="btnAction"
            class="focus:outline-none w-full mb-4 btn-disabled cursor-wait"
          >
            Please wait...
          </p>
        </form>
        <p class="text-center">
          I don't want to Add Shop now.
          <n-link to="/shop-login" class="ml-2 text-orange-1 font-bold"
            >Go back</n-link
          >
        </p>
      </div>
      <div>
        <div class="border border-purple-2 rounded-xl w-1/2 m-auto mt-12">
          <p class="bg-purple-2 text-white text-center py-2 rounded-t-xl">
            Required Documents
          </p>
          <div class="text-purple-2 p-4">
            <p>1. Trade License</p>
            <p>2. NID</p>
            <p>3. Passport size photo (2 copy)</p>
          </div>
        </div>
        <p class="w-1/2 m-auto">
          Our team will collect these documents from you and verify your store.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  middleware: 'auth',

  data() {
    return {
      city: this.$route.params.city_id ? this.$route.params.city_id : 0,
      area: this.$route.params.area_id ? this.$route.params.area_id : 0,
      market: this.$route.params.market_id ? this.$route.params.market_id : '',
      floor_id: '',
      floors: [],
      name: '',
      shopNo: '',
      block: '',
      btnAction: false,
      breadCrumbs: [
        { title: 'Home', url: '/' },
        { title: 'Go To Market', url: '/cities' },
        { title: 'Dhaka', url: '/markets' },
        { title: this.$route.params.market_name, url: '/market' },
        { title: 'Grand Floor', url: '/market' },
        { title: 'Shop name goes to here', url: '' },
      ],
      cities: [],
      areas: [],
      markets: [],
    }
  },
  validations: {
    city: {
      required,
    },
    area: {
      required,
    },
    market: {
      required,
    },
    name: {
      required,
    },
    shopNo: {
      required,
    },
  },
  components: {
    Breadcrumb,
  },
  mounted() {
    this.loadData()
    this.loadArea()
    this.loadMarket()
    this.loadFloors()
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (!this.$v.$invalid != null) {
        var formData = new FormData()
        formData.append('city_id', this.city)
        formData.append('area_id', this.area)
        formData.append('market_id', this.market)
        formData.append('floor_id', this.floor_id)
        formData.append('name', this.name)
        formData.append('shop_no', this.shopNo)
        formData.append('block', this.block)

        this.$axios
          .post('/api/my-shops', formData)
          .then((response) => {
            this.$router.push(
              '/shop/under-verification/' + response.data.data.id
            )
            this.$toast.success('Your shop is created successfully !')
          })
          .catch((error) => {
            this.btnAction = false
            this.$toast.error('Oops..! Something wrong...!')
          })
        this.btnAction = true
      } else {
        this.$toast.error('Please fill the form correctly!')
      }
    },

    async loadData() {
      await this.$axios.$get('/api/cities').then((res) => {
        this.cities = res.data
      })
    },
    async loadArea() {
      await this.$axios.$get('/api/areas-by-city/' + this.city).then(
        function (response) {
          this.areas = response.data
        }.bind(this)
      )
    },
    async loadMarket() {
      await this.$axios
        .$get('/api/markets/all-market-by-area/' + this.area)
        .then(
          function (response) {
            this.markets = response.data
          }.bind(this)
        )
    },
    async loadFloors() {
      await this.$axios.$get('/api/floors').then(
        function (res) {
          this.floors = res.data
        }.bind(this)
      )
    },
  },
}
</script>
