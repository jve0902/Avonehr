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

async function withTransaction( db, callback ) {
  try {
    await db.beginTransaction();
    await callback();
    await db.commit();
  } catch ( err ) {
    await db.rollback();
    throw err;
  } finally {
    await db.close();
  }
}

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


const db = {
  configuration,
  makeDb,
  withTransaction
};

module.exports = db;
