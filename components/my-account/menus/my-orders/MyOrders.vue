<template lang="">
    <div>
        <!-- <p class="h2">My Order</p> -->

        <div v-if="!order">
            <p class="title">My Orders</p>
            <div class="list-items-center">
                <div class="text-6xl w-32 h-32 mt-10 rounded-full bg-gray-3 text-gray-4 flex items-center justify-center">
                    <i class="ri-shopping-bag-2-fill"></i>
                </div>
                <p class="h2 text-gray-4 mb-10">You have no order</p>
            </div>
        </div>
        <div v-if="order">
            <div class="flex justify-between items-center bg-green-1 p-4">
                <div>
                    <p class="h3">My Orders</p>
                    <p>Total Order: 2</p>
                </div>
                <div class="flex items-center justify-center">
                    <p class="h2 mr-2">Status:</p>
                    <select class="input-field bg-green-1 font-semibold">
                        <option selected disabled>Select Any</option>
                        <option>Approved</option>
                        <option>Cancelled</option>
                        <option>Completed</option>
                        <option>On Shipping</option>
                        <option>Processing</option>
                        <option>Returned</option>
                        <option>Shipped</option>
                    </select>
                </div>
            </div>
            <div class="bg-white p-4">
                <p class="h3 mb-4">Your order ID: <span class="text-orange-1">123456789</span> (4 Items)</p>
                <p :class="order" class="warning-alart inline mb-4">Processing</p>
                <div class='grid grid-cols-4 gap-4 mb-4'>
                    <div v-for="(item, index) in items" :key="index">
                        <div class="pb-full relative mt-4">
                            <img src="~/assets/img/products/default.png" alt="Image" class="absolute w-full h-full object-cover">
                        </div>
                        <p class="font-bold">Product name here</p>
                        <p class="text-gray-2">Red</p>
                        <p class="h3">1195 BDT</p>
                    </div>
                </div>
                <div class="divider mb-4"></div>
                <p class="h3 mb-4">Your order ID: <span class="text-orange-1">1234567810</span> (2 Items)</p>
                <p :class="order" class="success-alart inline mb-4">Success</p>
                <div class='grid grid-cols-4 gap-4 mb-4'>
                    <div v-for="(item, index) in items2" :key="index">
                        <div class="pb-full relative mt-4">
                            <img src="~/assets/img/products/default.png" alt="Image" class="absolute w-full h-full object-cover">
                        </div>
                        <p class="font-bold">Product name here</p>
                        <p class="text-gray-2">Red</p>
                        <p class="h3">1195 BDT</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            order: true,
            items: [
                '',
                '',
                '',
                '',
            ],
            items2: [
                '',
                '',
            ],
        }
    }
}
</script>