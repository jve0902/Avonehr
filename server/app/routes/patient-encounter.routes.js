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
  "/patient/:patient_id/encounters/diagnoses/recent-icds",
  [authJwt.verifyToken],
  PatientEncounter.getRecentDiagnoses
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/diagnoses/search-icds",
  [authJwt.verifyToken],
  PatientEncounter.searchDiagnosesICDs
);
router.post(
  "/patient/encounters/prescriptions/search-drug",
  [authJwt.verifyToken],
  PatientEncounter.searchDrug
);
router.get(
  "/patient/encounters/recent-prescriptions",
  [authJwt.verifyToken],
  PatientEncounter.getEncountersPrescriptions
);
router.get(
  "/patient/encounters/prescriptions/frequencies",
  [authJwt.verifyToken],
  PatientEncounter.getEncountersPrescriptionsFrequencies
);
router.get(
  "/patient/encounters/prescriptions/edit",
  [authJwt.verifyToken],
  PatientEncounter.encountersPrescriptionsEdit
);
router.get(
  "/patient/encounters/recent-profiles",
  [authJwt.verifyToken],
  PatientEncounter.encountersRecentProfiles
);
router.post(
  "/patient/:patient_id/encounters/:encounter_id/icd",
  [authJwt.verifyToken],
  PatientEncounter.createEncounter_ICD
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
