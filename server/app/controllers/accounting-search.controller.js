"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select id, name
       from tran_type tt
       where (client_id is null or client_id=${req.client_id})
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
  const { amount1, amount2, dateFrom, dateTo, typeID } = req.body.data;
  let $sql;

  try {
    $sql = `select t.dt, tt.name, t.amount, e.title encounter_title, t.cpt_id, c.name cpt_name, t.note, t.patient_id
      , concat(u.firstname, ' ', u.lastname) patient_name, t.created, t.client_id
      from tran t
      left join tran_type tt on tt.id=t.type_id
      left join user u on u.id=t.patient_id
      left join cpt c on c.id=t.cpt_id
      left join encounter e on e.id=t.encounter_id
      where t.client_id=${req.client_id} \n`;
    if (amount1) {
      $sql=$sql+`and t.amount >= ${amount1} \n`
    }
    if (amount2) {
      $sql=$sql+`and t.amount <= ${amount2} \n`
    }
    if (dateFrom) {
      $sql=$sql+`and t.dt >= '${dateFrom}' \n`
    }
    if (dateTo) {
      $sql=$sql+`and t.dt <= '${dateTo}' \n`
    }
    if (typeID) {
      $sql=$sql+`and t.type_id = ${typeID} \n`
    }
    $sql=$sql+`order by t.dt desc \n`
    $sql=$sql+`limit 100 \n`

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