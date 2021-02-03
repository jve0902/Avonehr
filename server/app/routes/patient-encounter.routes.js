const express = require("express");
const { authJwt } = require("../middlewares");
const PatientEncounter = require("../controllers/patient-encounters.controller.js");

const router = express.Router();

/** encounters */
router.get(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  PatientEncounter.getEncounters
);
router.post(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  PatientEncounter.createEncounter
);
router.put(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken],
  PatientEncounter.updateEncounter
);
router.delete(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken],
  PatientEncounter.deleteEncounter
);
router.get(
  "/patient/:patient_id/encounter-types",
  [authJwt.verifyToken],
  PatientEncounter.getEncounterTypes
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/diagnoses",
  [authJwt.verifyToken],
  PatientEncounter.getDiagnoses
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/diagnoses/recent-icds",
  [authJwt.verifyToken],
  PatientEncounter.getRecentDiagnoses
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/diagnoses/search-icds",
  [authJwt.verifyToken],
  PatientEncounter.searchDiagnosesICDs
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/plan",
  [authJwt.verifyToken],
  PatientEncounter.getEncounterPlan
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescription/search",
  [authJwt.verifyToken],
  PatientEncounter.searchNewPrescriptionDrug
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescription/recent",
  [authJwt.verifyToken],
  PatientEncounter.getEncountersPrescriptions
);

// TODO:: Incomplete end point
router.get(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescriptions/edit",
  [authJwt.verifyToken],
  PatientEncounter.encountersPrescriptionsEdit
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescriptions/search/drug-type",
  [authJwt.verifyToken],
  PatientEncounter.searchDrugAndType
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescriptions/frequencies",
  [authJwt.verifyToken],
  PatientEncounter.getEncountersPrescriptionsFrequencies
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/plan/new-prescriptions/recent-profiles",
  [authJwt.verifyToken],
  PatientEncounter.encountersRecentProfiles
);

router.post(
  "/patient/encounters/prescriptions/search-drug",
  [authJwt.verifyToken],
  PatientEncounter.searchDrug
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/icd",
  [authJwt.verifyToken],
  PatientEncounter.createEncounter_ICD
);
router.get(
  "/patient/encounters/drug-order",
  [authJwt.verifyToken],
  PatientEncounter.getDrugOrder
);
router.get(
  "/patient/encounters/drug-order/prescriptions",
  [authJwt.verifyToken],
  PatientEncounter.getDrugOrderPrescriptions
);
router.get(
  "/patient/encounters/new-lab/diagnoses",
  [authJwt.verifyToken],
  PatientEncounter.getNewLabDiagnoses
);
router.get(
  "/patient/encounters/new-lab/test-ordered",
  [authJwt.verifyToken],
  PatientEncounter.getOrderedTests
);
router.delete(
  "/patient/encounters/new-lab/test-ordered/:id",
  [authJwt.verifyToken],
  PatientEncounter.deleteOrderedTests
);
router.get(
  "/patient/encounters/new-lab/laboratories",
  [authJwt.verifyToken],
  PatientEncounter.getNewLabLaboratories
);
router.get(
  "/patient/encounters/new-lab/favorites",
  [authJwt.verifyToken],
  PatientEncounter.getNewLabFavorites
);
router.post(
  "/patient/encounters/new-lab/search",
  [authJwt.verifyToken],
  PatientEncounter.getNewLabSearch
);
router.get(
  "/patient/encounters/new-lab/requested-labs",
  [authJwt.verifyToken],
  PatientEncounter.getNewLabRequestedLabs
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/billing",
  [authJwt.verifyToken],
  PatientEncounter.getBilling
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/billing/diagnoses",
  [authJwt.verifyToken],
  PatientEncounter.getBillingDiagnoses
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/billing/procedsures",
  [authJwt.verifyToken],
  PatientEncounter.getBillingProcedsures
);
router.get(
  "/patient/:patient_id/encounters/:encounter_id/billing/payment",
  [authJwt.verifyToken],
  PatientEncounter.getBillingPayment
);

module.exports = router;
