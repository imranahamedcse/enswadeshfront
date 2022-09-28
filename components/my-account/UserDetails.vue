<template>
  <div>
    <div class="relative list-items-center">
      <div class="absolute top-0 right-0 mt-2 mr-4">
        <n-link to="/my-account/edit" class="focus:outline-none">
          <i class="ri-edit-box-line font-bold text-xl text-blue-1"></i>
        </n-link>
      </div>
      <img class="avatar" v-if="profile.image" :src="profileimg" alt="Image" />
      <img
        v-else
        class="avatar"
        src="~/assets/img/user.png"
        alt="Image"
      />
      <p class="h3">{{ $auth.user.name }}</p>
      <p v-if="profile.dob">DOB {{ profile.dob }}</p>
      <p v-else></p>
      <p>Blood Group {{ profile.blood_group }}</p>

      <p>{{ $auth.user.email }}</p>
      <p>{{ $auth.user.phone_number }}</p>
      <p>{{ profile.address }}</p>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/lib/Loader.vue'
export default {
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: true,
      user: {},
    }
  },
  computed: {
    profileimg() {
      return this.$axios.defaults.baseURL + '/storage/' + this.profile.image
    },
    profile() {
      let profile = {}
      if (this.$auth.user.profile) {
        profile = this.$auth.user.profile
      } else {
        let profiledata = {
          dob: '',
          blood_group: '',
          address: '',
        }
        profile = profiledata
      }
      return profile
    },
  },
}
</script>
<style></style>
