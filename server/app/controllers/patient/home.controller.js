"use strict";
const { configuration, makeDb } = require("./../../db/db.js");
const { errorMessage, successMessage, status } = require("./../../helpers/status");

const getClientPortalHeader = async (req, res) => {
  const db = makeDb(configuration, res);
  let $sql;

  try {
    $sql = `select cp.id, cp.header
      from client_portal cp
      where cp.id =${req.client_id}`;

    const dbResponse = await db.query($sql);

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

const Support = {
  getClientPortalHeader,
};

module.exports = Support;
