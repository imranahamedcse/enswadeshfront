<template>
    <div>
        <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 lg:gap-4 gap-2">
            <div v-for="(story, i) in stories" :key="i" class="md:border-2 border border-green-4">
                <NuxtLink :to="`/contribution/${story.id}`">
                    <div class="relative pb-2/3">
                        <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + story.thumbnail" alt="Image">
                    </div>
                    <div class="p-2">
                        <p class="font-bold lg:text-lg">{{ story.title }}</p>
                        <p class="text-gray-2">00 views  •  {{ story.updated_at }} </p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            stories : [],
            basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadStories();
    },

    methods: {
        async loadStories() {
            await this.$axios.$get(
                '/api/stories'
            ).then((res) => {
                this.stories = res.data;
            })
        }
    }
}
</script>