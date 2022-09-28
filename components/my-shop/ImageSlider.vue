<template>
    <div>
        <div class="">
            <div class="grid lg:grid-cols-4 grid-cols-3 md:gap-4 sm:gap-2 gap-1 my-5 relative">
                <div class="relative pb-3/5" v-for="(photo, i) in photos" :key="i">
                    <img class="absolute h-full w-full object-cover rounded-xl" :src="require(`~/assets/img/shops/${photo}.png`)" alt="">
                </div>
                <button class="absolute right-0 w-10 h-10 items-center border border-gray-2 bg-white focus:outline-none rounded-full ml-2">
                    <i class="ri-arrow-right-line"></i>
                </button>
                <button class="absolute left-0 w-10 h-10 items-center border border-gray-2 bg-white focus:outline-none rounded-full ml-2">
                    <i class="ri-arrow-left-line"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:() => ({
        photos:[
            'img-1',
            'img-2',
            'img-3',
            'img-4',
        ]
    })
}
</script>