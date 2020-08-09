"user strict";
const sql = require("./db.js");

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

Client.getAllClients = function (result) {
  sql.query("Select * from client", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("clients : ", res);

      result(null, res);
    }
  });
};

module.exports = Client;
