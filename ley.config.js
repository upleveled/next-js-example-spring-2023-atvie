const options = { ssl: true };

if (process.env.POSTGRES_URL) {
  const { parse } = require('pg-connection-string');

  // Extract the connection information from the Heroku environment variable
  const { host, database, user, password } = parse(process.env.POSTGRES_URL);

  // Set standard environment variables
  process.env.PGHOST = host;
  process.env.PGDATABASE = database;
  process.env.PGUSERNAME = user;
  process.env.PGPASSWORD = password;
}

module.exports = options;
