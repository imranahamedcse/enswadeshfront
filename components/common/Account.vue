<template>
    <div>
        <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col items-end max-w-screen-xl xl:px-10 px-2 m-auto mt-24">
            <div @click="wait" class="max-w-sm shadow-lg p-2 border border-gray-3 bg-white">
                <div class="p-4 flex flex-row items-center justify-center gap-2">
                    <img class="avatar" src="~/assets/img/default_market.png" alt="Image">
                    <p class="h3">{{$auth.user.name}}</p>
                </div>
                <div class="divider"></div>
                <div class="p-4">
                    <n-link to="" class="font-semibold hover:bg-green-3 block mb-2 p-1 delay-100">My Shopping Friends</n-link>
                    <n-link to="" class="font-semibold hover:bg-green-3 block mb-2 p-1 delay-100">Shops</n-link>
                    <n-link to="" class="font-semibold hover:bg-green-3 block mb-2 p-1 delay-100">My shops</n-link>
                    <n-link to="" class="font-semibold hover:bg-green-3 block mb-2 p-1 delay-100">My orders</n-link>
                    <n-link to="" class="font-semibold hover:bg-green-3 block mb-2 p-1 delay-100">My wishlist</n-link>
                    <p @click.prevent="logout" class="font-semibold hover:bg-green-3 w-full p-1 delay-100">Sign out</p>
                </div>
            </div>
        </div>
        <div @click="closeModal" class="fixed inset-0"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            close_modal: 'closeModal',
        }
    },
    methods: {
        closeModal()
        {
            if(this.close_modal == 'closeModal')
            {
                this.$emit('showAccountOptions');
            }
        },
        wait()
        {
            this.close_modal = 'wait';
            setTimeout(() => this.close_modal = 'closeModal', 500);
        },
        async logout() {
            this.closeModal();
            await this.$auth.logout();
            this.$toast.success('Successfully logout from your account!');
            this.$router.push('/');
        }
    },
}
</script>