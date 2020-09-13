"use strict";
const { validationResult } = require("express-validator");
const moment = require("moment");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getHistory = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select e.created, e.message, concat(u.firstname, ' ', u.lastname) created_user, e.status, e.client_id
        from email_bulk_history e
        left join user u on u.id=e.created_user_id
        where e.client_id=${req.client_id}
        order by e.created desc 
        limit 50
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const deleteHistory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { date } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(
      `delete 
        from email_bulk_history
        where client_id=${req.client_id}
        and created='${date}'
      `
    );

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const appointmentTypes = {
  getHistory,
  deleteHistory,
};

module.exports = appointmentTypes;
