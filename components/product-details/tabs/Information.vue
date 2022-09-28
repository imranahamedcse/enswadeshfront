<template>
    <div>
      {{getProduct.description}}
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
