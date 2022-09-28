<template>
    <div>
        <div v-for="(item, i) in topics" :key="i" class="flex justify-between items-center bg-gray-5 p-4 mb-4">
            <strong>{{item.title}}</strong>
            <button @click="uploadModal(item.id)" class="bg-green-3 font-semibold py-1 px-4 focus:outline-none">Upload</button>
        </div>
        <div v-if="modal">
            <div @click="uploadModal(topic.id)" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
                <div @click="wait">
                    <div @click="uploadModal(topic.id)" class="w-full text-right pr-1">
                        <button class="text-2xl text-gray-5 focus:outline-none"><i class="ri-close-line"></i></button>
                    </div>
                    <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                      <form @submit.prevent="uploadContribution(topic.id)">
                        <div class="">
                            <p class="title">Upload your template</p>
                            <p class="p-4 font-semibold"><strong>Topics:</strong> {{topic.title}}</p>
                            <div class="p-4 grid md:grid-cols-2 gap-4">
                                <div>
                                    <div class="mb-4">
                                        <label class="input-label" for="file">Upload image (jpg,png,jpeg)</label>
                                        <input @change="thumbFile" id="file" type="file"/>
                                    </div>
                                    <nuxt-link class="font-bold text-blue-1" to="">Read guideline and instructions.</nuxt-link>
                                </div>
                                <div>
                                    <div class="mb-4">
                                        <label class="input-label" for="title">Title</label>
                                        <input v-model="title" class="input-field focus:outline-none" id="title" type="text"  placeholder="Write video title here" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="input-label" for="description">Description</label>
                                        <textarea v-model="description" class="input-field focus:outline-none" id="description" rows="4" placeholder="Write here video description"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div class="p-4 flex items-center justify-center">
                                <button class="btn-disabled">Submit</button>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
            <div @click="uploadModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modal: false,
            close_modal: 'modal',
            topics:[],
            topic:'',
            title:'',
            description:'',
            thumbnail: '',
        }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      async loadData() {
        await this.$axios.$get(
          '/api/topics/category/2'
        ).then((res) => {
          this.topics = res.data;
        })
      },
      uploadModal(topicsId)
      {
        this.topic = this.topics.filter((obj)=>{
          return obj.id === topicsId;
        }).pop();
        if(this.close_modal == 'modal')
        {
            this.modal = !this.modal;
          }
      },
      wait()
      {
          this.close_modal = 'wait';
          setTimeout(() => this.close_modal = 'modal', 500);
      },

      thumbFile(e) {
        this.thumbnail = e.target.files[0]
        // console.log(this.thumbnail)
      },
      async uploadContribution(topicsId)
      {
        var formData = new FormData()

        formData.append('topic_id', topicsId)
        formData.append('user_id', this.$auth.user.id)
        formData.append('interaction_category_id', 2)
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('thumbnail', this.thumbnail)

        const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }

        await this.$axios
          .post('/api/interaction/store', formData, config)
          .then((response) => {
            this.$toast.success('Templates Uploaded Successfully !')
            this.$router.push('/my-account/my-contributions')
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.$nuxt.error({ statusCode: 404, message: 'err message' })
            }
          })
      }
    },
}
</script>
