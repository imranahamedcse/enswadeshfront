<template>
    <div v-if="slider_images != ''">
        <VueSlickCarousel  v-bind="settings">
            <div class="px-1" v-for="(slider, i) in slider_images" :key="i">
                <img class="rounded-lg h-40 w-full" :src="basePath + '/storage/' + slider.image" alt="Image">
            </div>
        </VueSlickCarousel>
    </div>
</template>
<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  export default {
    name: 'MyComponent',
    data() {
        return {
            settings: {
                "dots": true,
                "infinite": true,
                "slidesToShow": 4,
                "slidesToScroll": 1,
                "autoplay": true,
                "autoplaySpeed": 2000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true
            },
            sliders: [
              '', '', '', ''
            ]
        }
    },
    props: ['slider_images', 'basePath'],
    components:
    {
        VueSlickCarousel
    },
  }
</script>
