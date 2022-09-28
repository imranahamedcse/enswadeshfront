<template>
    <div>
        <div @click="closeNotifyBox" class="fixed inset-0 z-50 flex flex-col items-end max-w-screen-xl xl:px-10 px-2 m-auto mt-24">
            <div @click="wait" class="focus-in max-w-sm shadow-lg p-4 border border-gray-3 bg-white overflow-y-scroll">
                <p class="font-bold text-xl mb-6 text-center">Here's You've Unread Notifications.</p>
                <div v-if="isLoading" class="text-center">
                  <loader></loader>
                </div>
                  <!-- {{ notifications }} -->
                <div v-else class="">
                    <div class="border-b p-2" v-for="(notification, i) in notifications" :key="i">
                        <div v-if="notification.data.data">
                            <h2 class="text-xl font-semibold pb-3">{{notification.data.data.title}}</h2>
                          <!-- <p class="text-sm">{{notification.data.data.body}}</p> -->
                          <div class="flex justify-between">
                              <NuxtLink @click="closeNotifyBox" class="btn bg-green-3 focus:outline-none" :to="notification.data.data.action_url">{{notification.data.data.action_button}}</NuxtLink>
                              <button @click="readNotification" class="btn bg-red-5 focus:outline-none" :data-id="notification.id">Mark as Read</button>
                          </div>
                        </div>
                        <!-- <div v-if="notification.data.order_data">
                            <h2 class="text-xl font-semibold pb-3">{{notification.data.order_data.title}}</h2>
                            <div class="flex justify-between">
                              <NuxtLink @click="closeNotifyBox" class="btn bg-green-3 focus:outline-none" :to="notification.data.order_data.action_url">{{notification.data.order_data.action_button}}</NuxtLink>
                              <button @click="readNotification" class="btn bg-red-5 focus:outline-none" :data-id="notification.id">Mark as Read</button>
                          </div>
                        </div> -->

                    </div>
                </div>
                <!-- <div v-else>
                    <img class="m-auto h-24" src="~/assets/img/empty.png" alt="Image">
                    <p class="font-bold text-center">There are no New Notifications</p>
                </div> -->
            </div>
        </div>
        <div @click="closeNotifyBox" class="fixed inset-0"></div>
    </div>
</template>
<script>
import Loader from '~/components/lib/Loader.vue'

export default {
    data() {
      return {
        isLoading: true,
        close_modal: 'closeModal',
        notifications:{},
      }
    },
    components: {
      Loader
    },
    mounted() {
      //console.log(this.$auth.user);
      this.loadNotifications();
    },
    methods: {
      closeNotifyBox()
      {
        if(this.close_modal == 'closeModal')
        {
          this.$emit('closeNotify');
        }
      },
      wait()
      {
        this.close_modal = 'wait';
        setTimeout(() => this.close_modal = 'closeModal', 500);
      },

      async loadNotifications() {
        await this.$axios.get('/api/notifications')
        .then((res) => {
          this.notifications = res.data.data;
          this.isLoading = false;
        })
      },

      readNotification(event)
      {
        const id = event.target.getAttribute('data-id');
        const readData = {id: id };
        this.$axios.post('/api/notifications/read', readData)
        .then( respons => {
          this.loadNotifications();
          this.$toast.success('Your Shop setup is done')
        })
      }
    },
}
</script>
