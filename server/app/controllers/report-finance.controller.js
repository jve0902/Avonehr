"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select year(dt) year, month(dt) month
      , sum(case when type_id=1 then amount end) Service
      , sum(case when type_id=2 then amount end) Credit
      , sum(case when type_id=3 then amount end) Payment
      , sum(case when type_id=4 then amount end) Refund
      from tran
      where client_id=${req.client_id}
      and dt between '${req.query.from}' and '${req.query.to}'
      group by year(dt), month(dt)
      order by year(dt), month(dt)
      limit 100
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};


const reportFinance = {
  getAll,
};

module.exports = reportFinance;
