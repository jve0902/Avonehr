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

/**
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
const search = async (req, res) => {
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select 'Encounter', id, dt, notes, client_id
        from encounter
        where patient_id=1
        and notes like '%${text}%'
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
    errorMessage.error = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
const history = async (req, res) => {
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select 
            ph.created
            ,concat(u.firstname, ' ', u.lastname) created_user
            ,concat(u2.firstname, ' ', u2.lastname) provider
            ,ph.firstname
            ,ph.middlename
            ,ph.lastname
            ,ph.preferred_name
            ,ph.address
            ,ph.address2
            ,ph.city
            ,ph.state
            ,ph.postal
            ,ph.country
            ,ph.phone_cell
            ,ph.phone_home
            ,ph.phone_work
            ,ph.phone_other
            ,ph.phone_note
            ,ph.email
            ,ph.dob
            ,ph.ssn
            ,ph.gender
            ,ph.emergency_firstname
            ,ph.emergency_middlename
            ,ph.emergency_lastname
            ,ph.emergency_relationship
            ,ph.emergency_email
            ,ph.emergency_phone
            ,ph.insurance_name
            ,ph.insurance_group
            ,ph.insurance_member
            ,ph.insurance_phone
            ,ph.insurance_desc
            ,ph.admin_note
            ,ph.medical_note
            from patient_history ph
            left join user u on u.id=ph.created_user_id
            left join user u2 on u2.id=ph.user_id
            where ph.id=1
            order by ph.created desc
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

/**
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
const AdminNotehistory = async (req, res) => {
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.admin_note, concat(u.firstname, ' ', u.lastname) name
        from patient_history ph
        left join user u on u.id=ph.created_user_id
        where ph.id=1
        and ph.admin_note is not null
        order by ph.created desc
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

const appointmentTypes = {
  getPatient,
  search,
  history,
  AdminNotehistory,
};

module.exports = appointmentTypes;
