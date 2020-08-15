"user strict";

//Client object constructor
const Client = function (Client) {
  this.name = Client.name;
  this.code = Client.code;
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
  this.calendar_start_time = Client.calendar_start_time;
  this.calendar_end_time = Client.calendar_end_time;
  this.functional_range = Client.functional_range;
  this.ein = Client.ein;
  this.npi = Client.npi;
  this.labcorp_api_key = Client.labcorp_api_key;
  this.quest_api_key = Client.quest_api_key;
  this.doctors_data_username = Client.doctors_data_username;
  this.doctors_data_password = Client.doctors_data_password;
  this.stripe_api_key = Client.stripe_api_key;
  this.bluefin_api_key = Client.bluefin_api_key;
  this.concierge_lab_ordering = Client.concierge_lab_ordering;
  this.note = Client.note;
  this.created = new Date();
  this.updated = null;
  this.updated_user_id = null;
};

module.exports = Client;
