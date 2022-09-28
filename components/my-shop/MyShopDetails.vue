<template>
  <div>
    <div>
        <div>
            <p class="font-bold text-xl">{{shop.name}}</p>
            <p class="text-gray-2">{{shop.total_subscriber}} Subscribers</p>
            <p class="text-gray-2">55 Active Customers</p>
            <div class="flex text-yellow-2">
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-half-line"></i>
                <p class="text-gray-2 ml-2">(4.5)</p>
            </div>
            <div class="flex text-center gap-4 py-2">
                <n-link to="">
                    <i class="rounded-lg bg-green-1 p-2 ri-message-2-fill"></i>
                    <p>Text us</p>
                </n-link>
                <n-link to="">
                    <i class="rounded-lg bg-green-1 p-2 ri-phone-fill"></i>
                    <p>Call us</p>
                </n-link>
                <n-link to="">
                    <i class="rounded-lg bg-green-1 p-2 ri-video-chat-fill"></i>
                    <p>Video call</p>
                </n-link>
            </div>
            <div class="">
                <div class="mt-3">
                    <button @click="editShop(shop.id)" class="font-bold text-purple-2 border-2 border-purple-2 rounded-lg p-2 inline px-4"><i class="ri-edit-2-fill pr-3"></i>Edit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['shop'],
  methods: {
    editShop(id) {
      this.$router.push({ path: '/shop/edit/' + id })
    },
  },
}
</script>
