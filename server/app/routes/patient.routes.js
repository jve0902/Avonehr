"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Patient = require("../controllers/patient.controller.js");
const validation = require("./../helpers/validations/patient.js");
const router = express.Router();

router.get("/patient/:id", [authJwt.verifyToken], Patient.getPatient);
router.post(
  "/patient/:id/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.search
);
router.get("/patient/:id/history", [authJwt.verifyToken], Patient.history);
router.get(
  "/patient/:id/admin-note/history",
  [authJwt.verifyToken],
  Patient.AdminNotehistory
);
router.put(
  "/patient/:patient_id/admin-note/",
  [authJwt.verifyToken, validation.validate("adminNoteupdate")],
  Patient.adminNoteupdate
);
router.get(
  "/patient/:patient_id/forms",
  [authJwt.verifyToken],
  Patient.getForms
);
router.get(
  "/patient/:patient_id/forms/:id",
  [authJwt.verifyToken, validation.validate("singleForm")],
  Patient.getFormById
);
router.get(
  "/patient/:patient_id/handouts",
  [authJwt.verifyToken],
  Patient.handouts
);
router.delete(
  "/patient/:patient_id/handouts/:id",
  [authJwt.verifyToken, validation.validate("handoutDelete")],
  Patient.handoutDelete
);
router.get("/patient-handout", [authJwt.verifyToken], Patient.patientHandouts);
router.post(
  "/patient/:patient_id/patient-handout",
  [authJwt.verifyToken, validation.validate("CreatePatientHandouts")],
  Patient.CreatePatientHandouts
);
router.delete(
  "/patient/:patient_id/patient-handout//:handout_id",
  [authJwt.verifyToken, validation.validate("DeletePatientHandouts")],
  Patient.DeletePatientHandouts
);
router.get("/patient/billing", [authJwt.verifyToken], Patient.getBilling);
router.get("/patient/allergies", [authJwt.verifyToken], Patient.getAllergies);
router.delete(
  "/patient/allergies/:patient_id/:drug_id",
  [authJwt.verifyToken, validation.validate("deleteAllergy")],
  Patient.deleteAllergy
);
router.post(
  "/patient/allergies/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.searchAllergies
);
router.post(
  "/patient/allergies",
  [authJwt.verifyToken, validation.validate("createPatientAllergy")],
  Patient.createPatientAllergy
);
router.get(
  "/patient/documents/:patient_id",
  [authJwt.verifyToken],
  Patient.getDocuments
);
router.delete(
  "/patient/documents/:id",
  [authJwt.verifyToken],
  Patient.deleteDocuments
);
router.get(
  "/patient/documents/:patient_id/check",
  [authJwt.verifyToken],
  Patient.checkDocument
);
router.post(
  "/patient/documents",
  [authJwt.verifyToken],
  Patient.createDocuments
);
router.get(
  "/patient/encounters/:patient_id",
  [authJwt.verifyToken],
  Patient.getEncounters
);
router.get(
  "/patient/medical-notes/history",
  [authJwt.verifyToken],
  Patient.getMedicalNotesHistory
);
router.put(
  "/patient/medical-notes/history/:id",
  [authJwt.verifyToken],
  Patient.medicalNotesHistoryUpdate
);
router.get("/patient/messages", [authJwt.verifyToken], Patient.getMessages);
router.post("/patient/messages", [authJwt.verifyToken], Patient.createMessage);
router.delete(
  "/patient/messages/:id",
  [authJwt.verifyToken],
  Patient.deleteMessage
);
router.get(
  "/patient/all-tests/:patient_id",
  [authJwt.verifyToken],
  Patient.getAllTests
);
router.get(
  "/patient/diagnoses/:patient_id",
  [authJwt.verifyToken],
  Patient.getDiagnoses
);
router.put(
  "/patient/diagnoses/:encounter_id/:icd_id",
  [authJwt.verifyToken],
  Patient.updateDiagnose
);
router.delete(
  "/patient/diagnoses/:encounter_id/:icd_id",
  [authJwt.verifyToken],
  Patient.deleteDiagnose
);
router.post(
  "/patient/diagnoses/",
  [authJwt.verifyToken],
  Patient.createDiagnoses
);
router.get(
  "/patient/medications/:patient_id",
  [authJwt.verifyToken],
  Patient.getMedications
);
router.delete(
  "/patient/medications/:encounter_id/:drug_id/:drug_strength_id",
  [authJwt.verifyToken],
  Patient.deleteMedications
);
router.get(
  "/patient/requisitions/:encounter_id",
  [authJwt.verifyToken],
  Patient.getRequisitions
);
router.post(
  "/patient/requisitions",
  [authJwt.verifyToken],
  Patient.createRequisitions
);
router.delete(
  "/patient/requisitions/:encounter_id/:cpt_id",
  [authJwt.verifyToken],
  Patient.deleteRequisitions
);

module.exports = router;
