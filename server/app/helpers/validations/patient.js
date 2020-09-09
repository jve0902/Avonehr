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
  }
};
