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
          <div class="cart-tems-center text-center">
            <p class="title">Remove Wishlist</p>
            <div class="p-6">
              <p class="mb-6">Do you really want to remove?</p>
              <button
                @click="yesRemove"
                class="btn-border bg-green-3 focus:outline-none"
              >
                Yes, Confirm
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
  data() {
    return {
      close_modal: 'closeModal',
    }
  },
  methods: {
    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.$emit('closeModal')
      }
    },
    yesRemove() {
      if (this.close_modal == 'closeModal') {
        this.$emit('yesRemove')
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
    },
  },
}
</script>
