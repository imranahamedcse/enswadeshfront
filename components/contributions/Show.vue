<template>
  <div>
    <div class="min-h-screen">
      <div class="add_loader" v-if="isLoading">
        <div class="main-loader"><loader></loader></div>
      </div>
      <div>
        <div class="grid md:grid-cols-2 gap-6 py-6">
          <div v-if="contribution.file" class="relative">
            <video v-if="contribution.file.file_type == 'Video'" width="100%" controls>
              <source :src="basePath + '/storage/' + contribution.file.file_path" type="video/mp4">
              <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
              Your browser does not support HTML video.
            </video>
            <!-- <img class="absolute h-full w-full" src="~/assets/img/video.png" alt="Image"> -->
          </div>
          <div v-else class="relative pb-1/2">
            <img class="absolute h-full w-full object-cover rounded-lg" :src="contribution.thumbnail ? basePath + '/storage/' + contribution.thumbnail : require(`~/assets/img/products/default.png`)" alt="Image">
          </div>
          <div class="relative">
            <p class="h2">{{contribution.title}}</p>
            <div class="flex items-center py-2">
              <div>
                <img v-if="contribution.profile" class="w-16 h-16 rounded-full mr-3" :src="basePath + '/storage/' + contribution.profile" alt="Image">
                <img v-else class="w-16 h-16 rounded-full mr-3" src="~/assets/img/user.png" alt="Image">
              </div>
              <div>
                <p><strong>{{contribution.user ? contribution.user : ''}}</strong></p>
                <p class="text-gray-4">{{contribution.created_at}} | 00 views</p>
              </div>
            </div>
            <p class="mb-2">
              {{contribution.description}}
            </p>
            <nuxt-link class="font-bold text-blue-1" to="">Read more</nuxt-link>

            <div class="flex absolute bottom-0">
              <button @click="postLike(contribution.id)" class="px-6 py-1 font-bold flex items-center mr-3 bg-blue-1 text-white focus:outline-none"><i class="ri-thumb-up-fill mr-2"></i>{{ likes > 1000 ? Math.floor(likes/1000)+'K' : likes }}</button>
              <button class="px-6 py-1 font-bold flex items-center bg-blue-1 text-white focus:outline-none"><i class="ri-share-forward-fill mr-2"></i>Share</button>
            </div>
          </div>
        </div>

        <div>
          <form v-if="$auth.loggedIn" @submit.prevent="postComment(contribution.id)">
            <div class="flex flex-row border-gray-3 pt-3">
              <div class="mr-4">
                <img class="w-12 h-12 rounded-full" :src="profileimg" alt="Image">
              </div>
              <div class="w-full">
                <textarea class="w-full bg-white py-1 px-2 border border-gray-3 focus:outline-none" v-model="comment" placeholder="Write your comment here..." rows="4"></textarea>
                <button class="mt-2 px-4 py-1 font-bold text-gray-4 bg-gray-3 flex items-center hover:bg-blue-1 hover:text-white focus:outline-none">Submit</button>
              </div>
            </div>
          </form>
          <div class="text-center" v-else>
              <p>Please <NuxtLink to="/Login" class="font-bold">Login</NuxtLink> to do a comment in this contributions</p>
          </div>
        </div>

        <div v-for="(comment, i) in comments" :key="i" class="border-b border-gray-3 py-3 flex">
          <div class="mr-4">
            <img v-if="comment.profile" class="w-12 h-12 rounded-full" :src="basePath + '/storage/' +comment.profile" alt="Image">
            <img v-else class="w-12 h-12 rounded-full" src="~/assets/img/user.png" alt="Image">
          </div>
          <div>
            <div>
              <strong class="mr-4">{{ comment.user ? comment.user : '' }}</strong>
              <small class="text-gray-4">{{comment.created_at}}</small>
            </div>
            <p class="py-2">{{ comment.comment }}</p>
          </div>
          <!-- <button class="px-3 py-1 font-bold text-gray-4 bg-gray-3 flex items-center mr-3 hover:bg-blue-1 hover:text-white focus:outline-none"><i class="ri-thumb-up-fill mr-2"></i>Approve</button> -->
        </div>
      </div>

    </div>
  </div>
</template>
<script>

import Loader from '~/components/lib/Loader.vue'
export default {
  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      comments: [],
      comment: '',
      likes: '00',
    }
  },
  computed:{
    profileimg() {
      return this.basePath + '/storage/' + this.$auth.user.profile.image;
    },
  },
  components: {
    Loader
  },
  props:['contribution', 'isLoading'],
  mounted(){
    this.getComments();
    this.getLikes();
  },
  methods: {
    async getLikes() {
      await this.$axios.get('/api/like/'  + this.$route.params.id)
      .then((res) => {
        this.likes = res.data.data;
      })
    },
    async postLike(interaction_id)
    {
      if(this.$auth.loggedIn){
        var formData = new FormData()

        formData.append('user_id', this.$auth.user.id)
        formData.append('interaction_id', interaction_id)
        await this.$axios
        .post('/api/like/create/', formData)
        .then((res) => {
          if(res.data)
            this.$toast.success('Liked');
          else
            this.$toast.error('Unlike!')
          this.getLikes();
        })
        .catch((error) => {
          this.$toast.error('Something went Wrong!')
        })
      }
      else
        this.$toast.error('Please login first !')
    },


    async postComment(interaction_id)
    {
      if(this.comment != ''){
        var formData = new FormData();
        formData.append('user_id', this.$auth.user.id);
        formData.append('interaction_id', interaction_id);
        formData.append('comment', this.comment);

        await this.$axios
        .post('/api/comments/create', formData)
        .then((response) => {
          this.$toast.success('Comment Posted!');
          this.comment = '';
          this.getComments();

        })
        .catch((error) => {
          this.$toast.error('Something went Wrong!');
        })
      }
      else
        this.$toast.error('Please write first !')
    },
    async getComments() {
      await this.$axios.get('/api/comments/'  + this.$route.params.id)
      .then((res) => {
        this.comments = res.data.data
        console.log(this.comments)
      })
    },
  }

}
</script>
