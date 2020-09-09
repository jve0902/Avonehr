"use strict";

const { body, check, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
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
  }
};
