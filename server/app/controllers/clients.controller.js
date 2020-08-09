"use strict";

const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * Get All clients
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const getAllClients = async (req, res) => {
  const db = makeDb( configuration );
  try {
    const rows = await db.query( 'Select * from client' );
    const dbResponse = rows[0];

   if (!dbResponse) {
      errorMessage.error = 'User Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);

  } catch ( err ) {
    // handle the error
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }

};

const clients = { getAllClients };

module.exports = clients;

