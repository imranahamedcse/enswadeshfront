<template>
  <div>
    <!-- <div class="add_loader" v-if="isLoading">
      <div class="main-loader"><loader></loader></div>
    </div> -->

    <!-- Breadcrumbs -->
    <!-- <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb> -->

    <div class="flex justify-between">
      <p class="font-bold text-3xl">Add Product</p>
      <n-link to="#" class="text-blue-1 font-bold">Need help?</n-link>
    </div>

    <form>
      <p class="title">Choose an appropriate format</p>
      <div class="p-2">
        <div class="flex my-4">
          <button :class="simple_format ? 'bg-green-3' : 'bg-white'" @click="formFormat(1)" type="button" class="font-bold border border-gray-3 hover:bg-green-3 py-1 px-4 focus:outline-none">Simple format</button>
          <button :class="size_wise ? 'bg-green-3' : 'bg-white'" @click="formFormat(2)" type="button" class="font-bold border border-gray-3 hover:bg-green-3 py-1 px-4 focus:outline-none">Size wise</button>
          <button :class="weight_wise ? 'bg-green-3' : 'bg-white'" @click="formFormat(3)" type="button" class="font-bold border border-gray-3 hover:bg-green-3 py-1 px-4 focus:outline-none">Weight wise</button>
        </div>
        <p class="mb-4 font-semibold">Write here why use this format as a helper text</p>
      </div>
      <div class="bg-white rounded-lg mb-6">
        <p class="title">Similarity</p>
        <div class="p-2">
          <div class="mb-2">
            <label class="input-label" for="similar">Select product</label>
            <select class="input-field focus:outline-none" >
              <option>Select</option>
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
                <label class="input-label" for="name">Product Name <span class="text-red-500 font-bold">*</span></label>
                <input class="input-field focus:outline-none" id="name" v-model="name" placeholder="Product title"/>
              </div>

              <div class="mb-2">
                <label class="input-label" for="code">Product Code / SKU</label>
                <input class="input-field focus:outline-none" id="code" type="text" v-model="sku" placeholder="Type code hear"/>
              </div>

              <div class="mb-2">
                <label class="input-label" for="parent_category">Select Category <span class="text-red-500 font-bold">*</span></label>
                <select @change="getCategory()" class="input-field focus:outline-none" id="parent_category" v-model="parent_id">
                  <option value="" selected>Select Parent Category</option>
                  <option v-for="(pc, i) in parentCategories" :key="i" :value="pc.id">{{ pc.name }}</option>
                </select>
              </div>

              <div class="mb-2">
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <label class="input-label" for="category">Select Sub Category<span class="text-red-500 font-bold">*</span></label>
                    <select class="input-field focus:outline-none" id="category" v-model="category">
                      <option value="" selected>Select</option>
                      <option v-for="(category, i) in categories" :key="i" :value="category.id">{{ category.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="input-label" for="create_category">Create Category</label>
                    <div class="grid grid-cols-3 gap-2">
                      <input class="col-span-2 input-field focus:outline-none" id="create_category" placeholder="Write here" v-model="create_category" />
                      <button @click="addCategory()" type="button" class="btn-border hover:bg-green-3 hover:text-green-4 focus:outline-none p-2">Create</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <label class="input-label" for="brand">Select Brand <span class="text-red-500 font-bold">*</span></label>
                    <select class="input-field focus:outline-none" id="brand" v-model="brand">
                      <option value="" selected>Select</option>

                      <option v-for="(brand, i) in brands" :key="i" :value="brand.id">{{ brand.name }}</option>\

                    </select>
                  </div>
                  <div>
                    <label class="input-label" for="create_brand">Create Brand</label>
                    <div class="grid grid-cols-3 gap-2">
                      <input class="col-span-2 input-field focus:outline-none" id="create_brand" placeholder="Write here" v-model="create_brand"/>
                      <button @click="addBrand()" type="button" class="btn-border hover:bg-green-3 hover:text-green-4 focus:outline-none p-2">Create</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div>
          <div class="bg-white rounded-lg mb-6">
            <p class="title">Product Image</p>
            <div class="p-2">

              <div class="mb-2">
                <label class="input-label">Product Thumbnail <span class="text-red-500 font-bold">*</span></label>
                <div class="border border-dashed border-gray-3 rounded text-center" >

                  <div v-if="!thumbnail_images" class="py-16 flex items-center justify-center">
                    <i class="ri-attachment-line"></i>
                    <label for="thumbnail" class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2">Add file</label>
                    <!-- <p class="inline">or drop images here</p> -->
                  </div>
                  <label for="thumbnail" class="cursor-pointer">
                    <div v-if="thumbnail_images" style="padding-bottom: 25%" class="relative flex flex-row justify-center">
                      <img class="absolute p-2 h-full m-auto" :src="thumbnail_images" />
                    </div>
                  </label>

                  <input @change="thumbnailFile" class="hidden" type="file" id="thumbnail" />
                </div>
              </div>

              <div class="col-span-2">
                <label class="input-label">Gallery images</label>
                <div class="border border-dashed border-gray-3 rounded text-center">
                  <div :class="gallery_images != '' ? 'grid grid-cols-6 gap-2':''" class="py-6">
                    
                    <div v-if="gallery_images == ''">
                      <label class="cursor-pointer" for="gallery" ><i class="ri-add-line text-blue-1 font-bold text-4xl" ></i></label ><br />
                      <p class="text-gray-4">Minimum: 2, Maximum: 6</p>
                    </div>
                    <div class="h-24 relative" v-for="(gallery, i) in gallery_images_url" :key="i">
                      <img :src="gallery" v-if="i < 6" class="h-full" alt="Image" />
                      <button v-if="gallery_images_url.length-1 == i" @click="removeGalleryFiles()" class="text-red-500 font-bold absolute top-0 right-0 focus:outline-none " type="button">X</button>
                    </div>
                    <label v-if="gallery_images != '' && gallery_images_url.length < 6" class="cursor-pointer pt-6" for="gallery" ><i class="ri-add-line text-blue-1 font-bold text-4xl" ></i></label >

                  </div>
                  <input class="hidden" type="file" @change="galleryFiles" multiple id="gallery"/>
                </div>
              </div>

            </div>
          </div>
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
                <td>Stocks</td>
                <td>Offer</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(siz, i) in sizes" :key="i">
                <td>
                  <input type="text" v-model="siz.size" class="input-field focus:outline-none my-1" placeholder="(S/M/L/4/5/6)"/>
                </td>
                <td>
                  <input type="number" v-model="siz.price" class="input-field focus:outline-none my-1" placeholder="1" />
                </td>
                <td>
                  <input type="number" v-model="siz.discount" class="input-field focus:outline-none my-1" placeholder="0" />
                </td>
                <td>
                  <select class="input-field focus:outline-none my-1" id="discount_type" v-model="siz.discount_type" >
                    <option selected>Select option</option>
                    <option value="Percent">%</option>
                    <option value="Number">TK</option>
                  </select>
                </td>
                <td>
                  <input type="number" v-model="siz.stocks" class="input-field focus:outline-none my-1" placeholder="1"/>
                </td>
                <td>
                  <input type="text" v-model="siz.offer" class="input-field focus:outline-none my-1" placeholder="Offer" />
                </td>
                <td>
                  <a class="focus:outline-none text-orange-1 cursor-pointer" v-if="i === sizes.length - 1 && i != 0" @click="removeSize" >
                    <i class="ri-close-circle-fill"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <a @click="addSize" class="font-bold text-orange-1 focus:outline-none cursor-pointer">Add another</a>
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
                <td>Stocks</td>
                <td>Offer</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(wei, i) in weights" :key="i">
                <td>
                  <input type="text" v-model="wei.weight" class="input-field focus:outline-none my-1" placeholder="(kg, litre, cm, mm)" />
                </td>
                <td>
                  <input type="number" v-model="wei.price" class="input-field focus:outline-none my-1" placeholder="1" />
                </td>
                <td>
                  <input type="number" v-model="wei.discount" class="input-field focus:outline-none my-1" placeholder="0"/>
                </td>
                <td>
                  <select class="input-field focus:outline-none my-1" id="discount_type" v-model="wei.discount_type">
                    <option selected>Select option</option>
                    <option value="Percent">%</option>
                    <option value="Number">TK</option>
                  </select>
                </td>
                <td>
                  <input type="number" v-model="wei.stocks" class="input-field focus:outline-none my-1" placeholder="1" />
                </td>
                <td>
                  <input type="text" v-model="wei.offer" class="input-field focus:outline-none my-1" placeholder="Offer" />
                </td>
                <td>
                  <a class="focus:outline-none text-orange-1 cursor-pointer" v-if="i === weights.length - 1 && i != 0" @click="removeWeight" >
                    <i class="ri-close-circle-fill"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <a @click="addWeight" class="font-bold text-orange-1 focus:outline-none cursor-pointer" > Add another </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-12 mb-6">
        <div class="">
          <div v-if="simple_format" class="bg-white rounded-lg mb-6">
            <p class="title">Price</p>
            <div class="p-2">

              <div class="mb-2">
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <label class="input-label" for="price">Price</label>
                    <input class="input-field focus:outline-none" id="price" type="number" v-model="price" placeholder="What is the price for product"/>
                  </div>
                  <div>
                    <label class="input-label" for="currency_type">Select Currency</label>
                    <select class="input-field focus:outline-none" id="currency_type" v-model="currency_type">
                      <option value="BDT" selected>BDT</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="input-label" for="unit">Price Per Unit</label>
                <div class="grid grid-cols-5 gap-4">
                  <div class="col-span-6">
                    <select class="input-field focus:outline-none" name="" id="unit" v-model="unit_id" >
                      <option v-for="unit in units" :key="unit.id" :value="unit.id">
                        {{ unit.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <label class="input-label" for="discount">Discount</label>
                    <input class="input-field focus:outline-none" id="discount" type="number" placeholder="Write here" v-model="discount"/>
                  </div>
                  <div>
                    <label class="input-label" for="discount_type">Select Discount Type</label>
                    <select class="input-field focus:outline-none" id="discount_type" v-model="discount_type">
                      <option value="Number">TK</option>
                      <option value="Percent">%</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="input-label" for="discount-price">Unit Price</label>
                <input class="input-field focus:outline-none" id="discount-price" type="number" placeholder="0" readonly v-model="disCountPrice"/>
              </div>

              <div v-if="simple_format" class="mb-2">
                <label class="input-label" for="quantity">Stocks</label>
                <input class="input-field focus:outline-none" id="quantity" type="number" v-model="stocks" placeholder="Stocks" />
              </div>

              <div class="mb-2">
                <label class="input-label" for="offer">Offer</label>
                <input class="input-field focus:outline-none" id="offer" type="text" v-model="offer" placeholder="Type here" />
              </div>

            </div>
          </div>

          

          
          <div class="bg-white rounded-lg mb-6">
            <p class="title">Services</p>
            <div class="p-2">

              <div class="mb-2">
                <label class="input-label" for="warranty">Warranty</label>
                <textarea class="input-field focus:outline-none" name="" v-model="warranty" id="warranty" rows="3" placeholder="Write details here about warranty" ></textarea>
              </div>

              <div class="mb-2">
                <label class="input-label" for="guarantee">Guarantee</label>
                <textarea class="input-field focus:outline-none" name="" id="guarantee" v-model="guarantee" rows="3" placeholder="Write details here about guarantee" ></textarea>
              </div>

              <div class="mb-2">
                <label class="input-label" for="return_policy" >Return policy</label >
                <textarea class="input-field focus:outline-none" name="" id="return_policy" rows="3" v-model="return_policy" placeholder="Write details here about return policy" ></textarea>
              </div>

            </div>
          </div>
        </div>
        <div>
          
          <div class="bg-white rounded-lg mb-6">
            <p class="title">More Information</p>
            <div class="p-2">

              <div class="mb-2">
                <label class="input-label" for="description">Details information</label>
                <textarea class="input-field focus:outline-none" name="" id="description" v-model="description" rows="4" placeholder="Write here product description" ></textarea>
              </div>

              <div class="mb-2">
                <label class="input-label" for="feature">Features</label>
                <table class="w-full">
                  <tbody>
                    <tr v-for="(feature, i) in features" :key="i">
                      <td>
                        <input class="input-field focus:outline-none my-1" v-model="feature.title" type="text" placeholder="Write feature title" />
                      </td>
                      <td>
                        <input class="input-field focus:outline-none my-1" v-model="feature.feature" type="text" placeholder="Write details here"/>
                      </td>
                      <td>
                        <a class="focus:outline-none text-orange-1 cursor-pointer" v-if="i === features.length - 1 && i != 0" @click="removeFeature()"><i class="ri-close-circle-fill"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a @click="addFeature" class="font-bold text-orange-1 focus:outline-none cursor-pointer"> Add another</a>
              </div>

              <div class="mb-2">
                <label class="input-label">Audio description</label>
                <div class="border border-dashed border-gray-3 rounded text-center">

                  <div class="py-3 flex items-center justify-center">
                    <i class="ri-attachment-line"></i>
                    <label for="audio" class="font-bold text-blue-1 ml-2 inline cursor-pointer mr-2">Add file</label>
                  </div>
                  
                  <label for="audio" class="cursor-pointer">
                    <div v-if="audio_url" style="padding-bottom: 20px" class="relative flex flex-row justify-center">
                      <audio controls><source :src="audio_url" />Your browser does not support the audio element.</audio>
                    </div>
                    <input class="hidden" type="file" @change="audioFile" id="audio"/>
                  </label>
                </div>
              </div>

              <div class="mb-4">
                <label class="input-label" for="video">Video description</label>
                <input class="input-field focus:outline-none" v-model="video_url" type="url" id="video"/>
              </div>

              <div class="mb-2">
                <label class="input-label" for="bargain">Bargain</label> <br />
                <input type="hidden" v-model="can_bargain" id="bargain" />
                <span @click="bargainToggle" class="input-label cursor-pointer text-4xl" :class="can_bargain ? 'text-blue-1' : 'text-gray-2'" for="bargain-opt" ><i :class="can_bargain ? 'ri-toggle-fill' : 'ri-toggle-line'" ></i></span>
              </div>

            </div>
          </div>

          <div class="bg-white rounded-lg">
            <p class="title">Delivery</p>
            <div class="p-2">

              <div class="mb-2">
                <label class="input-label" for="delivery">Delivery offer</label>
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <input class="input-field focus:outline-none" id="delivery" v-model="delivery_offer" type="text" placeholder="Write here" />
                  </div>
                  <div>
                    <select class="input-field focus:outline-none" v-model="delivery_offer_type" >
                      <option value="" selected>Select Option</option>
                      <option value="">TK</option>
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
        <button @click="preview()" type="button" class="btn-disabled hover:bg-green-3 hover:text-green-4 focus:outline-none w-32"> Preview </button>
        <button @click="save()" type="button" class="btn-disabled hover:bg-green-3 hover:text-green-4 focus:outline-none w-32"> Save </button>
      </div>

    </form>

    <product-preview v-if="addPreview" v-on:closePreviewModal="closePreviewModal"></product-preview>
    
  </div>
</template>
<script>

import ProductPreview from '../../../../components/my-shop/product-preview/ProductPreview.vue'

export default {
  middleware: ['auth'],
  components: {
    ProductPreview,
  },
  data() {
    return {
      title: '',
      addPreview: false,
      units: [
        {id: 1, name: 'Piece'},
        {id: 2, name: 'kg'},
        {id: 3, name: 'g'},
        {id: 4, name: 'ml'},
      ],

      simple_format: true,
      size_wise: false,
      weight_wise: false,

      name: '',
      sku: '',
      parentCategories: [],
      parent_id: '',
      categories: [],
      category: '',
      create_category: '',
      brands: [],
      brand: '',
      create_brand: '',
      price: '',
      currency_type: '',
      unit_id: '',
      discount: '',
      discount_type: '',
      unit_price: '',
      stocks: '',
      offer: '',
      warranty: '',
      guarantee: '',
      return_policy: '',
      thumbnail: null,
      thumbnail_images: null,
      gallery_images: [],
      gallery_images_url: [],
      description: '',
      audio: '',
      audio_url: '',
      video_url: '',
      can_bargain: false,
      delivery_offer: '',
      delivery_offer_type: '',

      features: [
        { 
          title: '', 
          feature: '' 
        }
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
    }
  },

  created(){
    this.getParentCategories();
    this.getBrands();
  },

  computed: {
    disCountPrice() {
      if (this.discount_type === 'Percent') {
        let dis = this.price - (this.price * this.discount) / 100
        return dis.toFixed(2)
      } else {
        return this.price - this.discount
      }
    },
  },

  methods: {
    closePreviewModal() {
      this.preview()
    },
    getParentCategories(){
      this.$axios.get('/api/categories/parent').then((res) => {
        this.parentCategories = res.data.data;
        // console.log(res.data.data);
      })
    },
    getCategory(){
      this.$axios.get('/api/categories/'+this.parent_id).then((res) => {
        this.categories = res.data.data;
        // console.log(res.data);
      })
    },
    getBrands(){
      this.$axios.get('/api/brands').then((res) => {
        this.brands = res.data.data;
      })
    },
    
    getAllFromData(){
      var fd = new FormData();
      fd.append('shop_id', this.$route.params.id);
      fd.append('user_id', this.$auth.user.id);

      if (this.size_wise) {
        fd.append('product_type', 'size_base');
      } 
      else if (this.weight_wise) {
        fd.append('product_type', 'weight_base');
      } 
      else {
        fd.append('product_type', 'simple');
      }
      
      fd.append('name', this.name);
      fd.append('sku', this.sku);
      fd.append('category_id', this.category);
      fd.append('brand_id', this.brand);
      fd.append('price', this.price);
      fd.append('currency_type', this.currency_type);
      fd.append('unit_id', this.unit_id);
      fd.append('discount', this.discount);
      fd.append('discount_type', this.discount_type);
      fd.append('unit_price', this.unit_price);
      fd.append('stocks', this.stocks);
      fd.append('offer', this.offer);
      fd.append('warranty', this.warranty);
      fd.append('guarantee', this.guarantee);
      fd.append('return_policy', this.return_policy);
      fd.append('thumbnail', this.thumbnail);
      fd.append('description', this.description);
      fd.append('audio', this.audio);
      fd.append('video_url', this.video_url);
      fd.append('delivery_offer', this.delivery_offer);
      fd.append('delivery_offer_type', this.delivery_offer_type);

      // Bargain
      if (this.can_bargain === true) {
        fd.append('can_bargain', 1)
      } else {
        fd.append('can_bargain', 0)
      }

      // gallery
      for (const i of Object.keys(this.gallery_images)) {
        fd.append('images[]', this.gallery_images[i]);
      }

      // sizes
      for (let i = 0; i < this.sizes.length; i++) {
        for (let key of Object.keys(this.sizes[i])) {
          fd.append(`sizes[${i}][${key}]`, this.sizes[i][key]);
        }
      }
      // weights
      for (let i = 0; i < this.weights.length; i++) {
        for (let key of Object.keys(this.weights[i])) {
          fd.append(`weights[${i}][${key}]`, this.weights[i][key]);
        }
      }
      // features
      for (let i = 0; i < this.features.length; i++) {
        for (let key of Object.keys(this.features[i])) {
          fd.append(`features[${i}][${key}]`, this.features[i][key]);
        }
      }

      return fd;
    },

    save(){
      if(this.name != '' && this.category != '' && this.brand != '' && this.thumbnail != null){
        this.$toast.info('Please wait!');
        let allFormData = this.getAllFromData()
        this.$axios
        .post('/api/products/add', allFormData)
        .then((res) => {
          // console.log(res.data);
          this.$toast.success('Product create successfully!');
          this.$router.push(`/shop/self/${this.$route.params.id}`)
        })
        .catch((error) => {
          this.$toast.error('Opps, something wrong!');
        })
      }
      else
        this.$toast.error('Fill required field first!');
    },

    preview() {
      if(this.name != '' && this.category != '' && this.brand != '' && this.thumbnail != null){
        this.addPreview = !this.addPreview
        let productData = this.getAllFromData();
        // console.log(productData);
        let data = {}
        for (const [key, value] of productData.entries()) {
          data[key] = value
        }
        data['thumb_url'] = this.thumbnail_images
        data['gallary_images_url'] = this.gallery_images_url
        data['audio_url'] = this.audio_url

        // localStorage.setItem('previewdata', JSON.stringify(data))
        this.$store.dispatch('products/productPreview', data)
      }
      else
        this.$toast.error('Fill required field first!');
    },

    thumbnailFile(event) {
      this.thumbnail = event.target.files[0];
      this.thumbnail_images = URL.createObjectURL(event.target.files[0]);
    },
    galleryFiles(e) {
      this.gallery_images = e.target.files;
      for (var i = 0; i < this.gallery_images.length; i++) {
        this.gallery_images_url.push(
          URL.createObjectURL(this.gallery_images[i])
        )
      }
    },
    removeGalleryFiles() {
      this.gallery_images_url.pop();
    },

    bargainToggle() {
      this.can_bargain = !this.can_bargain;
    },
    formFormat(format) {
      if (format == 1) {
        this.simple_format = true;
        this.size_wise = false;
        this.weight_wise = false;
      }
      else if (format == 2) {
        this.simple_format = false;
        this.size_wise = true;
        this.weight_wise = false;
      }
      else if (format == 3) {
        this.simple_format = false;
        this.size_wise = false;
        this.weight_wise = true;
      }
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
      let editedIndex = this.sizes.indexOf();
      this.sizes.splice(editedIndex, 1);
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
      let delIndex = this.weights.indexOf();
      this.weights.splice(delIndex, 1);
    },
    addFeature() {
      this.features.push({
        title: '',
        feature: '',
      })
    },
    removeFeature() {
      let editedIndex = this.features.indexOf();
      this.features.splice(editedIndex, 1);
    },
    audioFile(e) {
      this.audio = e.target.files[0];
      this.audio_url = URL.createObjectURL(e.target.files[0]);
    },

    addBrand(){
      if(this.create_brand != ''){ 
        
        var fd = new FormData();
        fd.append('name', this.create_brand);

        this.$axios.post('/api/brands/create', fd).then((res) => {
          this.$toast.success('Brand create successfully!');
          // console.log(res.data);
          this.create_brand = '';
          this.brands.push(res.data.data.brand);
        })
        .catch((error) => {
          this.$toast.error('Opps, something wrong!');
        })
      }
      else
        this.$toast.error('Fill field first!');
    },





    addCategory(){
      if(this.create_category != ''){ 
        
        var fd = new FormData();
        fd.append('parent_id', this.parent_id);
        fd.append('name', this.create_category);

        this.$axios.post('/api/categories/create', fd).then((res) => {
          this.$toast.success('Category create successfully!');
          this.create_category = '';
          this.categories.push(res.data.data.category);
        })
        .catch((error) => {
          this.$toast.error('Opps, something wrong!');
        })
      }
      else
        this.$toast.error('Fill field first!');
    }
  },
}
</script>
