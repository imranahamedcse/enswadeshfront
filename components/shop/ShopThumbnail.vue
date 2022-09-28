<template>
  <div>
    <div class="relative pb-1/2">
      <img
        class="absolute h-full w-full object-cover rounded-lg"
        :src="
          shop.cover_image
            ? basePath + '/storage/' + shop.cover_image
            : '~/assets/img/shopping-mall.png'
        "
        alt="Image"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['shop', 'basePath'],
}
</script>
