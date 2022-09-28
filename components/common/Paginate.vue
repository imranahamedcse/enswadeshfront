<template>
    <div>
        <ul v-if="totalPages > 1" class="md:my-6 my-3 sm:h-10 h-8 flex flex-wrap justify-center">
            <li>
                <button type="button"  @click="onClickPreviousPage" :disabled="isInFirstPage" class="border border-gray-1 h-full sm:w-10 w-8 sm:mx-2 mx-1 rounded">
                    <img src="~/assets/icons/back.png" alt="Icon">
                </button>
            </li>
            <li v-for="page in pages" :key="page.name">
                <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ 'bg-green-4 text-white': isPageActive(page.name) }" class="border border-gray-1 h-full sm:w-10 w-8 sm:mx-2 mx-1 rounded">
                    {{ page.name }}
                </button>
            </li>
            <li>
                <button type="button"  @click="onClickNextPage" :disabled="isInLastPage" class="border border-gray-1 h-full sm:w-10 w-8 sm:mx-2 mx-1 rounded">
                    <img src="~/assets/icons/next.png" alt="Icon">
                </button>
            </li>
        </ul>
        <ul v-else></ul>

    </div>
</template>
<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      if(this.currentPage === 1){
        return this.currentPage - 0;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }

}
</script>
