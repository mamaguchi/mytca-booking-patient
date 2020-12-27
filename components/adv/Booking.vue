<template>
  <v-container
    fluid
    fill-height
  >
    <v-row justify="center">
      <div class="text-center text-h1 font-weight-bold ml-6">
        <span class="blue--text text--lighten-1">m</span><span class="blue--text text--lighten-2">y</span><span class="blue--text text--lighten-1">TCA</span>
      </div>

      <div class="text-center text-h4 font-weight-regular mt-12 ml-4">
        <span class="red--text text--darken-4">Booking</span>
      </div>
    </v-row>

    <!-- SELECT A CLINIC  -->
    <v-row justify="center" class="mx-3">
      <v-col cols="12" sm="6" md="4">
        <v-autocomplete
          v-model="clinic"
          :items="clinics"
          outlined
          label="Select klinik kesihatan"
          item-text="name"
          item-value="value"
          @change="clinicSelected"
        >
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium" v-text="data.item.name" />
              <v-list-item-subtitle class="caption" v-text="data.item.group" />
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>

    <!-- SELECT A SERVICE  -->
    <v-row id="selectService" justify="center">
      <div v-if="clinic">
        <v-divider />
        <div class="text-center text-h6 my-6">
          Select a service
        </div>
        <health-svc @service:selected="serviceSelected" />
      </div>
    </v-row>

    <!-- SELECT AN APPOINTMENT DATE  -->
    <v-row id="apptDatePicker" justify="center">
      <v-col cols="12">
        <div v-if="selectedService">
          <v-divider class="mt-10" />
          <div class="text-center text-h6 my-6">
            Pick a date
          </div>
          <v-row justify="center">
            <v-date-picker
              v-model="date"
              elevation="2"
              :allowed-dates="checkAllowedDates"
              @click:date="getClinicSvcBookings"
              @change="dateSelected"
            />
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- SELECT AN APPOINTMENT TIME -->
    <v-row id="apptSchedule" justify="center">
      <v-col cols="12">
        <div v-if="selectedService && date">
          <br>
          <v-divider />
          <div class="text-center text-h6 mt-6">
            Appointment schedule on {{ date }}
          </div>
          <div class="text-center deep-orange--text text--darken-4 text-body-2 mt-2 mb-6">
            Book a date here for your next appointment
          </div>
        </div>

        <div v-if="selectedService && date && queuesUsgPerDay.length!==0">
          <svc-schedule
            :op-hr-displays="opHrDisplays"
            :service-day-of-week="serviceDayOfWeek"
            :queues-usg-pct="queuesUsgPct"
            :user-id="userId"
            :clinic-id="selectedClinicMeta.clinicId"
            :clinic-name="selectedClinicMeta.clinicName"
            :selected-service="selectedService"
            :date="date"
            @refresh:bookings="getClinicSvcBookings(date)"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from 'qs'
import * as AdmPgFuncs from '@/utils/functions/AdminPageFuncs'
import { mapGetters } from 'vuex'
import HealthSvc from '@/components/int/HealthSvc'
import SvcSchedule from '@/components/int/SvcSchedule'

export default {
  name: 'Booking',

  components: {
    HealthSvc,
    SvcSchedule
  },

  data () {
    return {
      userId: '880601105151', // TODO: To use session UserId instead
      firstTimeClinicSelected: true,
      firstTimeDateSelected: true,
      date: '',
      startOpHrs: [],
      endOpHrs: [],
      clinicPubHol: [],
      svcAvaiDays: [],
      svcStartOpHrs: [],
      svcEndOpHrs: [],
      opHrDisplays: [],
      serviceDayOfWeek: undefined,
      queuesCapPerDay: [],
      queuesUsgPerDay: [],
      dailyOpSchedules: ''
    }
  },

  computed: {
    ...mapGetters('booking', {
      clinics: 'getAllClinics',
      selectedService: 'getSelectedService'
    }),

    clinic: {
      get () {
        return this.$store.getters['booking/getClinic']
      },
      set (newVal) {
        this.$store.commit('booking/SET_CLINIC', newVal)
        this.updateAvaiSvcs()
      }
    },

    selectedClinicMeta () {
      const tmp = this.clinic.split(':')
      const clinicData = {}
      clinicData.clinicId = tmp[0]
      clinicData.clinicName = tmp[1]
      clinicData.district = tmp[2]
      clinicData.state = tmp[3]
      clinicData.service = this.selectedService
      return clinicData
    },

    queuesUsgPct () {
      const tmp = []
      if (this.queuesUsgPerDay === null) { return }
      for (let i = 0; i < this.queuesUsgPerDay.length; i++) {
        tmp.push(this.queuesUsgPerDay[i] / this.queuesCapPerDay[i] * 100)
      }
      return tmp
    }
  },

  watch: {
    selectedClinicMeta (val) {
      this.getClinicSvcOpHrs()
    }
  },

  beforeMount () {
    this.$store.dispatch('booking/getAllClinics')
  },

  methods: {
    async updateAvaiSvcs () {
      const payload = {}
      payload.clinicId = this.selectedClinicMeta.clinicId
      payload.district = this.selectedClinicMeta.district
      payload.state = this.selectedClinicMeta.state
      const payloadData = qs.stringify(payload)
      const { data } = await this.$axios.post('http://localhost:8082/checkservice', payloadData)

      const svcsChecked = data.svcsChecked
      svcsChecked.map((val) => {
        if (val.svcName === 'fundoscopy') {
          this.$store.commit('booking/SET_IS_FUNDO_AVAI', val.ifExist)
        } else if (val.svcName === 'x-ray') {
          this.$store.commit('booking/SET_IS_XRAY_AVAI', val.ifExist)
        }
      })
    },

    clinicSelected () {
      if (this.firstTimeClinicSelected) {
        document.querySelector('#selectService').scrollIntoView({ behavior: 'smooth', block: 'center' })
        this.firstTimeClinicSelected = false
      }
    },

    serviceSelected () {
      document.querySelector('#apptDatePicker').scrollIntoView({ behavior: 'smooth', block: 'center' })
    },

    dateSelected () {
      if (this.firstTimeDateSelected) {
        document.querySelector('#apptSchedule').scrollIntoView({ behavior: 'smooth', block: 'center' })
        this.firstTimeDateSelected = false
      }
    },

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

    async getClinicSvcOpHrs () {
      if (this.selectedService === '') { return }
      const payloadData = qs.stringify(this.selectedClinicMeta)
      const { data } = await this.$axios.post('http://localhost:8082/serviceophours', payloadData)

      this.clinicPubHol = AdmPgFuncs.parsePubHol(data.clinicPublicHoliday)
      this.svcAvaiDays = AdmPgFuncs.processOperatingDays(data.avaiDays)

      const svcStartHrs = data.startHrs.split(',').map(val => (parseInt(val)))
      const svcEndHrs = data.endHrs.split(',').map(val => (parseInt(val)))

      this.opHrDisplays = [] // operating hrs for the week
      for (let i = 0; i < svcStartHrs.length; i++) {
        const svcStartHr = svcStartHrs[i]
        const svcEndHr = svcEndHrs[i]
        const opHrDisplay = []
        let ampm = ' am'

        for (let k = 0, j = svcStartHr; j < svcEndHr; k++, j++) {
          if (j >= 12) { ampm = ' pm' }
          if (j > 12) {
            opHrDisplay[k] = {}
            opHrDisplay[k].idx = j
            opHrDisplay[k].time = (j - 12).toString() + ampm + ' - '
          } else {
            opHrDisplay[k] = {}
            opHrDisplay[k].idx = j
            opHrDisplay[k].time = j.toString() + ampm + ' - '
          }

          if ((j + 1) === 12) { ampm = ' pm' }
          if (j + 1 > 12) {
            opHrDisplay[k].time = opHrDisplay[k].time +
                                  (j + 1 - 12).toString() + ampm
          } else {
            opHrDisplay[k].time = opHrDisplay[k].time +
                                  (j + 1).toString() + ampm
          }
        }
        this.opHrDisplays.push([...opHrDisplay])
      }
    },

    async getClinicSvcBookings (date) {
      const payload = {}
      payload.clinicId = this.selectedClinicMeta.clinicId
      payload.service = this.selectedClinicMeta.service
      payload.date = date
      const payloadData = qs.stringify(payload)
      const { data } = await this.$axios.post('http://localhost:8082/servicebookings', payloadData)

      this.serviceDayOfWeek = data.dayOfWeek
      this.queuesCapPerDay = data.queuesCapPerDay
      this.queuesUsgPerDay = data.queuesUsgPerDay
    },

    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,

    checkAllowedDates (dateStr) {
      if (this.clinicPubHol.includes(dateStr)) {
        return false
      } else {
        const date = new Date(dateStr)
        const dayOfWeek = date.getDay()
        if (!this.svcAvaiDays.includes(dayOfWeek)) {
          return false
        }
      }
      return true
    }

  }
}
</script>
