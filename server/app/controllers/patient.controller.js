"use strict";
const multer = require("multer");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req:", req.body);
    const dest = process.env.LAB_UPLOAD_DIR;
    fs.access(dest, function (error) {
      if (error) {
        console.log("Directory does not exist.");
        return fs.mkdir(dest, (error) => cb(error, dest));
      } else {
        console.log("Directory exists.");
        return cb(null, dest);
      }
    });
  },
  filename: (req, file, cb) => {
    const fileName =
      "pid" +
      req.body.patient_id +
      "_" +
      file.originalname.split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.startsWith("pid")) {
      return cb(new Error("File name should not start with pid"));
    }
    if (file.mimetype == "application/pdf" || file.mimetype == "text/*") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .pdf and text"));
    }
  },
});

const getPatient = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select p.firstname, p.lastname, p.gender, p.dob, p.phone_home, p.phone_cell, p.email, concat(u.firstname, ' ', u.lastname) provider, p.client_id
        , p.admin_note, p.medical_note
        from patient p
        left join user u on u.id=p.user_id
        where p.client_id=${req.client_id}
        and p.id=${patient_id}
      `
    );
    const userLogResponse = await db.query(
      `insert into user_log values (1, 1, now(), 1, null)`
    );
    const functionalRange = await db.query(
      `select functional_range
        from client
        where id=${req.client_id}`
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
  const { patient_id } = req.params;
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select 'Encounter', id, dt, notes, client_id
        from encounter
        where patient_id=${patient_id}
        and notes like '%${text}%'
        union
        select 'Message', id, created, message, client_id
        from message
        where (patient_id_to=${patient_id} or patient_id_from=${patient_id})
        and message like '%${text}%'
        union
        select 'Admin Note', id, created, admin_note, client_id
        from patient
        where id=${patient_id}
        and admin_note like '%${text}%'
        union
        select 'Medical Note', id, created, medical_note, client_id
        from patient
        where id=${patient_id}
        and medical_note like '%${text}%'
        union
        select 'Lab Note', id, created, note, client_id
        from lab
        where patient_id=${patient_id}
        and note like '%${text}%'
        union
        select 'Lab Assignment Note', id, created, note_assign, client_id
        from lab
        where patient_id=${patient_id}
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
  const { patient_id } = req.params;
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
            where ph.id=${patient_id}
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
  const { patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.admin_note, concat(u.firstname, ' ', u.lastname) name
        from patient_history ph
        left join user u on u.id=ph.created_user_id
        where ph.id=${patient_id}
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
  const { patient_id } = req.params;

  const db = makeDb(configuration, res);
  try {
    const patientHistory = await db.query(
      `insert into patient_history (id, admin_note, created, created_user_id) values (${patient_id}, '${old_admin_note}', now(), ${req.user_id})`
    );
    const updateResponse = await db.query(
      `update patient
            set admin_note='${admin_note}'
            where id=${patient_id}
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
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.patient_id=${patient_id}
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
  const { id, patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.patient_id=${patient_id} 
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
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.handout_id, h.filename
        from patient_handout ph
        left join handout h on h.id=ph.handout_id
        where ph.client_id=${req.client_id}
        and ph.patient_id=${patient_id}
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
  const { id, patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(
      `delete 
        from patient_handout
        where patient_id=${patient_id}
        and handout_id=${id}
      `
    );

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
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
  const { patient_id } = req.params;
  const { handout_id } = req.body.data;
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
        where h.client_id=${req.client_id}
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
  const { patient_id } = req.params;
  let { limit } = req.query;
  if (typeof limit === "undefined") {
    limit = 100;
  }
  try {
    const dbResponse = await db.query(
      `select t.dt, t.amount, tt.name tran_type, e.title encounter_title, c.name cpt_procedure, t.note, t.payment_type, pm.account_number
        from tran t
        left join cpt c on c.id=t.cpt_id
        left join encounter e on e.id=t.encounter_id
        left join tran_type tt on tt.id=t.type_id
        left join payment_method pm on pm.id=t.payment_method_id
        where t.patient_id=${patient_id}
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
  const { patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select pa.created, pa.drug_id, d.name
        from patient_allergy pa
        left join drug d on d.id=pa.drug_id
        where pa.client_id=${req.client_id}
        and pa.patient_id=${patient_id}
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
  const { patient_id } = req.params;
  const { drug_id } = req.body.data;
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

    $sql = `select l.id, l.created, l.filename, right(l.filename,3) type, l.lab_dt, l.physician, l.upload_error, l.note
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

const updateDocuments = async (req, res) => {
  const { id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const updateResponse = await db.query(
      `update lab set deleted=true where id=${id}
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

const documentUpload = upload.single("file");
const createDocuments = async (req, res) => {
  documentUpload(req, res, async (err) => {
    if (err) {
      console.log("documentUpload Error:", err.message);
      errorMessage.error = err.message;
      return res.status(status.error).send(errorMessage);
    }
    if (!req.file) {
      errorMessage.error = "File content can not be empty!";
      return res.status(status.error).send(errorMessage);
    }

    const { patient_id } = req.params;
    const uploadedFilename = req.file.originalname;
    const db = makeDb(configuration, res);
    try {
      const existingLabDocument = await db.query(
        `select 1
        from lab
        where patient_id=${patient_id}
        and filename='${uploadedFilename}'
        limit 1`
      );
      if (existingLabDocument.length > 0) {
        removeFile(req.file);
        errorMessage.error = "Same file is already in our database system!";
        return res.status(status.error).send(errorMessage);
      }

      const insertResponse = await db.query(
        `insert into lab (client_id, user_id, patient_id, filename, status, source, created, created_user_id) values (${req.client_id}, ${req.user_id}, ${patient_id}, '${uploadedFilename}', 'R', 'U', now(), ${req.user_id})`
      );

      if (!insertResponse.affectedRows) {
        removeFile(req.file);
        errorMessage.error = "Insert not successful";
        return res.status(status.notfound).send(errorMessage);
      }

      // It's limitation of Multer to pass variable to use as filename.
      // Got this idea from https://stackoverflow.com/a/52794573/1960558
      fs.renameSync(
        req.file.path,
        req.file.path.replace("undefined", patient_id)
      );

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
  });
};

const removeFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(file.path, "removed successfully!");
  });
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
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.medical_note, concat(u.firstname, ' ', u.lastname) name
        from patient_history ph
        left join user u on u.id=ph.created_user_id
        where ph.id=${patient_id}
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

const medicalNotesHistoryUpdate = async (req, res) => {
  const { medical_note, old_medical_note } = req.body.data;
  const { patient_id } = req.params;

  const db = makeDb(configuration, res);
  try {
    const patientHistory = await db.query(
      `insert into patient_history (id, medical_note, created, created_user_id) values (${patient_id}, '${old_medical_note}', now(), ${req.user_id})`
    );
    const updateResponse = await db.query(
      `update patient
            set medical_note='${medical_note}'
            where id=${patient_id}
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

const getMessages = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select m.id, m.created
        , concat(u.firstname, ' ', u.lastname) user_to_from
        , concat(u2.firstname, ' ', u2.lastname) user_to_name
        , m.read_dt, m.subject , m.message
        from message m
        left join user u on u.id=m.user_id_from
        left join user u2 on u2.id=m.user_id_to
        where (patient_id_from=${patient_id} or patient_id_to=${patient_id})
        order by m.created desc
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

const createMessage = async (req, res) => {
  const { subject, message, unread_notify_dt } = req.body.data;

  const { patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into message (subject, message, unread_notify_dt, client_id, created, created_user_id, patient_id_from) values ( '${subject}', '${message}', '${unread_notify_dt}', ${req.client_id}, now(), ${req.user_id}, ${patient_id})`
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

const deleteMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteMsgHistoryResponse = await db.query(`
      delete from message_history where message_id=${id}
    `);
    const deleteMsgResponse = await db.query(`
       delete from message where id=${id}
    `);

    if (!deleteMsgResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteMsgResponse;
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

const getAllTests = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select lc.cpt_id, c.name, date(lc2.lab_dt) lab_dt, lc2.value, lc2.range_high, lc2.range_low, lc2.unit, lc.count from (
        select lc.cpt_id, max(lc2.lab_id) lab_id, count from (
        select cpt_id, max(lab_dt) lab_dt, count(*) count
        from lab_cpt
        where patient_id=${patient_id}
        group by cpt_id
        ) lc
        left join lab_cpt lc2 on lc2.cpt_id=lc.cpt_id and lc2.lab_dt=lc.lab_dt
        group by lc.cpt_id
        ) lc
        left join lab_cpt lc2 on lc2.lab_id=lc.lab_id and lc2.cpt_id=lc.cpt_id
        left join cpt c on c.id=lc2.cpt_id
        order by c.name
        limit 500`
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

const getDiagnoses = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;
  const { active } = req.query;

  try {
    const dbResponse = await db.query(
      `select pi.created, pi.icd_id, i.name
        from patient_icd pi
        left join icd i on i.id=pi.icd_id
        where pi.patient_id=${patient_id}
        and pi.active=${active}
        order by i.name
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

const updateDiagnose = async (req, res) => {
  const { encounter_id, icd_id } = req.params;
  const { active, is_primary } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    let $sql;

    $sql = `update patient_icd \n`;
    if (typeof active !== "undefined") {
      $sql = $sql + `set active=${active} \n`;
    }
    if (typeof is_primary !== "undefined") {
      $sql = $sql + `set is_primary=${is_primary} \n`;
    }
    $sql =
      $sql +
      `where encounter_id=${encounter_id}
        and icd_id='${icd_id}'`;

    const updateResponse = await db.query($sql);
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

const deleteDiagnose = async (req, res) => {
  const { encounter_id, icd_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(`
       delete 
        from patient_icd
        where encounter_id=${encounter_id}
        and icd_id='${icd_id}'
    `);

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
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

const createDiagnoses = async (req, res) => {
  const { patient_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into patient_icd (client_id, user_id, patient_id, active, encounter_id, created, created_user_id) values (${req.client_id}, ${req.user_id}, ${patient_id}, true, 0, now(), ${req.user_id})`
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

const getMedications = async (req, res) => {
  const db = makeDb(configuration, res);
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select pd.start_dt, d.name, ds.strength, ds.unit, df.descr, pd.expires
        from patient_drug pd
        left join drug d on d.id=pd.drug_id
        left join drug_strength ds on ds.id=pd.drug_strength_id
        left join drug_frequency df on df.id=pd.drug_frequency_id
        where pd.patient_id=${patient_id}
        order by d.name
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

const deleteMedications = async (req, res) => {
  const { encounter_id, drug_id, drug_strength_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(`
       delete 
        from patient_drug 
        where encounter_id=${encounter_id}
        and drug_id= ${drug_id}
        and drug_strength_id=${drug_strength_id}
    `);

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
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
const getRequisitions = async (req, res) => {
  const db = makeDb(configuration, res);
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select pc.created, c.name cpt_name, c.id, lc.name lab_name
        from patient_cpt pc
        left join cpt c on c.id=pc.cpt_id
        left join lab_company lc on lc.id=c.lab_company_id
        where pc.encounter_id=${encounter_id}
        and pc.completed_dt is null
        order by c.name
        limit 100`
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

const createRequisitions = async (req, res) => {
  const { patient_id } = req.params;
  const { cpt_id } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into patient_cpt (client_id, patient_id, cpt_id, created, created_user_id) values (${req.client_id}, ${patient_id}, '${cpt_id}', now(), ${req.user_id})`
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

const deleteRequisitions = async (req, res) => {
  const { encounter_id, cpt_id } = req.params;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(`
       delete from
        patient_cpt
        where encounter_id=${encounter_id}
        and cpt_id=${cpt_id}
    `);

    if (!deleteResponse.affectedRows) {
      errorMessage.error = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
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

const getLayout = async (req, res) => {
  const db = makeDb(configuration, res);
  const { user_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select *
      from user_grid
      where user_id=${user_id}`
    );
    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "No Layout found";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const saveLayout = async (req, res) => {
  const { user_id } = req.body;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into user_grid 
      (
      user_id, 
      patient_ul,
      patient_ur,
      patient_ll,
      patient_lr,
      admin_notes_ul,
      admin_notes_ur,
      admin_notes_ll,
      admin_notes_lr,
      forms_ul,
      forms_ur,
      forms_ll,
      forms_lr,
      handouts_ul,
      handouts_ur,
      handouts_ll,
      handouts_lr,
      billing_ul,
      billing_ur,
      billing_ll,
      billing_lr,
      allergies_ul,
      allergies_ur,
      allergies_ll,
      allergies_lr,
      documents_ul,
      documents_ur,
      documents_ll,
      documents_lr,
      encounters_ul,
      encounters_ur,
      encounters_ll,
      encounters_lr,
      medical_notes_ul,
      medical_notes_ur,
      medical_notes_ll,
      medical_notes_lr,
      nutrition_ul,
      nutrition_ur,
      nutrition_ll,
      nutrition_lr,
      insights_ul,
      insights_ur,
      insights_ll,
      insights_lr,
      messages_ul,
      messages_ur,
      messages_ll,
      messages_lr,
      diagnoses_ul,
      diagnoses_ur,
      diagnoses_ll,
      diagnoses_lr,
      medications_ul,
      medications_ur,
      medications_ll,
      medications_lr,
      requisitions_ul,
      requisitions_ur,
      requisitions_ll,
      requisitions_lr,
      tests_ul,
      tests_ur,
      tests_ll,
      tests_lr,
      created
      )
      values 
      (
      ${user_id}, 
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      now()
      )
      on duplicate key update 
      patient_ul=1,
      patient_ur=1,
      patient_ll=1,
      patient_lr=1,
      admin_notes_ul=1,
      admin_notes_ur=1,
      admin_notes_ll=1,
      admin_notes_lr=1,
      forms_ul=1,
      forms_ur=1,
      forms_ll=1,
      forms_lr=1,
      handouts_ul=1,
      handouts_ur=1,
      handouts_ll=1,
      handouts_lr=1,
      billing_ul=1,
      billing_ur=1,
      billing_ll=1,
      billing_lr=1,
      allergies_ul=1,
      allergies_ur=1,
      allergies_ll=1,
      allergies_lr=1,
      documents_ul=1,
      documents_ur=1,
      documents_ll=1,
      documents_lr=1,
      encounters_ul=1,
      encounters_ur=1,
      encounters_ll=1,
      encounters_lr=1,
      medical_notes_ul=1,
      medical_notes_ur=1,
      medical_notes_ll=1,
      medical_notes_lr=1,
      nutrition_ul=1,
      nutrition_ur=1,
      nutrition_ll=1,
      nutrition_lr=1,
      insights_ul=1,
      insights_ur=1,
      insights_ll=1,
      insights_lr=1,
      messages_ul=1,
      messages_ur=1,
      messages_ll=1,
      messages_lr=1,
      diagnoses_ul=1,
      diagnoses_ur=1,
      diagnoses_ll=1,
      diagnoses_lr=1,
      medications_ul=1,
      medications_ur=1,
      medications_ll=1,
      medications_lr=1,
      requisitions_ul=1,
      requisitions_ur=1,
      requisitions_ll=1,
      requisitions_lr=1,
      tests_ul=1,
      tests_ur=1,
      tests_ll=1,
      tests_lr=1,
      updated=now()`
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
  updateDocuments,
  checkDocument,
  createDocuments,
  getEncounters,
  getMedicalNotesHistory,
  medicalNotesHistoryUpdate,
  getMessages,
  createMessage,
  deleteMessage,
  getAllTests,
  getDiagnoses,
  deleteDiagnose,
  updateDiagnose,
  createDiagnoses,
  getMedications,
  deleteMedications,
  createRequisitions,
  getRequisitions,
  deleteRequisitions,
  getLayout,
  saveLayout,
};

module.exports = appointmentTypes;
