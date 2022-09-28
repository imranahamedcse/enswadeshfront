<template lang="">
    <div>
        <div class="h-screen">
            <p class="h1 mb-4">Invoice</p>
            <div class="grid grid-cols-2 items-center bg-white">
                <div>
                    <img class="h-20" src="~/assets/img/logo.png" alt="Logo"/>
                </div>
                <div class="flex justify-end p-2">
                    <strong>Invoice no: </strong>#0000001
                    <strong class="ml-4">Date: </strong>25 Mar, 2021
                </div>
            </div>
            <div>
                <p class="title">Receipient</p>
                <div class="p-4 bg-white">
                    <p class="h3 mb-2">Shafiq</p>
                    <p class="mb-2 flex items-center"><i class="mr-2 ri-map-pin-fill"></i>Flat# 3B, Floor# 2nd, House#23, Road#1A, Shahbag, Dhaka city, Dhaka. </p>
                    <p class="mb-2 flex items-center"><i class="mr-2 ri-bank-card-fill"></i>Bill to the same address</p>
                    <p class="mb-2 flex items-center"><i class="mr-2 ri-phone-fill"></i>01234567890</p>
                    <p class="mb-2 flex items-center"><i class="mr-2 ri-mail-fill"></i>hello@email.com</p>
                </div>
            </div>
            <div class="bg-white">
                <p class="title">Order Summary</p>
                <div class="p-4">
                    <table class="w-full">
                        <thead class="font-bold">
                            <tr>
                                <td>Product</td>
                                <td>Quantity</td>
                                <td>Unit Price</td>
                                <td>Total Price</td>
                            </tr>
                        </thead>
                        <tbody class="px-4">
                            <tr v-for="(item, index) in items" :key="index">
                                <td><div class="py-1">Product name gose here</div></td>
                                <td>1</td>
                                <td>1195</td>
                                <td>1195</td>
                            </tr>
                            <tr class="border-t border-gray-3 text-gray-4 text-lg font-semibold">
                                <td colspan="3"><div class="pt-1">Subtotal (4 items)</div></td>
                                <td>৳ 4,780</td>
                            </tr>
                            <tr class="border-b border-gray-3 text-gray-4 text-lg font-semibold">
                                <td colspan="3"><div class="pb-1">Discount</div></td>
                                <td>৳ 50</td>
                            </tr>
                            <tr class="border-gray-3 text-xl font-bold">
                                <td colspan="3"><div class="py-1">Total</div></td>
                                <td>৳ 4,780</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                '',
                '',
                '',
                '',
                '',
                '',
            ]
        }
    },
}
</script>
<style lang="">
    
</style>