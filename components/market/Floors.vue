<template>
  <div>
    <div
      class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-4 grid-cols-3 gap-1"
    >
      <div v-for="(floor, i) in floors" :key="i">
        <div
          @click="floorId(floor.id, floor.floor, i)"
          :class="i == floorAcitve ? 'bg-green-3' : ''"
          class="border cursor-pointer border-gray-3 bg-white hover:bg-green-3 rounded-lg text-center p-1 delay-100"
        >
          <p>{{ floor.shop_count }} Shops</p>
          <p class="font-semibold">{{ floor.floor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      floorAcitve: 0,
    }
  },

  props: ['total_floors', 'floors'],

  methods: {
    floorId(id, floor, i) {
      this.$emit('floorId', id, floor)
      this.$store.dispatch('floorserchid/getFloorId', id)
      this.floorAcitve = i
      localStorage.setItem('floor-url', '/shops/shops-by-market-by-floors/'+id);
    },
  },
}
</script>
