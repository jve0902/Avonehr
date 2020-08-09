"use strict";

const Clients = require("../models/clients.model.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * Get All clients
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const getAllClients = async (req, res) => {
  Clients.getAllClients(function (err, clients) {
    if (err) res.status(status.error).send(err);
    return res.status(status.success).send(clients);
  });
};


const clients = { getAllClients };

module.exports = clients;

