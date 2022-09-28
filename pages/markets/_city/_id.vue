<template>
    <div>
        <!-- Breadcrumbs -->
        <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>
        <!-- Markets Section -->
        <div class="min-h-screen">
            <div>
                <!-- Filter -->
                <div class="flex justify-between">
                    <p class="h1 py-4">Markets</p>
                    <data-filter :filtersData="filtersData" :filterTitle="filterTitle" v-on:filterByData="loadMarket"></data-filter>
                </div>

                <div>
                    <!-- Top Markets -->
                    <top-markets :topMarkets="topMarkets" :isLoading="isLoading"></top-markets>
                    <!-- All Markets -->
                    <all-markets :allMarkets="allMarkets" :isLoading="isLoading"></all-markets>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue';
import DataFilter from '~/components/common/Filter.vue';
import TopMarkets from '~/components/markets/Top.vue';
import AllMarkets from '~/components/markets/All.vue';

export default {
    components: {
        Breadcrumb,
        DataFilter,
        TopMarkets,
        AllMarkets
    },
    data (){
        return {
          filterTitle: 'Filter by Location',
          filtersData: [],
          topMarkets: [],
          allMarkets: [],
          isLoading:true,

          breadCrumbs: [
              {title: 'Home', url: '/'},
              {title: 'Go To Market', url: '/cities'},
              {title: '', url: ''},
          ],

        }
    },

    mounted() {
      this.loadAreas();
      this.loadMarket();
      this.getCityName();
    },

    methods: {
      async loadAreas() {
        await this.$axios.get(
          '/api/areas-by-city/' + this.$route.params.id
        ).then((res) => {
          this.filtersData = res.data;
          // this.breadCrumbs[2].title = this.filtersData.data[0].city.name;
        })
        .catch((error) => {
          if(error.response.status == 404){
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
      },

      async loadMarket(id, isLoading) {
        await this.$axios.$get(
          id ? '/api/markets/top-market-by-area/' + id : '/api/markets/top-market-by-city/' + this.$route.params.id
        ).then((res) => {
          this.topMarkets = res.data;
          isLoading ? this.isLoading = isLoading : this.isLoading = false;
        }),
        await this.$axios.$get(
          id ? '/api/markets/all-market-by-area/' + id : '/api/markets/all-market-by-city/' + this.$route.params.id
        ).then((res) => {
          this.allMarkets = res.data;
          this.isLoading = false;
        })
      },

      getCityName()
      {
        this.breadCrumbs[2].title = localStorage.getItem('city');
      }

    }
}
</script>
