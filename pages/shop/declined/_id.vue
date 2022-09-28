<template>
    <div>
        <!-- Breadcrumbs -->
        <!-- <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb> -->

        <!-- <p class="text-3xl font-bold mb-4">Shops (1)</p> -->
        <div class="h-screen flex flex-col items-center justify-center text-center">
              <h1 class="py-5 text-3xl">Sorry Your Shop <strong>{{shop.name}}</strong> is Declined !</h1>
              <p>For Further Information Please Contact With EnSwadesh Management</p>
              <nuxt-link class="text-indigo-700" to="/">Back To Home</nuxt-link>
        </div>
    </div>
</template>
<script>
// import Breadcrumb from '~/components/common/Breadcrumb.vue';
export default {
    // components: {
    //     Breadcrumb,
    // },
    data() {
        return {
            // breadCrumbs: [
            //     {title: 'My Shop', url: '/'},
            //     {title: 'Own Shop', url: ''},
            // ],
            shop:'',
        };
    },
    mounted(){
      this.checkShopStatus();
    },
    methods: {
      async checkShopStatus() {
        await this.$axios.get(
          '/api/my-shops/pending/' + this.$route.params.id
        ).then((res) => {
          this.shop = res.data.data;
          if(this.shop.status == 'Approved') {
            this.$router.push({ name: 'shop-setup-id', params: { id: this.shop.id } })
          }
          if(this.shop.status == 'Pending') {
            this.$router.push({ name: 'shop-under-verification-id', params: { id: this.shop.id } })
          }
        })
        .catch((error) => {
          if(error.response.status == 404){
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
      },
    }
}
</script>
