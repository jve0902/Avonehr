"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * get appointment types
 * @param {object} req
 * @param {object} res
 * @returns {object} appointment types array
 */
const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const rows = await db.query(
      "select at.id, at.appointment_type, at.appointment_name_portal, at.length, at.allow_patients_schedule, at.sort_order, at.note, at.active, at.client_id, at.created, concat(u.firstname, ' ', u.lastname) created_user, at.updated, concat(u2.firstname, ' ', u2.lastname) updated_user from appointment_type at left join user u on u.id=at.created_user_id left join user u2 on u2.id=at.updated_user_id where at.client_id=1 order by at.appointment_type limit 100"
    );
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = "No appointment types found.";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = "Operation was not successful for Appointment types.";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const appointmentTypes = {
  getAll,
};

module.exports = appointmentTypes;
