<template>
    <div>
        <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 lg:gap-4 gap-2">
            <div v-for="(video, i) in videos" :key="i" class="md:border-2 border border-green-4">
              <NuxtLink :to="`/contribution/${video.id}`">
                  <div class="relative pb-2/3">
                    <img class="absolute h-full w-full object-cover" :src="video.thumbnail ? basePath + '/storage/' + video.thumbnail : require(`~/assets/img/products/default.png`)" alt="Image">
                      <p class="absolute bottom-0 mb-2 ml-2 text-white bg-green-5 px-3 py-1 inline">00:00</p>
                  </div>
                  <div class="p-2">
                      <p class="font-bold lg:text-lg">{{ video.title }}</p>
                      <p class="text-gray-2">00 views  •  {{ video.created_at }}</p>
                  </div>
              </NuxtLink>
            </div>
        </div>
        <!-- Paginate -->
        <div class="">
            <!-- <Paginate /> -->
        </div>
    </div>
</template>
<script>
// import Paginate from '~/components/common/Paginate.vue';

export default {
    components: {
        // Paginate,
    },
    data (){
        return {
          videos : [],
          basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadVideos();
    },

    methods: {
      async loadVideos() {
        await this.$axios.$get(
          '/api/videos'
        ).then((res) => {
          this.videos = res.data;
        })
      }
    }


}
</script>
