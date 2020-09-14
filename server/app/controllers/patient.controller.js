"use strict";

const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getPatient = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select p.firstname, p.lastname, p.gender, p.dob, p.phone_home, p.phone_cell, p.email, concat(u.firstname, ' ', u.lastname) provider, p.client_id
        , p.admin_note, p.medical_note
        from patient p
        left join user u on u.id=p.user_id
        where p.id=1
      `
    );
    const userLogResponse = await db.query(
      `insert into user_log values (1, 1, now(), 1, null)`
    );
    const functionalRange = await db.query(
      `select functional_range
        from client
        where id=1`
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const resData = { ...dbResponse[0], functional_range: functionalRange };
    successMessage.data = resData;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select 'Encounter', id, dt, notes, client_id
        from encounter
        where patient_id=1
        and notes like '%${text}%'
        union
        select 'Message', id, created, message, client_id
        from message
        where (patient_id_to=1 or patient_id_from=1)
        and message like '%${text}%'
        union
        select 'Admin Note', id, created, admin_note, client_id
        from patient
        where id=1
        and admin_note like '%${text}%'
        union
        select 'Medical Note', id, created, medical_note, client_id
        from patient
        where id=1
        and medical_note like '%${text}%'
        union
        select 'Lab Note', id, created, note, client_id
        from lab
        where patient_id=1
        and note like '%${text}%'
        union
        select 'Lab Assignment Note', id, created, note_assign, client_id
        from lab
        where patient_id=1
        and note_assign like '%${text}%'
        order by 1,2,3
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const history = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select 
            ph.created
            ,concat(u.firstname, ' ', u.lastname) created_user
            ,concat(u2.firstname, ' ', u2.lastname) provider
            ,ph.firstname
            ,ph.middlename
            ,ph.lastname
            ,ph.preferred_name
            ,ph.address
            ,ph.address2
            ,ph.city
            ,ph.state
            ,ph.postal
            ,ph.country
            ,ph.phone_cell
            ,ph.phone_home
            ,ph.phone_work
            ,ph.phone_other
            ,ph.phone_note
            ,ph.email
            ,ph.dob
            ,ph.ssn
            ,ph.gender
            ,ph.emergency_firstname
            ,ph.emergency_middlename
            ,ph.emergency_lastname
            ,ph.emergency_relationship
            ,ph.emergency_email
            ,ph.emergency_phone
            ,ph.insurance_name
            ,ph.insurance_group
            ,ph.insurance_member
            ,ph.insurance_phone
            ,ph.insurance_desc
            ,ph.admin_note
            ,ph.medical_note
            from patient_history ph
            left join user u on u.id=ph.created_user_id
            left join user u2 on u2.id=ph.user_id
            where ph.id=1
            order by ph.created desc
            limit 50
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const AdminNotehistory = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.admin_note, concat(u.firstname, ' ', u.lastname) name
        from patient_history ph
        left join user u on u.id=ph.created_user_id
        where ph.id=1
        and ph.admin_note is not null
        order by ph.created desc
        limit 50
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const adminNoteupdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { admin_note, old_admin_note } = req.body.data;
  const { id } = req.params;

  const db = makeDb(configuration, res);
  try {
    const patientHistory = await db.query(
      `insert into patient_history (id, admin_note, created, created_user_id) values (${id}, '${old_admin_note}', now(), ${req.user_id})`
    );
    const updateResponse = await db.query(
      `update patient
            set admin_note='${admin_note}'
            where id=${id}
      `
    );

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Update not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getForms = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.patient_id=1
        order by pf.created
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getFormById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.patient_id=1 
        and pf.form_id=${id}
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const handouts = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.handout_id, h.filename
        from patient_handout ph
        left join handout h on h.id=ph.handout_id
        where ph.client_id=1
        and ph.patient_id=1
        order by h.filename
        limit 100
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const handoutDelete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `delete 
        from patient_handout
        where patient_id=1
        and handout_id=${id}
      `
    );

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const CreatePatientHandouts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, handout_id } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into patient_handout (patient_id, handout_id, client_id, created, created_user_id) values (${patient_id}, ${handout_id}, ${req.client_id}, now(), ${req.user_id})`
    );

    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const patientHandouts = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select h.id, h.filename, ph.created, concat(u.firstname, ' ', u.lastname) name
        from handout h
        left join patient_handout ph on h.id=ph.handout_id
        left join user u on u.id=ph.created_user_id
        where h.client_id=1
        order by h.filename
        limit 100
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const DeletePatientHandouts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, handout_id } = req.params;
  const db = makeDb(configuration, res);

  try {
    const dbResponse = await db.query(
      `delete
        from patient_handout
        where patient_id=${patient_id}
        and handout_id=${handout_id}
      `
    );

    if (!dbResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getBilling = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select t.dt, t.amount, tt.name tran_type, e.title encounter_title, c.name cpt_procedure, t.note, t.payment_type, pm.account_number
        from tran t
        left join cpt c on c.id=t.cpt_id
        left join encounter e on e.id=t.encounter_id
        left join tran_type tt on tt.id=t.type_id
        left join payment_method pm on pm.id=t.payment_method_id
        where t.patient_id=1
        order by t.dt desc
        limit ${limit}
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getAllergies = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select pa.created, pa.drug_id, d.name
        from patient_allergy pa
        left join drug d on d.id=pa.drug_id
        where pa.client_id=1
        and pa.patient_id=1
        order by d.name
        limit 100
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const deleteAllergy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, drug_id } = req.params;
  const db = makeDb(configuration, res);

  try {
    const dbResponse = await db.query(
      `delete from patient_allergy where patient_id=${patient_id} and drug_id=${drug_id}
      `
    );

    if (!dbResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const searchAllergies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select d.id, d.name
        from drug d
        where d.name like '${text}%'
        order by d.name
        limit 50
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createPatientAllergy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, drug_id } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into patient_allergy (patient_id, drug_id, client_id, created, created_user_id) values (${patient_id}, ${drug_id}, ${req.client_id}, now(), ${req.user_id})`
    );

    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getDocuments = async (req, res) => {
  const db = makeDb(configuration, res);

  const { patient_id } = req.params;
  const { tab } = req.query;

  try {
    let $sql;

    $sql = `select l.created, l.filename, right(l.filename,3) type, l.lab_dt, l.physician, l.upload_error, l.note
      , group_concat(c.name, ': ', c.id, ' ', lc.value, ' ', lc.range_low, ' ', lc.range_high separator ' | ') tests
      from lab l
      left join lab_cpt lc on lc.lab_id=l.id
      left join cpt c on c.id=lc.cpt_id
      where l.patient_id=${patient_id} \n`;
    if (tab === "Labs") {
      $sql = $sql + "and l.type='L' and l.deleted=false \n";
    } else if (tab === "Imaging") {
      $sql = $sql + "and l.type='I' and l.deleted=false \n";
    } else if (tab === "Misc") {
      $sql = $sql + "and l.type='M' and l.deleted=false \n";
    } else if (tab === "Uncategorized") {
      $sql = $sql + "and l.type=null and l.deleted=false \n";
    } else if (tab === "Trash") {
      $sql = $sql + "and l.deleted=true \n";
    }
    $sql =
      $sql +
      `group by l.created, l.filename, right(l.filename,3), l.lab_dt, l.physician, l.upload_error, l.note
        order by l.created desc
        limit 200`;

    const dbResponse = await db.query($sql);
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const deleteDocuments = async (req, res) => {
  const { id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const updateResponse = await db.query(
      `update lab set deleted=true where id=${id}
      `
    );

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Delete not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const checkDocument = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select 1
        from lab
        where patient_id=${patient_id}
        and filename=filename
        limit 1`
    );
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createDocuments = async (req, res) => {
  const { patient_id, filename } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into lab (client_id, user_id, patient_id, filename, status, source, created, created_user_id) values (${req.client_id}, ${req.user_id}, ${patient_id}, '${filename}', 'R', 'U', now(), ${req.user_id})`
    );

    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getEncounters = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select e.dt, e.title, et.name encounter_type, concat(u.firstname, ' ', u.lastname) name from encounter e left join encounter_type et on et.id=e.type_id
        left join user u on u.id=e.user_id
        where e.patient_id=${patient_id}
        order by e.dt desc
        limit 50`
    );
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getMedicalNotesHistory = async (req, res) => {
  const db = makeDb(configuration, res);

  try {
    const dbResponse = await db.query(
      `select ph.created, ph.medical_note, concat(u.firstname, ' ', u.lastname) name
        from patient_history ph
        left join user u on u.id=ph.created_user_id
        where ph.id=1
        and ph.medical_note is not null
        order by ph.created desc
        limit 50`
    );
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const appointmentTypes = {
  getPatient,
  search,
  history,
  AdminNotehistory,
  adminNoteupdate,
  getForms,
  getFormById,
  handouts,
  handoutDelete,
  CreatePatientHandouts,
  patientHandouts,
  DeletePatientHandouts,
  getBilling,
  getAllergies,
  deleteAllergy,
  searchAllergies,
  createPatientAllergy,
  getDocuments,
  deleteDocuments,
  checkDocument,
  createDocuments,
  getEncounters,
  getMedicalNotesHistory,
};

module.exports = appointmentTypes;
