<template>
    <div>
        <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center my-12">
            <div @click="wait">
                <div v-if="product.total_stocks > 30" class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                    <div class="">
                        <p class="title text-center">Add To Festivals</p>
                        <form @submit.prevent="addToFestivaleSale">
                            <div class="p-6">
                              <div class="mb-4">
                                  <p class="h3 mb-2">Select start time:</p>
                                  <div class="grid grid-cols-2 gap-4">
                                      <div>
                                          <label class="input-label" for="start_date">Date (dd/mm/yyyy)</label>
                                          <input type="date" v-model="start_date" class="input-field focus:outline-none" placeholder="3/12/2021">
                                      </div>
                                      <div>
                                          <label class="input-label" for="start_date">Time (hh:mm am/pm)</label>
                                          <input type="time" v-model="start_time" class="input-field focus:outline-none" placeholder="12:00 am">
                                      </div>
                                  </div>
                              </div>
                              <div class="mb-6">
                                  <p class="h3 mb-2">Select end time:</p>
                                  <div class="grid grid-cols-2 gap-4">
                                      <div>
                                          <label class="input-label" for="start_date">Date (dd/mm/yyyy)</label>
                                          <input type="date" v-model="end_date" class="input-field focus:outline-none" placeholder="3/12/2021">
                                      </div>
                                      <div>
                                          <label class="input-label" for="start_date">Time (hh:mm am/pm)</label>
                                          <input type="time" v-model="end_time" class="input-field focus:outline-none" placeholder="12:00 am">
                                      </div>
                                  </div>
                              </div>
                              <div class="flex justify-center">
                                  <button type="submit" class="btn-border bg-green-3 focus:outline-none">Add To Festival</button>
                              </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- When quantity less then 30 then show this modal -->
                <div v-else class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                    <div class="cart-tems-center text-center">
                        <p class="title">Add To Flash Sales</p>
                        <div class="p-6">
                            <p class="mb-6">Sorry, You do not have sufficient quantity <br> to add this product in Flash Sales</p>
                            <p class="note">Note: You have to need minimum 30 quantity for flash sales</p>
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
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
        }
    },
    props:['product'],
    methods: {
      addToFestivaleSale()
      {
        var formData = new FormData()
        formData.append('product_id', this.product.id)
        formData.append('start_date', this.start_date)
        formData.append('start_time', this.start_time)
        formData.append('end_date', this.end_date)
        formData.append('end_time', this.end_time)

        this.$axios.post(`/api/products/add-to-festival`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
            this.$toast.success('Product Successfully Added to Festival Sale!');
            this.closeModal();
        })
        .catch((error) => {
            if(error.response.data.errors.product_id[0]){
              this.$toast.error('Oops..!- This Product already been added!' )
            }else {
              this.$toast.error('Oops..!- Something went wrong!' )
            }
          });
      },
      closeModal()
      {
          if(this.close_modal == 'modal')
          {
              this.$emit('addFestival');
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
