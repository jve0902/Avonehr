"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const search = async (req, res) => {
  const db = makeDb(configuration, res);
  //const { searchTerm, favorite } = req.body.data;
  let $sql;

  try {
    $sql = `select d.id, d.name, cd.favorite, cd.updated, concat(u.firstname, ' ', u.lastname) updated_name
    from drug d
    left join client_drug cd on cd.client_id=${req.client_id}
      and cd.drug_id=d.id
    left join user u on u.id=cd.updated_user_id
    where d.name like 'Levo%' \n`   //TODO add searchTerm
    //if (favorite) {
    //  $sql=$sql+`and ci.favorite = true \n`
    //}
    $sql=$sql+`order by d.name \n`
    $sql=$sql+`limit 20 \n`

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

const drug = {
  search
};

module.exports = drug;
