<template>
    <div>
        <div class="relative pb-1/2">
            <img class="absolute h-full w-full object-cover rounded-lg" :src="cover_image ? basePath + '/storage/' +  cover_image : require(`~/assets/img/products/default.png`)" alt="Image">
            <button class="absolute left-0 bottom-0 w-10 h-10 items-center border border-white bg-white opacity-50 focus:outline-none rounded-full ml-2 mb-2">
                <i class="ri-image-add-fill"></i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props:['cover_image', 'basePath']
}
</script>
