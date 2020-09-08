"use strict";

const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
const getPatient = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select p.firstname, p.lastname, p.gender, p.dob, p.phone_home, p.phone_cell, p.email, concat(u.firstname, ' ', u.lastname) provider, p.client_id
        , p.admin_note, p.medical_note
        from patient p
        left join user u on u.id=p.user_id
        where p.id=1
      `
    );
    const userLogResponse = await db.query(
      `insert into user_log values (1, 1, now(), 1, null)`
    );
    const functionalRange = await db.query(
      `select functional_range
        from client
        where id=1`
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const resData = { ...dbResponse[0], functional_range: functionalRange };
    successMessage.data = resData;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const appointmentTypes = {
  getPatient,
};

module.exports = appointmentTypes;
