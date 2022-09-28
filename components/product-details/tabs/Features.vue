<template>
    <div>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="(feature, i) in getProduct.features" :key="i">
                <p>{{feature.title}} : {{feature.feature}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(
      'products', ['getProduct']
    )
  }
}
</script>
