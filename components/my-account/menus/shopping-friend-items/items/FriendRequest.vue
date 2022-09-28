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
                    <button class="mt-4 btn-border bg-green-3 focus:outline-none">Accept</button>
                    <button class="mt-2 btn-border hover:bg-green-3 focus:outline-none">Cancel</button>
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
            ],
        }
    }
}
</script>