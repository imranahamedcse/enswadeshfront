<template>
    <div>
        <div class="p-4 bg-white">
            <p class="font-semibold">Create content on the given topics to earn</p>
            <div class="my-4">
                <nuxt-link v-for="(button, index) in buttons" :key="index" :class="$route.path == button.url ? 'bg-green-3' : ''" class="font-semibold border border-gray-4 py-1 px-4 hover:bg-green-3" :to="button.url">{{ button.name }}</nuxt-link>
            </div>
            <div>
                <nuxt-child />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            buttons: [
                {name:'Videos', url: '/earn/creativity/videos'},
                {name:'Templates', url: '/earn/creativity/templates'},
                {name:'Real experiences', url: '/earn/creativity/real-experiences'},
                {name:'Memes', url: '/earn/creativity/memes'},
                {name:'Stories', url: '/earn/creativity/stories'},
            ],
        }
    }
}
</script>