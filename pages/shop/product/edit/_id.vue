<template>
  <div>
    <!-- <div class="add_loader" v-if="isLoading">
      <div class="main-loader"><loader></loader></div>
    </div> -->

    <!-- Breadcrumbs -->
    <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
    <div class="flex justify-between">
      <p class="font-bold text-3xl">Add Product</p>
      <n-link to="#" class="text-blue-1 font-bold">Need help?</n-link>
    </div>
    <p class="title">Choose an appropriate format</p>
    <div class="p-2">
      <div class="flex my-4">
        <button
          v-for="(format, i) in formats"
          :key="i"
          :class="format.item ? 'bg-green-3' : 'bg-white'"
          @click="simpleFormat(format)"
          class="font-bold border border-gray-3 hover:bg-green-3 py-1 px-4 focus:outline-none"
        >
          {{ format.title }}
        </button>
      </div>
      <p class="mb-4">Write here why use this format as a helper text</p>
    </div>
    <div class="bg-white rounded-lg mb-6">
      <p class="title">Similarity</p>
      <div class="p-2">
        <div class="mb-2">
          <label class="input-label" for="similar">Select product</label>
          <select
            class="input-field focus:outline-none"
            v-model="similar_product_id"
            name=""
            id="similar"
          >
            <option
              v-for="product in similar_product"
              :key="'product' + product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
          <p>Write here the benefit of similar product check.</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-12 mb-6">
      <div class="">
        <div class="bg-white rounded-lg mb-6">
          <p class="title">Basic Information</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="name">Product Name</label>
              <input
                class="input-field focus:outline-none"
                id="name"
                type="text"
                v-model="name"
                placeholder="Type your product title"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="category">Brand Name</label>
              <div class="grid grid-cols-5 gap-4">
                <div class="col-span-6">
                  <div class="search-conatiner">
                    <input type="hidden" v-model="brand_id" />
                    <input
                      type="text"
                      placeholder="Type your query"
                      v-model="search"
                      @blur="brandtoggleclose"
                      @focus="brandtoggleopen"
                    />

                    <div v-if="filteredList.length">
                      <div class="results" v-if="brandtoggle">
                        <div
                          class="result"
                          v-for="brand in filteredList"
                          :key="brand.id"
                          @click="selectResult(brand)"
                        >
                          <span
                            v-if="brand.name"
                            @click="selectResult(brand)"
                            @mousedown.prevent
                          >
                            {{ brand.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="results" v-else>
                      <div class="results-flex" @click="addBrand()">
                        <span @click="addBrand()" @mousedown.prevent>
                          {{ search }}
                        </span>
                        <button class="btn">
                          <i class="ri-add-circle-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="input-label" for="code">Product code/SKU</label>
              <input
                class="input-field focus:outline-none"
                id="code"
                type="text"
                v-model="sku"
                placeholder="Type code hear"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="category">Category</label>
              <div class="grid grid-cols-5 gap-4">
                <div class="col-span-6">
                  <div class="search-conatiner">
                    <input type="hidden" v-model="category_id" />
                    <input
                      type="text"
                      placeholder="Type your query"
                      v-model="categoriessearch"
                      @blur="categoriestoggleclose"
                      @focus="categoriestoggleopen"
                    />

                    <div v-if="categoriesList.length">
                      <div class="results" v-if="categoriestoggle">
                        <div
                          class="result"
                          v-for="categories in categoriesList"
                          :key="categories.id"
                          @click="selectResultcategories(categories)"
                        >
                          <span
                            v-if="categories.name"
                            @click="selectResultcategories(categories)"
                            @mousedown.prevent
                          >
                            {{ categories.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="results" v-else>
                      <div class="results-flex">
                        <span>
                          {{ categoriessearch }}
                        </span>
                        <button
                          class="btn"
                          @click="cetegoryModal()"
                          @mousedown.prevent
                        >
                          <i class="ri-add-circle-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <category
              :categories="categoriesbase"
              :name="categoriessearch"
              :shopId="shopIdForCategory"
              v-if="modelcategory"
              v-on:closeModal="closeModal()"
            ></category>
          </div>
        </div>
        <div v-if="simple_format" class="bg-white rounded-lg mb-6">
          <p class="title">Price</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="price">Price</label>
              <div class="grid grid-cols-5 gap-8">
                <div class="col-span-3">
                  <input
                    class="input-field focus:outline-none"
                    id="price"
                    type="number"
                    v-model="price"
                    placeholder="What is the price for product"
                  />
                </div>
                <div class="col-span-2">
                  <label class="input-label" for="currency_type"
                    >Select Currency</label
                  >
                  <select
                    class="input-field focus:outline-none bg-gray-1"
                    id="currency_type"
                    v-model="currency_type"
                  >
                    <option value="BDT">BDT</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="input-label" for="unit">Price Per Unit</label>
              <div class="grid grid-cols-5 gap-4">
                <div class="col-span-6">
                  <select
                    class="input-field focus:outline-none"
                    name=""
                    id="unit"
                    v-model="unit_id"
                  >
                    <option
                      v-for="unit in units"
                      :key="unit.id"
                      :value="unit.id"
                    >
                      {{ unit.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="input-label" for="discount">Discount</label>
              <div class="grid grid-cols-5 gap-8">
                <div class="col-span-3">
                  <input
                    class="input-field focus:outline-none"
                    id="discount"
                    type="number"
                    placeholder="Write here"
                    v-model="discount"
                  />
                </div>
                <div class="col-span-2">
                  <label class="input-label" for="discount_type"
                    >Select Discount Type</label
                  >
                  <select
                    class="input-field focus:outline-none bg-gray-1"
                    id="discount_type"
                    v-model="discount_type"
                  >
                    <option value="Percent">Percent(%)</option>
                    <option value="Number">Number(1)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mb-2">
              <label class="input-label" for="discount-price"
                >Discount Price</label
              >
              <input
                class="input-field focus:outline-none"
                id="discount-price"
                type="number"
                placeholder="0"
                readonly
                v-model="disCountPrice"
              />
            </div>
            <div v-if="simple_format" class="mb-2">
              <label class="input-label" for="quantity">Quantity</label>
              <input
                class="input-field focus:outline-none"
                id="quantity"
                type="number"
                v-model="stocks"
                placeholder="Quantity"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="offer">Offer</label>
              <input
                class="input-field focus:outline-none"
                id="offer"
                type="text"
                v-model="offers"
                placeholder="Type here"
              />
            </div>
          </div>
        </div>
        <div v-if="weight_wise" class="bg-white rounded-lg mb-6">
          <p class="title">Weight Wise Price Information</p>
          <div class="p-2">
            <table class="w-full">
              <thead>
                <tr class="font-bold">
                  <td>Weight</td>
                  <td>Price</td>
                  <td>Discount</td>
                  <td>Type</td>
                  <td>Quantity</td>
                  <td>Offer</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(wei, i) in weights" :key="i">
                  <td>
                    <input
                      type="text"
                      v-model="wei.weight"
                      class="input-field focus:outline-none my-1"
                      placeholder="(kg, litre, cm, mm)"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="wei.price"
                      class="input-field focus:outline-none my-1"
                      placeholder="1"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="wei.discount"
                      class="input-field focus:outline-none my-1"
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <select
                      class="input-field focus:outline-none my-1"
                      id="discount_type"
                      v-model="wei.discount_type"
                    >
                      <option value="Percent">Percent(%)</option>
                      <option value="Number">Number(1)</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="wei.stocks"
                      class="input-field focus:outline-none my-1"
                      placeholder="1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="wei.offer"
                      class="input-field focus:outline-none my-1"
                      placeholder="Offer"
                    />
                  </td>
                  <td>
                    <button
                      class="focus:outline-none text-orange-1"
                      v-if="weights.length - 1 && i != 0"
                      @click="removeWeight"
                    >
                      <i class="ri-close-circle-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              @click="addWeight"
              class="font-bold text-orange-1 focus:outline-none"
            >
              Add another
            </button>
          </div>
        </div>
        <div v-if="size_wise" class="bg-white rounded-lg mb-6">
          <p class="title">Size Wise Price Information</p>
          <div class="p-2">
            <table class="w-full">
              <thead>
                <tr class="font-bold">
                  <td>Size</td>
                  <td>Price</td>
                  <td>Discount</td>
                  <td>Type</td>
                  <td>Quantity</td>
                  <td>Offer</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(siz, i) in sizes" :key="i">
                  <td>
                    <input
                      type="text"
                      v-model="siz.size"
                      class="input-field focus:outline-none my-1"
                      placeholder="(S/M/L/4/5/6)"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="siz.price"
                      class="input-field focus:outline-none my-1"
                      placeholder="1"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="siz.discount"
                      class="input-field focus:outline-none my-1"
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <select
                      class="input-field focus:outline-none my-1"
                      id="discount_type"
                      v-model="siz.discount_type"
                    >
                      <option value="Percent">Percent(%)</option>
                      <option value="Number">Number(1)</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model="siz.stocks"
                      class="input-field focus:outline-none my-1"
                      placeholder="1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="siz.offer"
                      class="input-field focus:outline-none my-1"
                      placeholder="Offer"
                    />
                  </td>
                  <td>
                    <button
                      class="focus:outline-none text-orange-1"
                      v-if="sizes.length - 1 && i != 0"
                      @click="removeSize"
                    >
                      <i class="ri-close-circle-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              @click="addSize"
              class="font-bold text-orange-1 focus:outline-none"
            >
              Add another
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg mb-6">
          <p class="title">Services</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="warranty">Warranty</label>
              <textarea
                class="input-field focus:outline-none"
                name=""
                v-model="warranty"
                id="warranty"
                rows="3"
                placeholder="Write details here about warranty"
              ></textarea>
            </div>
            <div class="mb-2">
              <label class="input-label" for="guarantee">Guarantee</label>
              <textarea
                class="input-field focus:outline-none"
                name=""
                id="guarantee"
                v-model="guarantee"
                rows="3"
                placeholder="Write details here about guarantee"
              ></textarea>
            </div>
            <div class="mb-2">
              <label class="input-label" for="discount-price"
                >Return option</label
              >
              <textarea
                class="input-field focus:outline-none"
                name=""
                id="discount-price"
                rows="3"
                v-model="return_policy"
                placeholder="Write details here about return policy"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white rounded-lg mb-6">
          <p class="title">Product Image</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label">Product Thumbnail</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div
                  v-if="!thumbnail_images"
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
                  <div class="relative pb-full">
                    <img
                      v-if="productImage != null"
                      class="absolute h-full w-full object-cover"
                      :src="
                        productImage
                          ? basePath + '/storage/' + productImage
                          : require(`~/assets/img/products/default.png`)
                      "
                      alt="Image"
                    />
                  </div>
                  <div
                    v-if="thumbnail_images"
                    style="padding-bottom: 40%"
                    class="relative flex flex-row justify-center"
                  >
                    <img
                      class="absolute p-2 h-full m-auto"
                      :src="thumbnail_images"
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
            </div>
            <div class="col-span-2">
              <label class="input-label">Gallery images</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div class="py-3">
                  <label class="cursor-pointer" for="gallery"
                    ><i
                      class="ri-add-line text-blue-1 font-bold text-4xl"
                    ></i></label
                  ><br />
                  <p class="text-gray-4">Minimum: 4, Maximum: 10</p>
                  <div class="flex flex-row gap-2 justify-center">
                    <span
                      class="h-6 w-12 bg-gray-3"
                      v-for="(gallery, i) in gallery_images_url"
                      :key="i"
                    >
                      <img :src="gallery" class="w-100" alt="Image" />
                    </span>
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
                  v-for="(image, i) in galleryImage"
                  :key="i"
                  class="relative"
                >
                  <img :src="basePath + '/storage/' + image.src" alt="Image" />
                  <span
                    @click="removeImage(image)"
                    class="product-delete cursor-pointer"
                  >
                    <i class="text-red-500 ri-close-circle-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg">
          <p class="title">More Information</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="description"
                >Details information</label
              >
              <textarea
                class="input-field focus:outline-none"
                name=""
                id="description"
                v-model="description"
                rows="4"
                placeholder="Write here product description"
              ></textarea>
            </div>
            <div class="mb-2">
              <label class="input-label" for="feature">Features</label>
              <table class="w-full">
                <tbody>
                  <tr v-for="(feature, i) in features" :key="i">
                    <td>
                      <input
                        class="input-field focus:outline-none my-1"
                        id="feature"
                        v-model="feature.title"
                        type="text"
                        placeholder="Write feature title"
                      />
                    </td>
                    <td>
                      <input
                        class="input-field focus:outline-none my-1"
                        id="feature"
                        v-model="feature.feature"
                        type="text"
                        placeholder="Write details here"
                      />
                    </td>
                    <td>
                      <button
                        class="focus:outline-none text-orange-1"
                        v-if="i === features.length - 1 && i != 0"
                        @click="removeFeature(feature)"
                      >
                        <i class="ri-close-circle-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                @click="addFeature"
                class="font-bold text-orange-1 focus:outline-none"
              >
                Add another
              </button>
            </div>
            <div class="mb-2">
              <label class="input-label">Audio description</label>
              <div
                class="border border-dashed border-gray-3 rounded text-center"
              >
                <div class="py-3 flex items-center justify-center">
                  <i class="ri-attachment-line"></i>
                  <label
                    for="audio"
                    class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2"
                    >Add file</label
                  >
                  <p class="inline">or drop audio files here</p>
                </div>
                <label for="audio" class="cursor-pointer">
                  <div
                    v-if="audio_url"
                    style="padding-bottom: 20px"
                    class="relative flex flex-row justify-center"
                  >
                    <audio controls>
                      <source :src="audio_url" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <input
                    class="hidden"
                    @change="audioFile"
                    type="file"
                    id="audio"
                  />
                </label>
              </div>
            </div>
            <div class="mb-4">
              <label class="input-label" for="video">Video description</label>
              <input
                class="input-field focus:outline-none"
                v-model="video_url"
                type="url"
                id="video"
              />
            </div>
            <div class="mb-2">
              <label class="input-label" for="bargain">Bargain</label> <br />
              <input type="hidden" v-model="can_bargain" id="bargain" />
              <span
                @click="bargainToggle"
                class="input-label cursor-pointer text-6xl"
                :class="can_bargain ? 'text-blue-1' : 'text-gray-2'"
                for="bargain-opt"
                ><i
                  :class="can_bargain ? 'ri-toggle-fill' : 'ri-toggle-line'"
                ></i
              ></span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg">
          <p class="title">Delivery</p>
          <div class="p-2">
            <div class="mb-2">
              <label class="input-label" for="delivery">Delivery offer</label>
              <div class="grid grid-cols-5 gap-8">
                <div class="col-span-4">
                  <input
                    class="input-field focus:outline-none"
                    id="delivery"
                    v-model="delivery_offer"
                    type="text"
                    placeholder="Write here"
                  />
                </div>
                <div>
                  <select
                    class="input-field focus:outline-none bg-gray-1"
                    name=""
                    id=""
                  >
                    <option value="">%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-center gap-6 pb-12">
      <button
        @click="preview"
        class="btn-disabled hover:bg-green-3 hover:text-green-4 focus:outline-none"
      >
        Preview
      </button>
      <button class="btn-disabled focus:outline-none" @click="addProducts">
        Finish & Publish
      </button>
    </div>

    <product-preview
      v-if="addPreview"
      v-on:closePreviewModal="closePreviewModal"
    ></product-preview>
  </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import category from '../add/category'
import { mapGetters, mapActions } from 'vuex'
// import Loader from '~/components/lib/Loader.vue'
import ProductPreview from '../../../../components/my-shop/product-preview/ProductPreview.vue'
export default {
  middleware: ['auth'],
  components: {
    Breadcrumb,
    category,
    // Loader,
    ProductPreview,
  },
  data() {
    return {
      basePath: null,
      addPreview: false,
      formats: [
        { title: 'Simple format', value: 'simple_format', item: true },
        { title: 'Size wise', value: ' size_wise', item: false },
        { title: 'Weight wise', value: 'weight_wise', item: false },
      ],
      ref: '',
      shopIdForCategory: this.$route.params.id,
      isLoading: false,
      brandtoggle: false,
      categoriestoggle: false,
      modelcategory: false,
      name: '',
      title: 'Simple format',
      slug: '',
      shop_id: '',
      brand_id: '',
      similar_product_id: '',
      unit_id: '',
      user_id: '',
      item: {},
      category_id: '',
      can_bargain: false,
      product_type: '',
      return_policy: '',
      warranty: '',
      guarantee: '',
      description: '',
      offers: '',
      tag: '',
      price: '',
      currency_type: '',
      sale_price: '',
      discount: '',
      discount_type: '',
      discount_price: '',
      stocks: '',
      total_stocks: '',
      vat: '',
      sku: '',
      quantity: '',
      alert: '',
      productImage: null,
      thumbnail: '',
      thumbnail_images: null,
      video_url: '',
      delivery_offer: '',
      url: null,
      bar: '',

      simple_format: true,
      size_wise: false,
      weight_wise: false,
      make_a_list: false,
      features: [
        {
          title: '',
          feature: '',
        },
      ],
      sizes: [
        {
          size: '',
          price: '',
          discount: '',
          discount_type: '',
          stocks: '',
          offer: '',
        },
      ],
      weights: [
        {
          weight: '',
          price: '',
          discount: '',
          discount_type: '',
          stocks: '',
          offer: '',
        },
      ],
      lists: 1,
      galleryImage: [],
      gallery_images: [],
      gallery_images_url: [],
      audio_url: '',
      newBooks: [],
      search: '',
      categoriessearch: '',
      breadCrumbs: [
        { title: 'Home', url: '/' },
        { title: 'My Shop', url: '' },
        { title: 'Shop name goes to here', url: '' },
      ],
    }
  },
  mounted() {
    this.basePath = this.$axios.defaults.baseURL
    this.CategoriesData()
    this.CategoriesbaseData()
    this.similarProduct()
    this.BrandData()
    this.unitsData()
    this.showProduct()
  },
  watch: {},
  methods: {
    closePreviewModal() {
      this.preview()
    },

    ...mapActions('products', ['unitsData']),
    ...mapActions('category', ['CategoriesData']),
    ...mapActions('brand', ['BrandData']),
    similarProduct() {
      this.$store.dispatch('products/similarProduct', this.$route.params.id)
    },
    CategoriesbaseData() {
      this.isLoading = true
      this.$store.dispatch('category/CategoriesbaseData').then(
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      )
    },
    bargainToggle() {
      this.can_bargain = !this.can_bargain
    },

    galleryFiles(e) {
      this.gallery_images = e.target.files
      for (var i = 0; i < this.gallery_images.length; i++) {
        this.gallery_images_url.push(
          URL.createObjectURL(this.gallery_images[i])
        )
      }
    },
    thumbnailFile(event) {
      this.thumbnail = event.target.files[0]
      this.thumbnail_images = URL.createObjectURL(event.target.files[0])
    },
    audioFile(e) {
      this.audio = e.target.files[0]
      this.audio_url = URL.createObjectURL(e.target.files[0])
    },
    addFeature() {
      this.features.push({
        title: '',
        feature: '',
      })
    },
    removeFeature(feature) {
      let editedIndex = this.features.indexOf(feature)
      this.features.splice(editedIndex, 1)
    },
    addSize() {
      this.sizes.push({
        size: '',
        price: '',
        discount: '',
        discount_type: '',
        stocks: '',
        offer: '',
      })
    },
    removeSize() {
      let editedIndex = this.sizes.indexOf()
      this.sizes.splice(editedIndex, 1)
    },

    addWeight() {
      this.weights.push({
        weight: '',
        price: '',
        discount: '',
        discount_type: '',
        stocks: '',
        offer: '',
      })
    },
    removeWeight() {
      let delIndex = this.weights.indexOf()
      this.weights.splice(delIndex, 1)
    },

    showProduct() {
      this.$axios
        .$get('api/products/' + this.$route.params.id + '/edit')
        .then((res) => {
          const product = res.data
          this.product_type = product.product_type
          if (product.product_type == 'simple') {
            this.simple_format = true
            this.size_wise = false
            this.weight_wise = false
          }
          if (product.product_type == 'size_base') {
            this.simple_format = false
            this.size_wise = true
            this.weight_wise = false
          }
          if (product.product_type == 'weight_base') {
            this.simple_format = false
            this.size_wise = false
            this.weight_wise = true
          }

          this.name = product.name
          this.shop_id = product.shop.id
          this.search = product.brand.name
          this.sku = product.sku
          this.categoriessearch = product.category.name
          this.price = product.price
          this.currency_type = product.currency_type
          this.unit_id = product.stocks
          this.discount = product.discount
          this.discount_type = product.discount_type
          this.discount_price = product.discount_price
          this.stocks = product.stocks
          this.offers = product.offers
          this.sizes = product.sizes
          this.weights = product.weights
          this.features = product.features
          this.warranty = product.warranty
          this.guarantee = product.guarantee
          this.galleryImage = product.image
          this.productImage = product.thumbnail
          this.thumbnail_images = product.thumbnail
          this.return_policy = product.return_policy
          this.description = product.description
          this.delivery_offer = product.delivery_offer
        })
        .catch((error) => {
          console.log('Error..!')
        })
    },

    getAllFromData() {
      var formData = new FormData()
      if (this.size_wise) {
        formData.append('sizes[]', this.sizes)
        formData.append('product_type', 'size_base')
      } else if (this.make_a_list) {
        formData.append('make_a_list[]', this.make_a_list)
      } else if (this.weight_wise) {
        formData.append('weight_wise[]', this.weight_wise)
        formData.append('product_type', 'weight_base')
      } else {
        formData.append('product_type', 'simple')
      }
      formData.append('name', this.name)
      formData.append('user_id', this.$auth.user.id)
      formData.append('brand_id', this.brand_id)
      formData.append('category_id', this.category_id)
      formData.append('can_bargain', this.can_bargain)
      formData.append('sku', this.sku)
      formData.append('price', this.price)
      formData.append('currency_type', this.currency_type)
      formData.append('discount', this.discount)
      formData.append('discount_type', this.discount_type)
      formData.append('stocks', this.stocks)
      formData.append('offers', this.offers)
      formData.append('return_policy', this.return_policy)
      formData.append('warranty', this.warranty)
      formData.append('guarantee', this.guarantee)
      formData.append('description', this.description)
      formData.append('thumbnail', this.thumbnail)
      formData.append('video_url', this.video_url)
      formData.append('delivery_offer', this.delivery_offer)
      for (const i of Object.keys(this.gallery_images)) {
        formData.append('images[]', this.gallery_images[i])
      }

      // features
      for (let i = 0; i < this.features.length; i++) {
        for (let key of Object.keys(this.features[i])) {
          formData.append(`features[${i}][${key}]`, this.features[i][key])
        }
      }
      // sizes
      for (let i = 0; i < this.sizes.length; i++) {
        for (let key of Object.keys(this.sizes[i])) {
          formData.append(`sizes[${i}][${key}]`, this.sizes[i][key])
        }
      }

      // weights
      for (let i = 0; i < this.weights.length; i++) {
        for (let key of Object.keys(this.weights[i])) {
          formData.append(`weights[${i}][${key}]`, this.weights[i][key])
        }
      }

      return formData
    },

    addProducts() {
      let allFormData = this.getAllFromData()
      this.$axios
        .post(`/api/products/update/${this.$route.params.id}`, allFormData)
        .then((response) => {
          console.log(this.shop_id)
          // this.$router.push(`/shop/self/${this.shop_id}`)
          // this.$toast.success('Product update successfully !')
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },

    preview() {
      this.addPreview = !this.addPreview

      let productData = this.getAllFromData()
      let data = {}
      for (const [key, value] of productData.entries()) {
        data[key] = value
      }

      data['thumb_url'] = this.thumbnail_images
      data['gallary_images_url'] = this.gallery_images_url

      // localStorage.setItem('previewdata', JSON.stringify(data))
      this.$store.dispatch('products/productPreview', data)
    },

    addList() {
      this.lists += 1
    },
    removeList() {
      if (this.lists > 1) {
        this.lists -= 1
      }
    },

    simpleFormat(format) {
      this.title = format.title
      this.formats.forEach((element) => {
        if (format.value === element.value) {
          if (format.value == 'simple_format') {
            this.simple_format = true
            this.size_wise = false
            this.weight_wise = false
            this.make_a_list = false
          } else if (format.value == 'weight_wise') {
            this.simple_format = false
            this.size_wise = false
            this.weight_wise = true
            this.make_a_list = false
          } else if (format.value == 'make_a_list') {
            this.simple_format = false
            this.size_wise = false
            this.weight_wise = false
            this.make_a_list = true
          } else {
            this.simple_format = false
            this.size_wise = true
            this.weight_wise = false
            this.make_a_list = false
          }
          return (element.item = true)
        } else {
          return (element.item = false)
        }
      })
    },

    selectResult(brand) {
      this.search = brand.name
      this.brand_id = brand.id
    },
    brandtoggleclose() {
      this.brandtoggle = false
      this.BrandData()
    },
    brandtoggleopen() {
      this.brandtoggle = true
    },
    addBrand() {
      let data = {
        name: this.search,
      }
      this.$store.dispatch('brand/brandCreated', data).then(this.BrandData())
    },

    categoriestoggleclose() {
      this.categoriestoggle = false
      this.CategoriesData()
    },
    categoriestoggleopen() {
      this.categoriestoggle = true
    },
    selectResultcategories(category) {
      this.categoriessearch = category.name
      this.category_id = category.id
    },
    cetegoryModal() {
      this.modelcategory = true
    },
    closeModal() {
      this.modelcategory = false
      this.CategoriesbaseData()
    },

    async removeImage(image) {
      await this.$axios
        .get('/api/products/remove-image-gallery/' + image.id)
        .then((response) => {
          this.showProduct()
          this.$toast.success(response.data)
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },
  },

  computed: {
    ...mapGetters('products', ['similar_product']),
    ...mapGetters('products', ['units']),
    ...mapGetters('category', ['categories']),
    ...mapGetters('category', ['categoriesbase']),
    ...mapGetters('brand', ['brands']),

    filteredList() {
      return this.brands.filter((brand) => {
        return brand.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    categoriesList() {
      return this.categories.filter((category) => {
        return category.name
          .toLowerCase()
          .includes(this.categoriessearch.toLowerCase())
      })
    },

    disCountPrice() {
      if (this.discount_type === 'Percent') {
        let dis = this.price - (this.price * this.discount) / 100
        return dis.toFixed(2)
      } else {
        return this.price - this.discount
      }
    },
  },
}
</script>
