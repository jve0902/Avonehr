"use strict";

const { body, check, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "search": {
      return [
        check("data.text").exists().withMessage("text can not be empty!"),
      ];
    }
    case "adminNoteupdate": {
      return [
        check("data.admin_note")
          .exists()
          .withMessage("admin_note can not empty!"),
        check("data.old_admin_note")
          .exists()
          .withMessage("old_admin_note can not empty!"),
        param("id").isInt().withMessage("Must be an integer!"),
      ];
    }
    case "singleForm": {
      return [param("id").isInt().withMessage("Must be an integer!")];
    }
    case "handoutDelete": {
      return [param("id").isInt().withMessage("Must be an integer!")];
    }
    case "CreatePatientHandouts": {
      return [
        check("data.patient_id")
          .exists()
          .withMessage("patient_id can not empty!"),
        check("data.handout_id")
          .exists()
          .withMessage("handout_id can not empty!"),
      ];
    }
    case "DeletePatientHandouts": {
      return [
        param("patient_id")
          .isInt()
          .withMessage("patient_id must be an integer!"),
        param("handout_id")
          .isInt()
          .withMessage("handout_id must be an integer!"),
      ];
    }
    case "deleteAllergy": {
      return [
        param("patient_id")
          .isInt()
          .withMessage("patient_id must be an integer!"),
        param("drug_id").isInt().withMessage("drug_id must be an integer!"),
      ];
    }
  }
};
