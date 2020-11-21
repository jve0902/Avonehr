import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER,
  SET_EDITOR_TEXT,
  RESET_EDITOR_TEXT,

  // Setters
  SET_PATIENT_ID,
  SET_PATIENT_INFO,
  SET_PATIENT_HISTORY,
  SET_ADMIN_NOTES,
  SET_FORMS,
  SET_BILLING,
  SET_BALANCE,
  SET_ALLERGIES,
  SET_HANDOUTS,
  SET_ENCOUNTERS,
  SET_MEDICAL_NOTES,
  SET_MESSAGES,
  SET_MEDICATIONS,
  SET_DIAGNOSES,
  SET_DIAGNOSES_STATUS,
  SET_REQUISITIONS,
  SET_DOCUMENTS,
  SET_TESTS,

  // Togglers
  TOGGLE_PATIENT_INFO_EDIT_DIALOG,
  TOGGLE_PATIENT_INFO_HISORY_DIALOG,
  TOGGLE_ADMIN_NOTES_EDIT_FORM,
  TOGGLE_ADMIN_NOTES_HISTORY_DIALOG,
  TOGGLE_FORM_EXPAND_DIALOG,
  TOGGLE_FORM_VIEW_DIALOG,
  TOGGLE_BILLING_NEW_TRANSACTION_DIALOG,
  TOGGLE_BILLING_NEW_DIALOG,
  TOGGLE_BILLING_EXPAND_DIALOG,
  TOGGLE_ALLERGIES_NEW_DIALOG,
  TOGGLE_ALLERGIES_EXPAND_DIALOG,
  TOGGLE_HANDOUTS_NEW_DIALOG,
  TOGGLE_HANDOUTS_EXPAND_DIALOG,
  TOGGLE_ENCOUNTERS_NEW_DIALOG,
  TOGGLE_ENCOUNTERS_EXPAND_DIALOG,
  TOGGLE_MEDICAL_NOTES_HISTORY_DIALOG,
  TOGGLE_MEDICAL_NOTES_EDIT_FORM,
  TOGGLE_MESSAGES_NEW_DIALOG,
  TOGGLE_MESSAGES_EXPAND_DIALOG,
  TOGGLE_MEDICATION_NEW_DIALOG,
  TOGGLE_MEDICATION_EXPAND_DIALOG,
  TOGGLE_DIAGNOSES_NEW_DIALOG,
  TOGGLE_DIAGNOSES_EXPAND_DIALOG,
  TOGGLE_REQUISITIONS_NEW_DIALOG,
  TOGGLE_REQUISITIONS_EXPAND_DIALOG,
  TOGGLE_DOCUMENTS_EXPAND_DIALOG,
  TOGGLE_TESTS_EXPAND_DIALOG,
} from "./types";


export const setEncounter = (encounter) => ({
  type: SET_SELECTED_ENCOUNTER,
  payload: encounter,
});

export const resetEncounter = () => ({
  type: RESET_SELECTED_ENCOUNTER,
});


export const setEditorText = (value) => ({
  type: SET_EDITOR_TEXT,
  payload: value,
});

export const resetEditorText = () => ({
  type: RESET_EDITOR_TEXT,
});

// data setters starts here
export const setPatientId = (data) => ({
  type: SET_PATIENT_ID,
  payload: data,
});

export const setPatientData = (data) => ({
  type: SET_PATIENT_INFO,
  payload: data,
});

export const setPatientHistory = (data) => ({
  type: SET_PATIENT_HISTORY,
  payload: data,
});

export const setAdminNotes = (data) => ({
  type: SET_ADMIN_NOTES,
  payload: data,
});

export const setForms = (data) => ({
  type: SET_FORMS,
  payload: data,
});

export const setHandouts = (data) => ({
  type: SET_HANDOUTS,
  payload: data,
});

export const setDocuments = (data) => ({
  type: SET_DOCUMENTS,
  payload: data,
});

export const setEncounters = (data) => ({
  type: SET_ENCOUNTERS,
  payload: data,
});

export const setMedicalNotes = (data) => ({
  type: SET_MEDICAL_NOTES,
  payload: data,
});

export const setAllergies = (data) => ({
  type: SET_ALLERGIES,
  payload: data,
});

export const setMessages = (data) => ({
  type: SET_MESSAGES,
  payload: data,
});

export const setRequisitions = (data) => ({
  type: SET_REQUISITIONS,
  payload: data,
});

export const setTests = (data) => ({
  type: SET_TESTS,
  payload: data,
});

export const setDiagnoses = (data) => ({
  type: SET_DIAGNOSES,
  payload: data,
});

export const setMedications = (data) => ({
  type: SET_MEDICATIONS,
  payload: data,
});

export const setBilling = (data) => ({
  type: SET_BILLING,
  payload: data,
});

export const setBalance = (data) => ({
  type: SET_BALANCE,
  payload: data,
});

// dialog togglers starts here
export const togglePatientInfoDialog = () => ({
  type: TOGGLE_PATIENT_INFO_EDIT_DIALOG,
});

export const togglePatientHistoryDialog = () => ({
  type: TOGGLE_PATIENT_INFO_HISORY_DIALOG,
});

export const toggleAdminFormDialog = () => ({
  type: TOGGLE_ADMIN_NOTES_EDIT_FORM,
});

export const toggleAdminHistoryDialog = () => ({
  type: TOGGLE_ADMIN_NOTES_HISTORY_DIALOG,
});

export const toggleFormsExpandDialog = () => ({
  type: TOGGLE_FORM_EXPAND_DIALOG,
});

export const toggleFormsViewDialog = () => ({
  type: TOGGLE_FORM_VIEW_DIALOG,
});

export const toggleNewTransactionDialog = () => ({
  type: TOGGLE_BILLING_NEW_TRANSACTION_DIALOG,
});

export const togglePaymentDialog = () => ({
  type: TOGGLE_BILLING_NEW_DIALOG,
});

export const toggleBillngExpandDialog = () => ({
  type: TOGGLE_BILLING_EXPAND_DIALOG,
});

export const toggleAllergyDialog = () => ({
  type: TOGGLE_ALLERGIES_NEW_DIALOG,
});

export const toggleAllergyExpandDialog = () => ({
  type: TOGGLE_ALLERGIES_EXPAND_DIALOG,
});

export const toggleHandoutsDialog = () => ({
  type: TOGGLE_HANDOUTS_NEW_DIALOG,
});

export const toggleHandoutsExpandDialog = () => ({
  type: TOGGLE_HANDOUTS_EXPAND_DIALOG,
});

export const toggleEncountersDialog = () => ({
  type: TOGGLE_ENCOUNTERS_NEW_DIALOG,
});

export const toggleEncountersExpandDialog = () => ({
  type: TOGGLE_ENCOUNTERS_EXPAND_DIALOG,
});

export const toggleMedicalNotesDialog = () => ({
  type: TOGGLE_MEDICAL_NOTES_HISTORY_DIALOG,
});

export const toggleMedicalNotesFormDialog = () => ({
  type: TOGGLE_MEDICAL_NOTES_EDIT_FORM,
});

export const toggleMessageDialog = () => ({
  type: TOGGLE_MESSAGES_NEW_DIALOG,
});

export const toggleMessageExpandDialog = () => ({
  type: TOGGLE_MESSAGES_EXPAND_DIALOG,
});

export const toggleMedicationDialog = () => ({
  type: TOGGLE_MEDICATION_NEW_DIALOG,
});

export const toggleMedicationExpandDialog = () => ({
  type: TOGGLE_MEDICATION_EXPAND_DIALOG,
});

export const toggleDiagnosesDialog = () => ({
  type: TOGGLE_DIAGNOSES_NEW_DIALOG,
});

export const toggleDiagnosesExpandDialog = () => ({
  type: TOGGLE_DIAGNOSES_EXPAND_DIALOG,
});

export const setDiagnosesStatus = (status) => ({
  type: SET_DIAGNOSES_STATUS,
  payload: status,
});

export const toggleRequisitionDialog = () => ({
  type: TOGGLE_REQUISITIONS_NEW_DIALOG,
});

export const toggleRequisitionExpandDialog = () => ({
  type: TOGGLE_REQUISITIONS_EXPAND_DIALOG,
});

export const toggleDocumentsExpandDialog = () => ({
  type: TOGGLE_DOCUMENTS_EXPAND_DIALOG,
});

export const toggleTestsExpandDialog = () => ({
  type: TOGGLE_TESTS_EXPAND_DIALOG,
});
