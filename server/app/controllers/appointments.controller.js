"use strict";
const { validationResult } = require("express-validator");
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
    const dbResponse = await db.query(
      "select at.id, at.appointment_type, at.appointment_name_portal, at.length, at.allow_patients_schedule, at.sort_order, at.note, at.active, at.client_id, at.created, concat(u.firstname, ' ', u.lastname) created_user, at.updated, concat(u2.firstname, ' ', u2.lastname) updated_user from appointment_type at left join user u on u.id=at.created_user_id left join user u2 on u2.id=at.updated_user_id where at.client_id=1 order by at.appointment_type limit 100"
    );

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

/**
 * Create appointment types
 * @param {object} req
 * @param {object} res
 * @returns {object} response array
 */
const create = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const db = makeDb(configuration, res);
  let appointment_type = req.body.data;
  appointment_type.created = new Date();

  try {
    const dbResponse = await db.query(
      "INSERT INTO appointment_type set ?",
      appointment_type
    );

    if (!dbResponse.insertId) {
      errorMessage.error = "Appointment Type Cannot be created!";
      res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "New Appointment type created successfully!";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = "Operation was not successful for Appointment types.";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

/**
 * Update appointment types
 * @param {object} req
 * @param {object} res
 * @returns {object} response array
 */
const update = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration, res);
  let appointment_type = req.body.data;

  appointment_type.updated = new Date();
  appointment_type.updated_user_id = req.params.userId;

  try {
    const updateResponse = await db.query(
      `UPDATE appointment_type SET ? WHERE id =${req.params.appointmentId}`,
      [appointment_type]
    );

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Appointment Type Cannot be updated!";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse;
    successMessage.message = "Appointment type updated successfully!";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // handle the error
    errorMessage.error = "Operation was not successful for Appointment types.";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

/**
 * Delete appointment types
 * @param {object} req
 * @param {object} res
 * @returns {object} response array
 */
const deleteAppointment = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(
      `DELETE FROM appointment_type WHERE id=${req.params.id}`
    );

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Appointment Type Cannot be deleted!";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteResponse;
    successMessage.message = "Appointment type deleted successfully!";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // handle the error
    errorMessage.error = "Operation was not successful for Appointment types.";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};
const appointmentTypes = {
  getAll,
  create,
  update,
  deleteAppointment,
};

module.exports = appointmentTypes;
