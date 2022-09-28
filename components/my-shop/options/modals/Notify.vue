<template>
    <div>
        <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
            <div @click="wait">
                <div class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                    <!-- <div class="w-full text-right pr-1">
                        <button @click="closeLoginModal" class="text-2xl focus:outline-none"><i class="ri-close-line"></i></button>
                    </div> -->
                    <div class="cart-tems-center text-center">
                        <p class="title">Send Notification to Subscribers</p>
                        <div class="p-6">
                            <p class="mb-6">Notify your subscribers about this product.</p>
                            <button @click="notifyToSubscribers(product.shop.id)" class="btn-border bg-green-3 focus:outline-none">Send to all</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="closeModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            close_modal: 'modal',
        }
    },
    props:['product'],
    mounted() {

    },
    methods: {
        notifyToSubscribers(id)
        {
            let loader = this.$loading.show({
                // Optional parameters
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
                zIndex: 2000,
                opacity: 0.5,
            })
            this.$axios.get(`/api/notify-subscribers/${id}`)
            .then(response => {
                this.$toast.success('Sent notification successfully !')
                loader.hide()
                this.closeModal();
            })
            .catch(error => {
                this.$toast.error('Oops..! Something wrong...!');
            });
        },
        closeModal()
        {
            if(this.close_modal == 'modal')
            {
                this.$emit('notify');
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
