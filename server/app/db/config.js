const {env} = process;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    database: env.DB_NAME || 'clinios',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;