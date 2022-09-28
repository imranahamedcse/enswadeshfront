
<template>
    <div>
        <p class="title">Delivery</p>
        <div class="bg-white">
            <div v-if="!empty">
                <div v-for="(order, i) in orders" :key="i">
                    <div v-if="order != null" class="p-4 border-t border-gray-3 bg-white grid grid-cols-6 gap-2">
                        <div class="flex items-center justify-center">
                            <strong>NO: {{ order.order_no }}</strong>
                        </div>
                        <div class="col-span-2 flex flex-col justify-between">
                            <strong>From,</strong>
                            <p class="font-semibold">{{ order.market_name }}</p>
                            <p class="text-gray-2">{{ order.shop_name }} ({{ order.shop_no }})</p>
                        </div>
                        <div class="col-span-2 flex flex-col justify-between">
                            <strong>TO,</strong>
                            <p class="font-semibold">{{ order.name }}</p>
                            <p class="text-gray-2">{{ order.phone_number }}</p>
                        </div>
                        <div class="flex items-center justify-center">
                            <button @click="collect(order.id)" class="border border-gray-4 rounded py-1 w-full font-semibold hover:bg-green-3 focus:outline-none">Collect</button>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- When review is empty -->
        <div v-if="empty" class="list-items-center">
            <div class="text-6xl w-32 h-32 mt-10 rounded-full bg-white flex items-center justify-center">
                <i class="ri-question-answer-fill"></i>
            </div>
            <p class="h2 text-gray-4 mb-10">Your reviews is empty</p>
        </div>
       
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            empty: false,
            orders: []
        }
    },
    created(){
        this.getOrders()
    },
    methods: {
        getOrders(){
            this.$axios.get('api/get-orders/'+this.$auth.user.id)
            .then((res) => {
                this.orders = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        collect(id){
            this.$axios.get('api/collect-order/'+id)
            .then((res) => {
                this.getOrders();
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>