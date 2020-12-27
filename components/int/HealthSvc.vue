<template>
  <div>
    <!-- <v-container> -->
    <v-btn-toggle
      v-model="selectedService"
      tile
      color="success"
      group
      dense
      class="ml-16"
      @change="serviceSelected"
    >
      <v-row dense class="d-flex flex-wrap mx-16 px-16">
        <v-col cols="12">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Fever
          </div>
        </v-col>

        <v-col v-for="svc in feverSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Respiratory
          </div>
        </v-col>

        <v-col v-for="svc in respiratorySvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Non-Respiratory
          </div>
        </v-col>

        <v-col v-for="svc in nonrespiratorySvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Chronic Condition
          </div>
        </v-col>

        <v-col v-for="svc in chronicConditionSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Procedure
          </div>
        </v-col>

        <v-col v-for="svc in procedureSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Imaging
          </div>
        </v-col>

        <v-col v-for="svc in imagingSvcIcons" :key="svc.value" cols="auto">
          <v-btn :disabled="!svc.isAvailable" :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Counselling
          </div>
        </v-col>

        <v-col v-for="svc in counsellingSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Screening
          </div>
        </v-col>

        <v-col v-for="svc in screeningSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Women, Mothers and Children
          </div>
        </v-col>

        <v-col v-for="svc in mchSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>

        <v-col cols="12 mt-4">
          <div class="text-left deep-orange--text text--darken-4 text-body-2 mt-2">
            Misc.
          </div>
        </v-col>

        <v-col v-for="svc in miscSvcIcons" :key="svc.value" cols="auto">
          <v-btn :value="svc.value" large :color="selectedService===svc.value ? 'success':'white'">
            <v-avatar left tile size="36">
              <img :src="svc.img">
            </v-avatar>
            <span class="pl-2">{{ svc.name }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-btn-toggle>
  <!-- </v-container> -->
  </div>
</template>

<script>
export default {
  name: 'HealthSvc',

  data () {
    return {
      firstTimeServiceSelected: true,
      //   selectedService: this.$store.state.booking.selectedService,

      feverSvcIcons: [
        { name: 'Fever', value: 'fever', img: '/Medical/Fever/fever2.svg' }
      ],
      respiratorySvcIcons: [
        { name: 'Cough/Runny Nose', value: 'urti', img: '/Medical/URTI/sneeze.svg' },
        { name: 'Asthma', value: 'asthma', img: '/Medical/Asthma/asthma.svg' },
        { name: 'Tuberculosis', value: 'tuberculosis', img: '/Medical/Tuberculosis/tuberculosis.svg' }
      ],
      nonrespiratorySvcIcons: [
        { name: 'Abdominal Discomfort', value: 'abdDiscomfort', img: '/Medical/AbdDiscomfort/cramps.svg' },
        { name: 'Vomiting/Diarrhoea', value: 'age', img: '/Medical/AGE/vomit.svg' }
      ],
      chronicConditionSvcIcons: [
        { name: 'Diabetes', value: 'diabetes', img: '/Medical/Diabetes/sugar-blood-level2.svg' },
        { name: 'Hypertension', value: 'hypertension', img: '/Medical/Hypertension/arm_blood_pressure.svg' },
        { name: 'PSY', value: 'psy', img: '/Medical/Psy/mental_health.svg' },
        { name: 'Quit Smoking Clinic', value: 'kbm', img: '/Medical/QuitSmoking/quit_smoking.svg' },
        { name: 'Methadone', value: 'methadone', img: '/Medical/DrugAddiction/methadone.svg' }
      ],
      procedureSvcIcons: [
        { name: 'Blood Taking', value: 'bloodTaking', img: '/Medical/BloodTaking/arm_blood_taking.svg' },
        { name: 'Wound Care', value: 'woundCare', img: '/Medical/WoundCare/wound.svg' }
      ],
      imagingSvcIcons: [
        { isAvailable: false, name: 'Fundoscopy', value: 'fundoscopy', img: '/Medical/EyeExamination/slit-lamp.svg' },
        { isAvailable: false, name: 'X-Ray', value: 'x-ray', img: '/Medical/Xray/xray.svg' }
      ],
      counsellingSvcIcons: [
        { name: 'Diet Counselling', value: 'dietCounselling', img: '/Medical/DietCounseling/food_pyramid.svg' }
      ],
      screeningSvcIcons: [
        { name: 'Pre-marital Screening', value: 'premaritalScreening', img: '/Medical/FamilyPlanning/wedding-rings.svg' },
        { name: 'Medical Checkup', value: 'medicalCheckup', img: '/Medical/MedicalCheckup/med_examination.svg' }
      ],
      mchSvcIcons: [
        { name: 'Antenatal Booking', value: 'antenatalBooking', img: '/Medical/Pregnancy/pregnancy_test.svg' },
        { name: 'Antenatal Follow-up', value: 'antenatalFUp', img: '/Medical/Pregnancy/ultrasonography.svg' },
        { name: 'Postnatal 1 Month', value: 'postnatal1Mth', img: '/Medical/FamilyPlanning/mother_and_baby.svg' },
        { name: 'Family Planning', value: 'familyPlanning', img: '/Medical/FamilyPlanning/family.svg' },
        { name: 'Pap Smear', value: 'papSmear', img: '/Medical/PapSmear/uterus.svg' },
        { name: 'Immunization', value: 'immunization', img: '/Medical/Immunization/immunization.svg' }
      ],
      miscSvcIcons: [
        { name: 'Other Problems', value: 'otherProblems', img: '/Medical/Ill/ill2.svg' }
      ]
    }
  },

  computed: {
    isFundoAvai () {
      return this.$store.getters['booking/getIsXrayAvai']
    },

    isXrayAvai () {
      return this.$store.getters['booking/getIsXrayAvai']
    },

    selectedService: {
      get () {
        return this.$store.getters['booking/getSelectedService']
      },
      set (newVal) {
        this.$store.commit('booking/SET_SELECTED_SVC', newVal)
      }
    }
  },

  watch: {
    isFundoAvai (newVal) {
      this.imagingSvcIcons[0].isAvailable = newVal
    },

    isXrayAvai (newVal) {
      this.imagingSvcIcons[1].isAvailable = newVal
    }
  },

  methods: {
    serviceSelected () {
      if (this.firstTimeServiceSelected && this.selectedService !== '') {
        this.firstTimeServiceSelected = false
        this.$emit('service:selected')
      }
    }
  }
}
</script>
