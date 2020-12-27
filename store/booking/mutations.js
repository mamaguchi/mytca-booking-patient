export default {
  SET_CLINIC (state, clinic) {
    state.clinic = clinic
  },
  SET_ALL_CLINICS (state, allClinics) {
    state.clinics = allClinics
  },
  SET_SELECTED_SVC (state, selectedSvc) {
    state.selectedService = selectedSvc
  },
  SET_IS_FUNDO_AVAI (state, isFundoAvai) {
    state.isFundoAvai = isFundoAvai
  },
  SET_IS_XRAY_AVAI (state, isXrayAvai) {
    state.isXrayAvai = isXrayAvai
  }
}
