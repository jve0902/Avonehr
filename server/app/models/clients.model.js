"user strict";
const { configuration, makeDb } = require("../db/db.js");

//Client object constructor
const Client = function (Client) {
  this.name = Client.name;
  this.code = Client.code;
  this.code_patient = Client.code_patient;
  this.address = Client.address;
  this.address2 = Client.address2;
  this.city = Client.city;
  this.state = Client.state;
  this.postal = Client.postal;
  this.country = Client.country;
  this.phone = Client.phone;
  this.fax = Client.fax;
  this.email = Client.email;
  this.website = Client.website;
  this.created = new Date();
};

Client.getAllClients = async function (result) {
  const db = makeDb( configuration );
try {
  const { rows } = await db.query( 'Select * from client' );
  const dbResponse = rows[0];

  return dbResponse;

} catch ( err ) {
  // handle the error
    console.log("error: ", err);
      return err
} finally {
  await db.close();
}

};

module.exports = Client;
