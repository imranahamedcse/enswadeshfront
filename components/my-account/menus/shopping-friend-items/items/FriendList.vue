<template lang="">
    <div>
        <div class="md:p-4 p-2">
            <div class="search">
                <i class="search-icon ri-search-line"></i>
                <input type="text" class="search-input w-full focus:outline-none" placeholder="Search">
            </div>
        </div>
        
        <div class="md:px-4 px-2">
            <div class="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
                <div v-for="(row, i) in rows" :key="i" class="flex flex-col items-center md:border-2 border border-r-4 border-b-4 rounded-lg p-2">
                    <img class="avatar" src="~/assets/img/default_market.png" alt="Image">
                    <p class="h3 mt-4">Adam</p>
                    <div class="w-full mt-4 flex items-center justify-center gap-4 text-xl">
                        <button class="rounded w-8 h-8 bg-green-1 "><i class="ri-message-2-fill"></i></button>
                        <button class="rounded w-8 h-8 bg-green-1 "><i class="ri-phone-fill"></i></button>
                        <button class="rounded w-8 h-8 bg-green-1 "><i class="ri-video-chat-fill"></i></button>
                    </div>
                    <button class="mt-4 btn-border hover:bg-green-3 focus:outline-none">Unfriend</button>
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
            rows: [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
            ],
        }
    }
}
</script>