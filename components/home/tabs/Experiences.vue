<template>
    <div>
        <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 lg:gap-4 gap-2">
            <div v-for="(experience, i) in experiences" :key="i" class="md:border-2 border border-green-4">
                <NuxtLink :to="`/contribution/${experience.id}`">
                    <div class="relative pb-2/3">
                        <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + experience.thumbnail" alt="Image">
                    </div>
                    <div class="p-2">
                        <p class="font-bold lg:text-lg">{{ experience.title }}</p>
                        <p class="text-gray-2">00 views  •  {{ experience.updated_at }} </p>
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
            experiences : [],
            basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadExperiences();
    },

    methods: {
        async loadExperiences() {
            await this.$axios.$get(
                '/api/experiences'
            ).then((res) => {
                this.experiences = res.data;
            })
        }
    }
}
</script>