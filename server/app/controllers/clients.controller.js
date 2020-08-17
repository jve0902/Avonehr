"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { generatePDF } = require("../helpers/user");

/**
 * Get All clients
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const getAllClients = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query(
      "SELECT id, name, code, code_patient, address, address2, city, state, postal, country, phone, fax, email, functional_range, created FROM client"
    );
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = "User Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = "Operation was not successful";
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
};

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

/**
 * Generate Contract PDF
 * @param {object} req
 * @param {object} res
 * @returns {Object} result with PDF link
 */
const PDF = async (req, res) => {
  const data = {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat, mauris vel eleifend pharetra, purus risus scelerisque nulla, aliquam maximus turpis felis eget ante. Integer interdum metus id bibendum tincidunt. Nunc faucibus lorem metus, ut luctus neque blandit quis. Nullam sed tortor eget orci placerat dictum non a quam. Proin aliquam nulla in dolor aliquet mollis. Nulla scelerisque lobortis libero vitae rhoncus. Duis sed neque risus. Aliquam id nulla finibus, dapibus mauris quis, consequat nisi. Nunc suscipit maximus purus, eu semper metus iaculis lobortis. Curabitur bibendum ligula ac ante placerat, a volutpat ligula posuere. Pellentesque sit amet dolor a velit dignissim gravida. Maecenas tempus ornare suscipit. Vivamus ullamcorper lacinia mi eget sagittis. Pellentesque hendrerit dolor eget dui cursus vulputate.",
    user: {
      id: "2131",
      client_id: "11112222",
      firstname: "Ruhul",
      lastname: "Amin",
      sign_dt: "Jan 1 2020 1:00:00PM",
      sign_ip_address: "192.168.100.100",
      company: "Company Name",
    },
  };
  try {
    const pdf = await generatePDF(data.content, data.user);
    successMessage.message = "PDF successfully generated!";
    successMessage.pdfPath = pdf;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Something went wrong to generate PDF";
    return res.status(status.error).send(errorMessage);
  }
};

const clients = {
  create,
  getAllClients,
  getAgreement,
  PDF,
};

module.exports = clients;
