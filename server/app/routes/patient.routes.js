"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Patient = require("../controllers/patient.controller.js");
const validation = require("./../helpers/validations/patient.js");
const router = express.Router();

router.get("/patient/:patient_id", [authJwt.verifyToken], Patient.getPatient);
router.post(
  "/patient/:patient_id/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.search
);
router.get(
  "/patient/:patient_id/history",
  [authJwt.verifyToken],
  Patient.history
);
router.get(
  "/patient/:patient_id/balance",
  [authJwt.verifyToken],
  Patient.balance
);
router.get(
  "/patient/:patient_id/next-appointment",
  [authJwt.verifyToken],
  Patient.nextAppointment
);
router.get(
  "/patient/:patient_id/admin-note/history",
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
  "/patient/:patient_id/patient-handout/:handout_id",
  [authJwt.verifyToken, validation.validate("DeletePatientHandouts")],
  Patient.DeletePatientHandouts
);
router.get(
  "/patient/:patient_id/billing",
  [authJwt.verifyToken],
  Patient.getBilling
);
router.get(
  "/patient/:patient_id/allergies",
  [authJwt.verifyToken],
  Patient.getAllergies
);
router.delete(
  "/patient/:patient_id/allergies/:drug_id",
  [authJwt.verifyToken, validation.validate("deleteAllergy")],
  Patient.deleteAllergy
);
router.post(
  "/allergies/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.searchAllergies
);
router.post(
  "/patient/:patient_id/allergies",
  [authJwt.verifyToken, validation.validate("createPatientAllergy")],
  Patient.createPatientAllergy
);
router.get(
  "/patient/:patient_id/documents/",
  [authJwt.verifyToken],
  Patient.getDocuments
);
router.put(
  "/patient/:id/documents/:id/status/:type",
  [authJwt.verifyToken],
  Patient.updateDocuments
);
router.get(
  "/patient/:patient_id/documents/check",
  [authJwt.verifyToken],
  Patient.checkDocument
);
router.post(
  "/patient/:patient_id/documents",
  [authJwt.verifyToken],
  Patient.createDocuments
);
router.get(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  Patient.getEncounters
);
router.get(
  "/patient/:patient_id/medical-notes/history",
  [authJwt.verifyToken],
  Patient.getMedicalNotesHistory
);
router.put(
  "/patient/:patient_id/medical-notes/history/",
  [authJwt.verifyToken],
  Patient.medicalNotesHistoryUpdate
);
router.get(
  "/patient/:patient_id/messages",
  [authJwt.verifyToken],
  Patient.getMessages
);
router.post(
  "/patient/:patient_id/messages",
  [authJwt.verifyToken],
  Patient.createMessage
);
router.delete(
  "/patient/:patient_id/messages/:id",
  [authJwt.verifyToken],
  Patient.deleteMessage
);
router.get(
  "/patient/:patient_id/all-tests",
  [authJwt.verifyToken],
  Patient.getAllTests
);
router.get(
  "/patient/:patient_id/diagnoses",
  [authJwt.verifyToken],
  Patient.getDiagnoses
);
router.put(
  "/diagnoses/:encounter_id/:icd_id",
  [authJwt.verifyToken],
  Patient.updateDiagnose
);
router.delete(
  "/diagnoses/:encounter_id/:icd_id",
  [authJwt.verifyToken],
  Patient.deleteDiagnose
);
router.post(
  "/patient/:patient_id/diagnoses",
  [authJwt.verifyToken],
  Patient.createDiagnoses
);
router.get(
  "/patient/:patient_id/medications",
  [authJwt.verifyToken],
  Patient.getMedications
);
router.delete(
  "/medications/:encounter_id/:drug_id/:drug_strength_id",
  [authJwt.verifyToken],
  Patient.deleteMedications
);
router.get(
  "/requisitions/:encounter_id",
  [authJwt.verifyToken],
  Patient.getRequisitions
);
router.post(
  "/patient/:patient_id/requisitions",
  [authJwt.verifyToken],
  Patient.createRequisitions
);
router.delete(
  "/requisitions/:encounter_id/:cpt_id",
  [authJwt.verifyToken],
  Patient.deleteRequisitions
);

router.get(
  "/patient-layout/:user_id",
  [authJwt.verifyToken],
  Patient.getLayout
);

router.post(
  "/patient-layout/:user_id",
  [authJwt.verifyToken],
  Patient.saveLayout
);

router.delete(
  "/patient-layout/:user_id",
  [authJwt.verifyToken],
  Patient.deleteLayout
);

module.exports = router;
