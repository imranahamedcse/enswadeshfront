<template lang="">
    <div>
        <div class="flex justify-between px-4">
            <p class="h2">My Shops</p>
            <button class="btn-add focus:outline-none">Add Shop</button>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4">
            <div v-for="(item, index) in items" :key="index">
                <div class="relative target-area">
                    <img class="h-16 w-full" src="~/assets/img/banner_green.png" alt="Image"/>
                    <p class="absolute top-0 mt-4 w-full text-center font-bold text-white text-xl mb-5" >101</p>
                    <img class="sm:h-56 h-40 w-full" src="~/assets/img/shutter.png" alt="Image" />
                    <p class="w-full text-center font-bold">Shop name gose hear</p>

                    <div class="hover-area absolute top-0 left-0 bottom-0 right-0 bg-gray-2 opacity-50"></div>
                    <div class="hover-area absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center">
                        <button class="btn-border focus:outline-none bg-green-3 mb-4">Control Room</button>
                        <button class="btn-border focus:outline-none">Visit Shop</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            items: [
                '',
                '',
                '',
            ]
        }
    }
}
</script>