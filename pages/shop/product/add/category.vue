<template>
  <div>
    <div
      @click="closeModal"
      class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12"
    >
      <div @click="wait">
        <div @click="closeModal" class="btn-close">
          <button class="focus:outline-none">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
          <div class="cart-tems-center text-left">
            <p class="title">Category</p>
            <div class="p-6">
              <div class="mb-2">
                <label class="input-label mb-2" for="code"
                  >--This will be main category--</label
                >
                <select class="appearance-none input-field" v-model="parent_id">
                  <option
                    v-for="cetegorie in categories"
                    :value="cetegorie.id"
                    :key="cetegorie.id"
                  >
                    {{ cetegorie.name }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <label class="input-label mb-2" for="code">Category</label>
                <input
                  class="input-field focus:outline-none"
                  id="code"
                  type="text"
                  v-model="popsname"
                  placeholder="Type code hear"
                />
              </div>
              <div class="mb-2">
                <label class="input-label mb-2" for="code">Description</label>
                <input
                  class="input-field focus:outline-none"
                  id="code"
                  type="text"
                  v-model="description"
                  placeholder="Type code hear"
                />
              </div>

              <button
                class="btn-border bg-green-3 focus:outline-none"
                @click="categoriesbaseAdd"
              >
                Add Category
              </button>
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
export default {
  props: ['categories', 'name', 'shopId'],
  data() {
    return {
      parent_id: '',
      popsname: this.name,
      description: '',

      close_modal: 'closeModal',
    }
  },

  methods: {
    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.$emit('closeModal')
      }
    },
    categoriesbaseAdd() {
      let data = {
        parent_id: this.parent_id,
        name: this.popsname,
        description: this.description,
        shop_id: this.shopId,
      }
      this.$store
        .dispatch('category/CategoriesbaseAdd', data)
        .then(
          this.$emit('closeModal'),
          this.$toast.success('Your Category successfully Created !')
        )
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },
  },
}
</script>
