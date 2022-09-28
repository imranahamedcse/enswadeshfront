<template >
    <div>
        <div class="p-4">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="(friend, i) in friends" :key="i" class="flex flex-col items-center border-2 border-r-4 border-b-4 rounded-lg p-2">
                  <img class="avatar" src="~/assets/img/default_market.png" alt="Image">
                  <p class="font-bold mt-4">{{ friend.request.name }}</p>
                  <p>{{ friend.request.email }}</p>

                  <div class="mt-4 grid grid-cols-2 gap-4">
                    <button @click="acceptRequest(friend.id)" class="w-full btn-border hover:bg-green-3 focus:outline-none">Accept</button>
                    <button @click="requestDelete(friend.id)" class="w-full btn-border hover:bg-green-3 focus:outline-none">Delete</button>
                  </div>
              </div>
            </div>
        </div>
        <div class="p-4 flex justify-center">
            <button class="btn-border hover:bg-green-3 focus:outline-none">View more</button>
        </div>
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
      await this.$axios.get('/api/request-friends-list')
      .then((response) => {
        this.friends = response.data.data;
        // console.log(this.friends);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          this.$nuxt.error({ statusCode: 404, message: 'err message' })
        }
      })
    },

    async acceptRequest(id){
      await this.$axios.get('/api/accept-request/'+id)
      .then((response) => {
        this.getFriends();
        this.$toast.success('Request accept successfully.')
      })
      .catch((error) => {
        console.log('Opps... Something wrong!');
      })
      // console.log(id)
    },

    async requestDelete(id){
      await this.$axios.get('/api/delete-request/'+id)
      .then((response) => {
        this.getFriends();
        this.$toast.success('Request deleted successfully.')
      })
      .catch((error) => {
        console.log('Opps... Something wrong!');
      })
      // console.log(id)
    }
  },
}
</script>
