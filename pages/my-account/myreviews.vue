<template lang="">
    <div>
        <p class="title">My Reviews</p>
        <div class="bg-white">
            <div class="p-4 flex">
                <div class="btn-group rounded-l bg-green-3 hover:bg-green-3">
                    To be reviewed
                </div>
                <div class="btn-group rounded-r hover:bg-green-3">
                    Reviewed
                </div>
            </div>
        </div>
        <div v-if="!empty">
            <div v-for="(prodict, i) in products" :key="i" class="p-4 border-t border-gray-3 bg-white grid grid-cols-8 gap-2">
                <div class="relative pb-full">
                    <img class="absolute h-full w-full object-cover" src="~/assets/img/products/default.png" alt="Image"/>
                </div>
                <div class="col-span-3 flex flex-col justify-between">
                    <p class="font-semibold">Product name will be here title 2nd line</p>
                    <p class="text-gray-4">Color: Black, Size: M</p>
                </div>
                <div class="col-span-3 flex flex-col justify-between">
                    <p class="font-semibold">Purchase from: <span class="text-blue-1">Shop name goes to here</span></p>
                    <p class="text-gray-4">Purchased on 05 Mar, 2021</p>
                </div>
                <div class="flex items-center justify-center">
                    <button @click="ratingModal" class="border border-gray-4 rounded py-1 w-full font-semibold hover:bg-green-3 focus:outline-none">Review</button>
                </div>
            </div>
            <div class="my-2 font-bold">
                Paginate here...
            </div>
        </div>
        
        <!-- When review is empty -->
        <div v-if="empty" class="list-items-center">
            <div class="text-6xl w-32 h-32 mt-10 rounded-full bg-gray-3 text-gray-4 flex items-center justify-center">
                <i class="ri-question-answer-fill"></i>
            </div>
            <p class="h2 text-gray-4 mb-10">Your reviews is empty</p>
        </div>
        
        
        <!-- Review modal -->
        <review v-if="modal" v-on:ratingModal="ratingModal"></review>

    </div>
</template>
<script>
import Review from '~/components/product-details/Review.vue'

export default {
    data() {
        return {
            modal: false,
            empty: false,
            products: [
                '',
                '',
                '',
                '',
            ]
        }
    },
    components: {
        Review,
    },
    methods: {
        ratingModal(){
            this.modal = !this.modal;
        },
    }
}
</script>
<style lang="">
    
</style>