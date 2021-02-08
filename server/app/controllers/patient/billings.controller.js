const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getBillings = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;
  try {
    $sql = `select t.encounter_id, t.dt, tt.name tran_type, t.payment_type, pm.account_number
    , case when t.type_id=1 then et.name end encounter_type, t.amount
    from tran t
    left join tran_type tt on tt.id=t.type_id
    left join encounter e on e.id=t.encounter_id
    left join encounter_type et on et.id=e.type_id
    left join payment_method pm on pm.id=t.payment_method_id
    where t.patient_id=${patient_id}
    order by t.dt desc
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getBalance = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.query;
  try {
    const dbResponse = await db.query(
      `select 
          sum(t.amount) amount
          from tran t
          where t.patient_id=${patient_id}
      `
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createBilling = async (req, res) => {
  const { dt, type_id, amount, note } = req.body.data;
  let { client_id, patient_id } = req.body.data;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }
  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }

  let { payment_type } = req.body.data;

  const db = makeDb(configuration, res);

  if (!payment_type) {
    payment_type = null;
  } else {
    payment_type = `'${payment_type}'`;
  }
  try {
    const insertResponse = await db.query(
      `insert into tran (patient_id, user_id, client_id, dt, type_id, amount, payment_type, note, created, created_user_id) values 
        (${patient_id}, ${req.user_id}, ${client_id}, '${dt}', ${type_id}, ${amount}, ${payment_type}, '${note}', now(), ${req.user_id})`
    );

    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Billing = {
  getBillings,
  createBilling,
  getBalance,
};

module.exports = Billing;
