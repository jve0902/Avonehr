"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClientPortalHeader = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select cp.header, cp.updated, concat(u.firstname, ' ', u.lastname) updated_user
    from client_portal cp
    left join user u on u.id=cp.updated_user_id
    where cp.id=${req.client_id}`);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const clientPortalHeader = {
  getClientPortalHeader,
};

module.exports = clientPortalHeader;
