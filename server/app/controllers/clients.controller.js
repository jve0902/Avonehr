

const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * Get All clients
 * @param {object} req
 * @param {object} res
 * @returns {object} clients array
 */
const getAllClients = async (req, res) => {
  return res.status(status.success).send(successMessage);
};


const clients = { getAllClients };

module.exports = clients;

