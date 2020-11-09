const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllergy = async (req, res) => {
  const db = makeDb(configuration, res);

  let $sql;
  try {
    $sql = `select pa.created, d.name
    from patient_allergy pa
    left join drug d on d.id=pa.drug_id
    where pa.client_id=${req.client_id}
    and pa.patient_id=${req.user_id}
    order by d.name
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Allergy = {
  getAllergy,
};

module.exports = Allergy;