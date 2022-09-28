<template>
  <div>
    <div class="min-h-screen lg:pt-20 md:pt-10 pt-4">
      <menus></menus>
      <!-- Tabs -->
      <div class="lg:mt-20 md:mt-10 sm:mt-6 mt-3">
        <tab :showTab="showTab" :tabs="tabs"></tab>
      </div>
    </div>
  </div>
</template>
<script>
import Menus from '~/components/home/Menus.vue';
import Tab from '~/components/common/Tab.vue';

export default {
  data(){
    return {
      showTab: 'Videos',
      tabs:[
          {name: 'Videos',view: 'Videos'},
          {name: 'Templates',view: 'Templates'},
          {name: 'Real Experiences',view: 'Experiences'},
          {name: 'Memes',view: 'Memes'},
          {name: 'Stories',view: 'Stories'},
      ],
    }
  },
  components: {
    Menus,
    Tab,
  },
}
</script>
