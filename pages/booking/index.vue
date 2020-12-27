<template>
  <v-container
    fluid
    fill-height
  >
    <booking />
  </v-container>
</template>

<script>
import Booking from '@/components/adv/Booking'

export default {

  components: {
    Booking
  },

  middleware: ['token']

}
</script>
