<template >
    <div>
        <div class="p-4">
            <div class="search">
                <i class="search-icon ri-search-line"></i>
                <input type="text" class="search-input w-full focus:outline-none" placeholder="Search">
                <!-- <input type="text"  v-on:keyup="searchFriendData" class="search-input w-full focus:outline-none" placeholder="Search"> -->
            </div>
        </div>

        <div class="px-4">
            <div v-if="display">
                <div class="grid grid-cols-4 gap-4 pb-4">
                  <div v-for="(fnd, i) in friends" :key="i">
                    <div class="flex flex-col items-center border-2 border-r-4 border-b-4 rounded-lg p-2">
                      <img class="avatar" src="~/assets/img/default_market.png" alt="Image">
                      <p class="font-bold mt-4">{{ fnd.user_id == $auth.user.id ? fnd.friend.name : fnd.user_.name  }}</p>
                      <p class="font-bold">{{ fnd.user_id == $auth.user.id ? fnd.friend.phone_number : fnd.user_.phone_number  }}</p>
                      <p>{{ fnd.user_id == $auth.user.id ? fnd.friend.email : fnd.user_.email  }}</p>

                      <div class="p-4 flex justify-center">
                        <button @click="unFriend(fnd.id)" class="w-full btn-border hover:bg-green-3 focus:outline-none">Unfriend</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div v-else>
              No friend
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
      display: false,
      friends: [],
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
    //     this.$router.push({path: 'friend-list'});
    //     this.sfriends = [];
    //   }else{
    //     await this.$axios.get('/api/search/shoping-friend/' + keyword)
    //     .then((response) => {
    //       this.sfriends = response.data.data;
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
      await this.$axios.get('/api/friends-list')
      .then((res) => {
        if(res.data.data.length > 0){
          this.display = true;
          this.friends = res.data.data;
          console.log(this.friends);
        }
        else
          this.display = false;
      })
      .catch((err) => {
        // if (error.response.status == 404) {
        //   this.$nuxt.error({ statusCode: 404, message: 'err message' })
        // }
      })
    },
    
    async unFriend(id){
      await this.$axios.get('/api/unfriend/'+id)
      .then((response) => {
        this.getFriends();
        this.$toast.success('Unfriend successfully.')
      })
      .catch((error) => {
        console.log('Opps... Something wrong!');
      })
      // console.log(id)
    }
  },
}
</script>
