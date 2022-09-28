<template >
    <div>
        <div class="p-4">
            <div class="search">
                <i class="search-icon ri-search-line"></i>
                <input type="text" class="search-input w-full focus:outline-none" placeholder="Search">
                <!-- <input type="text" v-on:keyup="searchFriendData" v-model="keydata" class="search-input w-full focus:outline-none" placeholder="Search"> -->
            </div>
        </div>

        <div class="px-4">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="(friend, i) in friends" :key="i" class="flex flex-col items-center border-2 border-r-4 border-b-4 rounded-lg p-2">
                  <img class="avatar" src="~/assets/img/default_market.png" alt="Image">
                  <p class="font-bold mt-4">{{ friend.name }}</p>
                  <button @click="sendRequest(friend.id)" class="mt-4 btn-border hover:bg-green-3 focus:outline-none">Send Request</button>
              </div>
            </div>
        </div>
        <!-- <div class="p-4 flex justify-center">
            <button class="btn-border hover:bg-green-3 focus:outline-none">View more</button>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
    return {
      friends: []
    }
  },
  
  mounted(){
    this.getFriends();
  },

  methods: {
    // async searchFriendData(e)
    // {
    //   let keyword = e.target.value;
    //   if (!keyword) {
    //     this.$router.push({path: 'find-friend'});
    //     this.friends = [];
    //   }else{
    //     await this.$axios.get('/api/search/shoping-friend/' + keyword)
    //     .then((response) => {
    //       this.friends = response.data.data;
    //       console.log(this.friends);
    //     })
    //     .catch((error) => {
    //       if (error.response.status == 404) {
    //         this.$nuxt.error({ statusCode: 404, message: 'err message' })
    //       }
    //     })
    //   }
    // },

    async getFriends()
    {
      await this.$axios.get('/api/find-friends-list')
      .then((response) => {
        this.friends = response.data.data;
      })
      .catch((error) => {
        if (error.response.status == 404) {
          this.$nuxt.error({ statusCode: 404, message: 'err message' })
        }
      })
    },
    
    async sendRequest(id){
      await this.$axios.get('/api/send-request/'+id)
      .then((res) => {
        this.$toast.success('Friend request send successfully.')
      })
      .catch((error) => {
        console.log('Opps.. something wrong!');
      })
    }
  },
}
</script>
