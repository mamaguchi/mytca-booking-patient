<template>
  <div>
    <v-card v-for="opHr in opHrDisplays[serviceDayOfWeek]" :key="opHr.idx" class="mx-auto mt-9" max-width="600">
      <v-card-title>
        <span class="font-weight-bold">{{ opHr.time }}</span>
      </v-card-title>

      <v-card-subtitle>
        {{ DaysOfWeek[serviceDayOfWeek] }}
      </v-card-subtitle>

      <div class="mx-3">
        <v-progress-linear
          :value="queuesUsgPct[opHr.idx]"
          :color="getColor(queuesUsgPct[opHr.idx])"
          background-color="light-blue lighten-2"
          height="30"
        >
          <template v-slot="{ value }">
            <span class="text-h6 white--text">{{ Math.ceil(value) }}% booked</span>
          </template>
        </v-progress-linear>
      </div>

      <v-card-actions>
        <v-btn
          class="mx-auto mt-2"
          color="black"
          text
          outlined
          :disabled="queuesUsgPct[opHr.idx]===100"
          @click="makeBooking(opHr.idx)"
        >
          Book now
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <h1>{{ serviceDayOfWeek }}</h1> -->
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'SvcSchedule',

  props: {
    opHrDisplays: {
      type: Array,
      required: true
    },
    serviceDayOfWeek: {
      type: Number,
      required: true
    },
    queuesUsgPct: {
      type: Array,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    clinicId: {
      type: String,
      required: true
    },
    clinicName: {
      type: String,
      required: true
    },
    selectedService: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },

  data () {
    return {
    //   opHrDisplays: this.opHrDisplays,
    //   serviceDayOfWeek: this.serviceDayOfWeek,
    //   queuesUsgPct: this.queuesUsgPct,
    //   userId: this.userId,
    //   clinicId: this.clinicId,
    //   clinicName: this.clinicName,
    //   selectedService: this.selectedService,
    //   date: this.date,

      DaysOfWeek: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      }
    }
  },

  methods: {
    getColor (usgPct) {
      if (usgPct <= 50) {
        return 'blue lighten-1'
      } else if (usgPct <= 75) {
        return 'blue darken-1'
      } else if (usgPct <= 90) {
        return 'blue darken-2'
      } else {
        return 'blue darken-3'
      }
    },

    async makeBooking (opHourIndex) {
      const payload = {}
      payload.userId = this.userId
      payload.clinicId = this.clinicId
      payload.clinicName = this.clinicName
      payload.service = this.selectedService
      payload.date = this.date
      payload.opHrIdx = opHourIndex
      const payloadData = qs.stringify(payload)
      const { data } = await this.$axios.post('http://localhost:8082/book', payloadData)

      // TODO: upon completing a booking, update the booked
      //       usage on ViewModal data instead of making a http
      //       request to fetch the updated data from database server.
      alert(data.bookingRes)
      // this.getClinicSvcBookings(this.date)
      this.$emit('refresh:bookings')
    }
  }

}
</script>
