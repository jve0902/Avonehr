"use strict";
const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const search = async (req, res) => {
  const db = makeDb(configuration, res);
  let { searchTerm, checkBox } = req.body;

  let $sql;
  try {
    $sql = `select d.id, d.name, cd.favorite, cd.updated, concat(u.firstname, ' ', u.lastname) updated_name
            from drug d
            left join client_drug cd on cd.client_id=1
            and cd.drug_id=d.id
            left join user u on u.id=cd.updated_user_id
            where 1 \n`;
    if (searchTerm) {
      $sql = $sql + `and d.name like '${searchTerm}%' \n`;
    }
    if (checkBox == true) {
      $sql = $sql + `and cd.favorite = true \n`;
    }
    $sql = $sql + `order by d.name \n`;
    $sql = $sql + `limit 20 \n`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    console.log(successMessage);
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const addFavorite = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const db = makeDb(configuration, res);
  let client_drug = req.body;

  (client_drug.created_user_id = req.user_id),
    (client_drug.updated_user_id = req.user_id),
    (client_drug.client_id = req.client_id),
    (client_drug.drug_id = req.body.drug_id),
    (client_drug.favorite = true),
    (client_drug.updated = new Date());
  client_drug.created = new Date();

  try {
    const dbResponse = await db.query(
      "insert into client_drug set ?",
      client_drug
    );

    if (!dbResponse) {
      errorMessage.error = "Creation not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Creation not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const deleteFavorite = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(
      `delete from client_drug where client_id=${req.client_id} and drug_id=${req.params.id}`
    );
    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteResponse;
    successMessage.message = "Deletion successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const drug = {
  search,
  addFavorite,
  deleteFavorite,
};

module.exports = drug;
