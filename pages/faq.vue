<template>
    <div class="min-h-screen">
        <p class="h1 py-4">How can we help you?</p>
        <div class="py-4">
            <div class="mb-4" v-for="(item, i) in items" :key="i">
                <div @click="item.status == false ? item.status = true : item.status = false" class="font-semibold text-lg px-4 py-2 bg-green-1 cursor-pointer flex items-center justify-between">
                    <p>{{ item.que }}</p>
                    <i v-if="item.status" class="ri-arrow-up-s-line"></i>
                    <i v-else class="ri-arrow-down-s-line"></i>
                </div>
                <div v-if="item.status" class="bg-white p-4">
                    {{ item.ans }}
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
                {
                    que: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam !', 
                    ans: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita obcaecati magnam laboriosam impedit. Molestias necessitatibus iusto eligendi quam consectetur quis magnam distinctio dolores minus dolor? Molestias, laboriosam. Architecto, officiis voluptatibus?',
                    status: false,
                },
                {
                    que: 'Lorem ipsum dolor sit amet, consetetur !', 
                    ans: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita obcaecati magnam laboriosam impedit. Molestias necessitatibus iusto eligendi quam consectetur quis magnam distinctio dolores minus dolor? Molestias, laboriosam. Architecto, officiis voluptatibus?',
                    status: false,
                },
                {
                    que: 'Consetetur sadipscing elitr, sed diam !', 
                    ans: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita obcaecati magnam laboriosam impedit. Molestias necessitatibus iusto eligendi quam consectetur quis magnam distinctio dolores minus dolor? Molestias, laboriosam. Architecto, officiis voluptatibus?',
                    status: false,
                },
            ]
        }
    }
}
</script>