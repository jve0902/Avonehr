"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `
      select uc.id, uc.user_id, uc.patient_id, uc.start_dt, uc.end_dt, uc.status, uc.client_id
      , p.firstname, p.email, concat(u.firstname, ' ', u.lastname) provider_name
      from user_calendar uc
      left join patient p on p.id=uc.patient_id
      left join user u on u.id=uc.user_id
      where uc.client_id=${req.client_id}
      and uc.user_id=${req.user_id}
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
  getAll,
};

module.exports = appointmentTypes;
