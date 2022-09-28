<template>
    <div>
        {{getProductPreviewData.description}}
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters(
      'products', ['getProductPreviewData']
    )
  }

}
</script>
