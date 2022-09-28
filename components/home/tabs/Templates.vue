<template>
    <div>
        <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 lg:gap-4 gap-2">
            <div v-for="(template, i) in templates" :key="i" class="md:border-2 border border-green-4">
                <NuxtLink :to="`/contribution/${template.id}`">
                    <div class="relative pb-2/3">
                        <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + template.thumbnail" alt="Image">
                    </div>
                    <div class="p-2">
                        <p class="font-bold lg:text-lg">{{ template.title }}</p>
                        <p class="text-gray-2">00 views  •  {{ template.updated_at }} </p>
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
            templates : [],
            basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadTemplates();
    },

    methods: {
        async loadTemplates() {
            await this.$axios.$get(
                '/api/templates'
            ).then((res) => {
                this.templates = res.data;
            })
        }
    }
}
</script>