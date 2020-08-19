"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { generatePDF } = require("../helpers/user");
const moment = require("moment");

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

const AppoinmentType = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query(
      "select * from appointment_type where client_id=1"
    );
    const client_id = 9;
    const created = moment().format("YYYY-MM-DD HH:mm:ss");
    const created_user_id = 10;
    if (rows.length > 0) {
      const dd = await rows.map((row, index) => {
        db.query(
          `insert into appointment_type set client_id=${client_id}, created='${created}', created_user_id=${created_user_id}`
        );
      });
      console.log("dd:", dd);
    }
    const dbResponse = rows;

    if (!dbResponse) {
      errorMessage.error = "appointment_type Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const ClientCPT = async (req, res) => {
  /* return res
    .status(status.error)
    .send("Asked question to David on Slack and waiting for it");
*/
  const db = makeDb(configuration);
  try {
    const rows = await db.query("select * from client_cpt where client_id=1");
    const client_id = 9;
    const created = moment().format("YYYY-MM-DD HH:mm:ss");
    const created_user_id = 10;
    if (rows.length > 0) {
      const dd = await rows.map((row, index) => {
        db.query(
          `insert into client_cpt set client_id=${client_id}, created='${created}', created_user_id=${created_user_id}`
        );
      });
      console.log("dd:", dd);
    }
    const dbResponse = rows;

    if (!dbResponse) {
      errorMessage.error = "client_cpt Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const ClientFrom = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query(
      "select * from client_form where client_id=1 AND type='S'"
    );
    const client_id = 9;
    const created = moment().format("YYYY-MM-DD HH:mm:ss");
    const created_user_id = 10;

    if (rows.length > 0) {
      const dd = await rows.map((row, index) => {
        db.query(
          `insert into client_form set client_id=${client_id}, created='${created}', created_user_id=${created_user_id}`
        );
      });
      console.log("dd:", dd);
    }
    const dbResponse = rows;

    if (!dbResponse) {
      errorMessage.error = "client_form Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const UserSchedule = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query("select * from user_schedule");
    const client_id = 9;
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const month = moment(today).add(1, "M").format("YYYY-MM-DD HH:mm:ss");
    const created_user_id = 10;

    db.query(
      `insert into user_schedule set 
      client_id=${client_id}, user_id=${created_user_id}, start_event='${today}',
       end_event='${month}', created='${today}', created_user_id=${created_user_id}`
    );
    const dbResponse = rows;

    if (!dbResponse) {
      errorMessage.error = "client_form Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const AppointmentTypeUser = async (req, res) => {
  const db = makeDb(configuration);
  try {
    const rows = await db.query("select * from  appointment_type_user");
    const client_id = 9;
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const month = moment(today).add(1, "M").format("YYYY-MM-DD HH:mm:ss");
    const created_user_id = 10;
    const appointment_type_id = 1;

    db.query(
      `insert into  appointment_type_user set 
      client_id=${client_id}, user_id=${created_user_id}, appointment_type_id='${appointment_type_id}',
      created='${today}', created_user_id=${created_user_id}`
    );
    const dbResponse = rows;

    if (!dbResponse) {
      errorMessage.error = "appointment_type_user Cannot be found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    // handle the error
    errorMessage.error = err;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const tests = {
  getAllClients,
  PDF,
  AppoinmentType,
  ClientCPT,
  ClientFrom,
  UserSchedule,
  AppointmentTypeUser,
};

module.exports = tests;
