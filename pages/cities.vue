<template>
    <div>
        <!-- Breadcrumbs -->
        <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>

        <!-- All Cities -->
        <div class="h-screen" style="background-size: cover;" :style="{ backgroundImage: `url(${backgroundImagePath})` }">
            <p class="md:h1 h2 py-3">Where do you want to go ?</p>
            <div class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-6 gap-3 pb-12">
                <loader v-if="isLoading"></loader>
                <template v-else>
                <div v-for="(city, i) in cities" :key="i">
                    <NuxtLink :to="{name:'markets-city-id', params:{city: city.slug, id: city.id }}">
                        <div @click="setCityName(city.name, city.slug, city.id)" class="md:border-2 border border-r-4 border-b-4 border-green-4 rounded-xl">
                            <div class="px-2 pt-2 bg-pink-1 rounded-t-xl">
                                <img class="h-24 m-auto" src="~/assets/img/building.png" alt="Image">
                            </div>
                            <div class="flex flex-wrap items-center justify-center">
                                <p class="py-3 md:h2 h3">{{ city.name }}</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue';
import backgroundImagePath from '~/assets/img/city.png';
import Loader from '~/components/lib/Loader.vue'

export default {
    components: {
        Breadcrumb,
        Loader
    },
    data() {
        return {
          isLoading: true,
          cities: [],
          basePath: this.$axios.defaults.baseURL,
          breadCrumbs: [
              {title: 'Home', url: '/'},
              {title: 'Go To Market', url: ''},
          ],
          backgroundImagePath,
        };
      },

    mounted() {
      this.loadData();
    },

    methods: {
      async loadData() {
        await this.$axios.$get(
          '/api/cities'
        ).then((res) => {
          this.cities = res.data;
          this.isLoading = false;
        })
      },
      setCityName(name, slug, id)
      {
        localStorage.setItem('city', name);
        localStorage.setItem('city-url', '/markets/'+slug+"/"+id);
      }
    }
}
</script>
