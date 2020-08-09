"user strict";
const mysql = require("mysql");
const util = require( 'util' );
const config = require("../../config.js");
const dbConfig = config.dbconfig;

const configuration = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  database: dbConfig.DB,
}

// Create a connection to the database
//const connection = mysql.createConnection(config);

function makeDb( configuration ) {
  const connection = mysql.createConnection( configuration );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

/*
// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
}); */

const db = {
  configuration,
  makeDb
};

module.exports = db;
