<template>
    <div>
        <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 lg:gap-4 gap-2">
            <div v-for="(meme, i) in memes" :key="i" class="md:border-2 border border-green-4">
                <NuxtLink :to="`/contribution/${meme.id}`">
                    <div class="relative pb-2/3">
                        <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + meme.thumbnail" alt="Image">
                    </div>
                    <div class="p-2">
                        <p class="font-bold lg:text-lg">{{ meme.title }}</p>
                        <p class="text-gray-2">00 views  •  {{ meme.updated_at }} </p>
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
            memes : [],
            basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadMemes();
    },

    methods: {
        async loadMemes() {
            await this.$axios.$get(
                '/api/memes'
            ).then((res) => {
                this.memes = res.data;
            })
        }
    }
}
</script>