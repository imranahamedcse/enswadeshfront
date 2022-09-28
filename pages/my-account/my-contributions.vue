<template>
    <div>
        <div>
            <p class="title">My Videos ( {{videos.length}} )</p>
            <div class="p-4 bg-white mb-4">
                <div v-if="videos.length > 0" class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                    <div v-for="(video, i) in videos" :key="i" class="md:border-2 border border-green-4">
                        <div class="relative pb-2/3">
                            <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + video.thumbnail" alt="Image">
                            <small class="absolute bottom-0 mb-2 ml-2 text-white bg-green-5 px-3 py-1 inline">00:00</small>
                        </div>
                        <div class="p-2">
                            <p class="font-bold lg:text-lg">{{ video.title }}</p>
                            <p class="text-gray-2">00 views  •  {{ video.created_at }} </p>
                        </div>
                    </div>
                </div>
                <!-- When no videos yet -->
                <div v-else class="py-10 text-center">
                    <p class="h2">You have no videos</p>
                </div>
            </div>
            <p class="title">My Templates ({{ templates.length }})</p>
            <div class="p-4 bg-white mb-4">
                <div v-if="templates.length > 0" class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                    <div v-for="(template, i) in templates" :key="i" class="md:border-2 border border-green-4">
                        <div class="relative pb-2/3">
                            <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + template.thumbnail" alt="Image">
                        </div>
                        <div class="p-2">
                            <p class="font-bold lg:text-lg">{{ template.title }}</p>
                            <p class="text-gray-2">00 views  •  {{ template.created_at }} </p>
                        </div>
                    </div>
                </div>
                <!-- When no templates yet -->
                <div v-else class="py-10 text-center">
                    <p class="h2">You have no templates</p>
                </div>
            </div>
            <p class="title">My Real Experiences ({{experiences.length}})</p>
            <div class="p-4 bg-white mb-4">
                <div v-if="experiences.length > 0" class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                    <div v-for="(experience, i) in experiences" :key="i" class="md:border-2 border border-green-4">
                        <div class="relative pb-2/3">
                            <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + experience.thumbnail" alt="Image">
                        </div>
                        <div class="p-2">
                            <p class="font-bold lg:text-lg">{{ experience.title }}</p>
                            <p class="text-gray-2">00 views  •  {{ experience.created_at }} </p>
                        </div>
                    </div>
                </div>
                <!-- When no real experiences yet -->
                <div v-else class="py-10 text-center">
                    <p class="h2">You have no real experiences</p>
                </div>
            </div>
            <p class="title">My Memes ({{ memes.length }})</p>
            <div class="p-4 bg-white mb-4">
                <div v-if="memes.length > 0" class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                    <div v-for="(meme, i) in memes" :key="i" class="md:border-2 border border-green-4">
                       <div class="relative pb-2/3">
                            <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + meme.thumbnail" alt="Image">
                        </div>
                        <div class="p-2">
                            <p class="font-bold lg:text-lg">{{ meme.title }}</p>
                            <p class="text-gray-2">00 views  •  {{ meme.created_at }} </p>
                        </div>
                    </div>
                </div>
                <!-- When no memes yet -->
                <div v-else class="py-10 text-center">
                    <p class="h2">You have no memes</p>
                </div>
            </div>
            <p class="title">My Stories ({{ stories.length }})</p>
            <div class="p-4 bg-white mb-4">
                <div v-if="stories.length > 0" class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                    <div v-for="(story, i) in stories" :key="i" class="md:border-2 border border-green-4">
                        <div class="relative pb-2/3">
                            <img class="absolute h-full w-full object-cover" :src="basePath + '/storage/' + story.thumbnail" alt="Image">
                        </div>
                        <div class="p-2">
                            <p class="font-bold lg:text-lg">{{ story.title }}</p>
                            <p class="text-gray-2">00 views  •  {{ story.created_at }} </p>
                        </div>
                    </div>
                </div>
                <!-- When no stories yet -->
                <div v-else class="py-10 text-center">
                    <p class="h2">You have no stories</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            videos: [],
            templates: [],
            experiences: [],
            memes: [],
            stories: [],
            contributions: [],
            basePath: this.$axios.defaults.baseURL,
        }
    },

    mounted() {
      this.loadContributions();
    },

    methods: {
        async loadContributions() {
            await this.$axios.$get(
                '/api/my-contributions'
            ).then((res) => {
                this.contributions = res.data;
                console.log(this.contributions);
                this.contributions.forEach(contribution => {
                    if(contribution.interaction_category_id == 1){
                        this.videos.push(contribution);
                    }
                    if(contribution.interaction_category_id == 2){
                        this.templates.push(contribution);
                    }
                    if(contribution.interaction_category_id == 3){
                        this.experiences.push(contribution);
                    }
                    if(contribution.interaction_category_id == 4){
                        this.memes.push(contribution);
                    }
                    if(contribution.interaction_category_id == 5){
                        this.stories.push(contribution);
                    }
                });
            })
        }
    }
}
</script>