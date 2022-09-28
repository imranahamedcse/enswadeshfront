<template>
    <div>
        <div @click="ratingModal()" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
            <div @click="wait">
                <div @click="ratingModal()" class="w-full text-right pr-1">
                    <button class="text-2xl text-gray-5 focus:outline-none"><i class="ri-close-line"></i></button>
                </div>
                <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                    <div class="">
                        <p class="title">Rate and review purchased product</p>
                        <div class="p-4">
                            <div class="pb-4 border-b border-gray-3 bg-white grid grid-cols-7 gap-2">
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
                            </div>
                            <div class="p-4 flex flex-col items-center justify-center">
                                <p class="font-bold text-xl">How would you rate this product?</p>
                                <div class="flex flex-row gap-2 text-3xl text-gray-4 cursor-pointer">
                                    <i class="ri-star-line"></i> 
                                    <i class="ri-star-line"></i> 
                                    <i class="ri-star-line"></i> 
                                    <i class="ri-star-line"></i> 
                                    <i class="ri-star-line"></i> 
                                </div>
                            </div>
                            <textarea class="input-field" rows="4" placeholder="Please share your feedback about product"></textarea>
                            <div class="pb-4 pt-2 border-b border-gray-3">
                                <div class="pb-4 flex flex-row items-center gap-4">
                                    <div class="w-20 h-20 border border-gray-3 rounded-md border-dashed text-3xl text-gray-4 flex items-center justify-center">
                                        <i class="ri-add-line"></i>
                                    </div>
                                    <span>Minimum: 2 | Maximum: 6</span>
                                </div>
                                <div class="flex gap-4">
                                    <div class="w-20 h-20 bg-gray-3"></div>
                                    <div class="w-20 h-20 bg-gray-3"></div>
                                    <div class="w-20 h-20 bg-gray-3"></div>
                                    <div class="w-20 h-20 bg-gray-3"></div>
                                </div>
                            </div>
                            <div class="flex items-center justify-center pt-4">
                                <button class="border border-gray-4 rounded py-1 px-6 font-semibold hover:bg-green-3 focus:outline-none">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="ratingModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            close_modal: 'modal',
        }
    },
    methods: {
      ratingModal()
      {
        if(this.close_modal == 'modal')
        {
            this.$emit('ratingModal');
        }
      },
      wait()
      {
          this.close_modal = 'wait';
          setTimeout(() => this.close_modal = 'modal', 500);
      },

    },
}
</script>
