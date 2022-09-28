<template>
  <div>
    <!-- Breadcrumbs -->
    <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
    <p class="text-3xl font-bold mb-4">Shop Edit</p>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <p class="title">Shop Information</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="market">Market Name</label>
              <input
                class="input-field focus:outline-none"
                id="market"
                type="text"
                v-model="market"
                readonly
                placeholder="Eastern Plaza Shopping Complex"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="floor">Floor</label>
              <input
                class="input-field focus:outline-none"
                id="floor"
                type="text"
                v-model="floor"
                readonly
                placeholder="Sanwarul Store"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="name">Shop Name</label>
              <input
                class="input-field focus:outline-none"
                id="name"
                type="text"
                v-model="shop.name"
                placeholder="Sanwarul Store"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="shop_no">Shop Number</label>
              <input
                class="input-field focus:outline-none"
                id="shop_no"
                type="text"
                v-model="shop.shop_no"
                placeholder="123"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="block_no"
                >Block Number (If any)</label
              >
              <input
                class="input-field focus:outline-none"
                id="block_no"
                type="text"
                v-model="shop.block"
                placeholder="A"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="phone">Shop Phone Number</label>
              <input
                class="input-field focus:outline-none"
                id="phone"
                type="text"
                v-model="shop.phone"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="email">Shop Email</label>
              <input
                class="input-field focus:outline-none"
                id="email"
                type="email"
                v-model="shop.email"
                placeholder="shop@email.com"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="shop-type"
                >Shop Type <span class="text-orange-1">*</span></label
              >
              <select
                class="input-field focus:outline-none"
                v-model="shop.shop_type_id"
                id="shop-type"
              >
                <option value="" disabled>Select type</option>
                <option
                  v-for="(type, i) in shop_types"
                  :key="i"
                  :value="type.id"
                  selected
                >
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <label class="input-label" for="note">Subscription note</label>
              <input
                class="input-field focus:outline-none"
                id="note"
                type="text"
                v-model="shop.subscription_note"
                placeholder="What you do offer for subscribed customer?"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="description">Description</label>
              <textarea
                id="description"
                rows="4"
                v-model="shop.description"
                class="input-field focus:outline-none"
                placeholder="What you do offer for subscribed customer?"
              >
              </textarea>
            </div>
          </div>
          <div>
            <p class="title">Shop SEO Information</p>
            <div class="p-2">
              <div class="mb-2">
                <label class="input-label" for="meta_title">Meta Title</label>
                <input
                  class="input-field focus:outline-none"
                  id="meta_title"
                  type="text"
                  v-model="shop.meta_title"
                  placeholder="@Rana Bhai, write here how to use meta title."
                />
                <small class="font-semibold"
                  >If need any help text, write here.</small
                >
              </div>
              <div class="mb-2">
                <label class="input-label" for="meta_keywords"
                  >Meta Keyword</label
                >
                <input
                  class="input-field focus:outline-none"
                  id="meta_keywords"
                  type="text"
                  v-model="shop.meta_keywords"
                  placeholder="Type and hit enter to add a tag"
                />
                <small class="font-semibold"
                  >If need any help text, write here.</small
                >
              </div>
              <div class="mb-2">
                <label class="input-label" for="meta_description"
                  >Meta Description</label
                >
                <input
                  class="input-field focus:outline-none"
                  id="meta_description"
                  type="text"
                  v-model="shop.meta_description"
                  placeholder="Write here"
                />
              </div>
              <div class="mb-2">
                <label class="input-label" for="meta_url">Meta OG URL</label>
                <input
                  class="input-field focus:outline-none"
                  id="meta_url"
                  type="text"
                  v-model="shop.meta_og_url"
                  placeholder="Write here"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="title">Shop Images</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label">Shop Banner</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div
                  v-if="!bannerUrl"
                  class="py-10 flex items-center justify-center"
                >
                  <i class="ri-attachment-line"></i>
                  <label
                    for="shop_banner"
                    class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2"
                    >Add file</label
                  >
                  <p class="inline">or drop images here</p>
                </div>
                <label for="shop_banner" class="cursor-pointer">
                  <div
                    v-if="bannerUrl"
                    style="padding-bottom: 40%"
                    class="relative flex flex-row justify-center"
                  >
                    <img class="absolute p-2 h-full m-auto" :src="bannerUrl" />
                  </div>
                </label>
                <input
                  class="hidden"
                  @change="bannerFile"
                  type="file"
                  id="shop_banner"
                />
              </div>
              <img
                class="h-40"
                :src="basePath + '/storage/' + shop.logo"
                alt="Image"
              />
            </div>
            <div class="mb-2">
              <label class="input-label">Thumbnail</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div
                  v-if="!thumbnailUrl"
                  class="py-10 flex items-center justify-center"
                >
                  <i class="ri-attachment-line"></i>
                  <label
                    for="thumbnail"
                    class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2"
                    >Add file</label
                  >
                  <p class="inline">or drop images here</p>
                </div>
                <label for="thumbnail" class="cursor-pointer">
                  <div
                    v-if="thumbnailUrl"
                    style="padding-bottom: 40%"
                    class="relative flex flex-row justify-center"
                  >
                    <img
                      class="absolute p-2 h-full m-auto"
                      :src="thumbnailUrl"
                    />
                  </div>
                </label>
                <input
                  class="hidden"
                  type="file"
                  @change="thumbnailFile"
                  id="thumbnail"
                />
              </div>
              <img
                class="h-40"
                :src="basePath + '/storage/' + shop.cover_image"
                alt="Image"
              />
            </div>
            <div class="mb-2">
              <label class="input-label">Slider Image</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div class="py-3">
                  <label class="cursor-pointer" for="gallery"
                    ><i
                      class="ri-add-line text-blue-1 font-bold text-4xl"
                    ></i></label
                  ><br />
                  <p class="text-gray-4">Minimum: 4, Maximum: 8</p>
                  <div class="grid grid-cols-4 gap-2 justify-center">
                    <div
                      style="padding-bottom: 50%"
                      v-for="(gallery_image_url, i) in gallery_images_url"
                      :key="i"
                      class="relative"
                    >
                      <img
                        class="absolute w-full h-full object-cover"
                        :src="gallery_image_url"
                      />
                    </div>
                  </div>
                </div>
                <input
                  class="hidden"
                  type="file"
                  multiple
                  @change="galleryFiles"
                  id="gallery"
                />
              </div>
              <div class="grid grid-cols-4 gap-2 justify-center">
                <div
                  v-for="(gallery, i) in shop_gallery"
                  :key="i"
                  class="relative"
                >
                  <img
                    :src="basePath + '/storage/' + gallery.image"
                    alt="Image"
                  />
                  <span
                    @click="removeImage(gallery)"
                    class="product-delete cursor-pointer"
                  >
                    <i class="text-red-500 ri-close-circle-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center my-8 border-t pt-8 border-gray-3">
        <button
          class="font-semibold border border-gray-3 py-1 px-16 focus:outline-none bg-gray-3 hover:bg-green-3 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
export default {
  middleware: ['auth'],
  components: {
    Breadcrumb,
  },
  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      breadCrumbs: [
        { title: 'My Shop', url: '' },
        { title: 'Own Shop', url: '' },
        { title: 'Shop name gose here', url: '' },
      ],
      shop: {
        name: '',
        phone: '',
        email: '',
        shop_type_id: '',
        shop_no: '',
        block: '',
        logo: '',
        cover_image: '',
        subscription_note: '',
        description: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        meta_og_url: '',
      },
      shop_banner: '',
      thumbnail: '',
      gallery_images: [],
      floor: '',
      market: '',
      url: null,
      bannerUrl: null,
      thumbnailUrl: null,
      gallery_images_url: [],
      shop_types: [],
      shop_gallery: '',
    }
  },
  mounted() {
    this.loadShopTypes()
    this.loadShop()
  },
  methods: {
    async loadShopTypes() {
      await this.$axios
        .get('/api/shops/shop-types')
        .then((res) => {
          this.shop_types = res.data.data
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },

    bannerFile(event) {
      this.shop_banner = event.target.files[0]
      const file = event.target.files[0]
      this.bannerUrl = URL.createObjectURL(file)
    },
    thumbnailFile(event) {
      console.log(event.target.files[0])
      this.thumbnail = event.target.files[0]
      this.thumbnailUrl = URL.createObjectURL(this.thumbnail)
    },
    galleryFiles(e) {
      this.gallery_images = e.target.files
      for (var i = 0; i < this.gallery_images.length; i++) {
        this.gallery_images_url.push(
          URL.createObjectURL(this.gallery_images[i])
        )
      }
    },
    async loadShop() {
      await this.$axios
        .get('/api/my-shops/' + this.$route.params.id)
        .then((res) => {
          this.shop = res.data.data
          this.floor = res.data.data.floor.floor
          this.market = res.data.data.market.name
          let shop_gallery = res.data.data.shop_gallery
          this.shop_gallery = shop_gallery.length > 0 ? shop_gallery : ''
          console.log(this.shop)
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },

    submitForm() {
      var formData = new FormData()
      formData.append('name', this.shop.name)
      formData.append('phone', this.shop.phone)
      formData.append('email', this.shop.email)
      formData.append('shop_type_id', this.shop.shop_type_id)
      formData.append('shop_no', this.shop.shop_no)
      formData.append('block', this.shop.block)
      formData.append('subscription_note', this.shop.subscription_note)
      formData.append('description', this.shop.description)
      formData.append('meta_title', this.shop.meta_title)
      formData.append('meta_keywords', this.shop.meta_keywords)
      formData.append('meta_description', this.shop.meta_description)
      formData.append('meta_og_url', this.shop.meta_og_url)
      formData.append('logo', this.shop_banner)
      formData.append('cover_image', this.thumbnail)

      //save shop gallery images
      for (const i of Object.keys(this.gallery_images)) {
        formData.append('image[]', this.gallery_images[i])
      }

      this.$axios
        .post(`/api/my-shops/update/${this.$route.params.id}`, formData)
        .then((response) => {
          this.loadShop()
          this.$router.push(`/shop/self/${this.$route.params.id}`)
          this.$toast.success('Your shop is update successfully !')
        })
        .catch((error) => {
          this.btnAction = false
          this.$toast.error('Oops..! Something wrong...!')
        })
    },
    async removeImage(gallery) {
      await this.$axios
        .get('/api/my-shops/media-image/' + gallery.id)
        .then((response) => {
          this.loadShop()
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },
  },
}
</script>
