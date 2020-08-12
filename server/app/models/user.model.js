"user strict";

//User object constructor
const User = function (User) {
  this.client_id = User.client_id;
  this.firstname = User.firstname;
  this.lastname = User.lastname;
  this.title = User.title;
  this.email = User.email;
  this.phone = User.phone;
  this.signature = User.signature;
  this.comment = User.comment;
  this.status = User.status; //A=Active, D=Deleted
  this.appointments = User.appointments; //Determines if patients may make appointments with this user from the patient portal.
  this.type = User.type; //#PP=Primary Provider, SP=Secondary Provider, A=Administrative, L=Limited
  this.schedule = User.schedule; //#F=Full, H=Half, Q=Quarter
  this.admin = User.admin;
  this.password = User.password;
  this.npi = User.npi;
  this.medical_license = User.medical_license;
  this.email_confirm_dt = User.email_confirm_dt; //#date confirmed email address
  this.sign_dt = User.sign_dt; //#date accepted terms and conditions with e-signature
  this.sign_ip_address = User.sign_ip_address; //#IP address when signed terms and conditions with e-signature
  this.login_dt = User.login_dt; //#date last logged into site
  this.email_forward_user_id = User.email_forward_user_id;
  this.created = new Date();
  this.created_user_id = User.created_user_id;
  this.updated = new Date();
  this.updated_user_id = null;
};

module.exports = User;
