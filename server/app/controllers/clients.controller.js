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
    const rows = await db.query( 
      'SELECT id, name, code, code_patient, address, address2, city, state, postal, country, phone, fax, email, functional_range, created FROM client' );
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

/**
 * create a client
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const create = async (req, res) => {
  return res.status(status.created).send(successMessage);
}

const clients = { create, getAllClients };

module.exports = clients;

