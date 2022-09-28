<template>
    <div>
        <div class="flex justify-between">
            <p class="md:h1 h2">Similar Products</p>
            <div class="flex text-xl font-bold">
                <!-- Paginate here -->
                <!-- <button class="border-2 rounded-full md:w-12 w-8 md:h-12 h-8 text-xl mr-4 hover:bg-green-3 focus:outline-none"><i class="ri-arrow-left-line"></i></button>
                <button class="border-2 rounded-full md:w-12 w-8 md:h-12 h-8 text-xl mr-4 hover:bg-green-3 focus:outline-none"><i class="ri-arrow-right-line"></i></button> -->
            </div>
        </div>
        <div class="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-4 pt-6 pb-6">
            <div v-for="(product, i) in products" :key="i">
                <div @click="showModal()" class="cursor-pointer h-full mb-10">
                    <div class="">
                        <img class="h-52 w-full" src="~/assets/img/products/default.png" alt="Image"/>
                    </div>
                    <p class="font-semibold pt-2">{{ product.name }}</p>
                    <p class="">{{ product.color }}</p>
                    <p class="font-semibold">{{ product.price }} BDT</p>
                </div>
            </div>
        </div>

        
        <!-- Product Details -->
        <product-details v-if="modal"></product-details>
    </div>
</template>
<script>

import ProductDetails from '~/components/product-details/Product-details.vue'
export default {
    data() {
        return {
            modal: false,
            products: [
                {name: 'Product name gose here', color: 'Red', price: '1200'},
                {name: 'Product name gose here', color: 'Red', price: '1200'},
                {name: 'Product name gose here', color: 'Red', price: '1200'},
                {name: 'Product name gose here', color: 'Red', price: '1200'},
            ]
        }
    },
    components: {
        ProductDetails,
    },
    methods: {
        showModal() {
            this.modal = true
        },
        closeModal() {
            this.modal = false
        },
    }
}
</script>
