// 'prepareClinicList' function creates and returns
// a data structure with the following format to
// be used by v-autocomplete to display a list
// of clinics for user to choose:
//
// clinics: [
//   { header: 'Pahang' },
//   { name: 'KK Maran', value: 'kk_maran', group: 'Maran' },
//   { name: 'KK Bandar Jengka', value: 'kk_bandar_jengka', group: 'Maran' },
//   { name: 'KK Jengka 2', value: 'kk_jengka2', group: 'Maran' },
//   { name: 'KK Jengka 22', value: 'kk_jengka22', group: 'Maran' },
//   { divider: true },
//   { header: 'Selangor' },
//   { name: 'KK Bandar Botanik', value: 'kk_bandar_botanik', group: 'Klang' },
//   { name: 'KK Pandamaran', value: 'kk_pandamaran', group: 'Klang' },
//   { name: 'KK Shah Alam', value: 'kk_shah_alam', group: 'Klang' },
//   { name: 'KK Port Klang', value: 'kk_port_klang', group: 'Klang' }
// ]
function prepareClinicList (clinicsDir) {
  const clinicsOutput = []

  for (let i = 0; i < clinicsDir.states.length; i++) {
    const state = clinicsDir.states[i].name
    const districts = clinicsDir.states[i].districts

    clinicsOutput.push({ header: state })

    if (districts === null) {
      if (i !== (clinicsDir.states.length - 1)) {
        clinicsOutput.push({ divider: true })
      }
      continue
    }

    for (let j = 0; j < districts.length; j++) {
      const district = districts[j].name
      const clinics = districts[j].clinics

      if (clinics === null) { continue }

      for (let k = 0; k < clinics.length; k++) {
        const clinicMeta = clinics[k].id + ':' + clinics[k].name + ':' + district + ':' + state
        clinicsOutput.push({
          name: clinics[k].name, value: clinicMeta, group: district
        })
      }
    }

    if (i !== (clinicsDir.states.length - 1)) {
      clinicsOutput.push({ divider: true })
    }
  }

  return clinicsOutput
}

export default {

  async getAllClinics ({ commit }) {
    const { data } = await this.$axios.get('http://localhost:8082/allclinics')
    const clinics = prepareClinicList(data)
    commit('SET_ALL_CLINICS', clinics)
  }

  // getAllClinics ({ commit }) {
  //   // alert('Helo world')
  //   this.$axios.get('http://localhost:8082/allclinics')
  //     .then((response) => {
  //       alert(response.data)
  //       const clinics = prepareClinicList(response.data)
  //       commit('SET_ALL_CLINICS', clinics)
  //     })
  // }

}
