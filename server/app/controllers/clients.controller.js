"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * get Client agreement
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const getAgreement = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query(
      "SELECT id, contract, created FROM contract WHERE created=(select max(created) from contract)"
    );
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = "Contract Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = "Operation was not successful for Contract";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const clients = {
  getAgreement,
};

module.exports = clients;
