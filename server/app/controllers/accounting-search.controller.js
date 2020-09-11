"use strict";

const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select id, name
       from tran_type tt
       where (client_id is null or client_id=1)
       order by 1
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

const search = async (req, res) => {
  const db = makeDb(configuration, res);
  const { amount1, amount2 } = req.body.data;
  let $sql;

  try {
    $sql = `select t.dt, tt.name, t.amount, e.title encounter_title, t.cpt_id, c.name cpt_name, t.note, t.patient_id
      , concat(u.firstname, ' ', u.lastname) patient_name, t.created, t.client_id
      from tran t
      left join tran_type tt on tt.id=t.type_id
      left join user u on u.id=t.patient_id
      left join cpt c on c.id=t.cpt_id
      left join encounter e on e.id=t.encounter_id
      where t.client_id=${req.client_id}    
    `;
    if (amount1 && amount2) {
      $sql=$sql+`  and t.amount >= ${amount1}
      and t.amount <= ${amount2}
      `
    }
    $sql=$sql+`order by t.dt desc
      limit 100
    `
    const dbResponse = await db.query($sql);
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
  search,
};

module.exports = appointmentTypes;
