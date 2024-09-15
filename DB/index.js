const { Pool } = require("pg");
exports.pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mcalab",
  password: "pass1234",
  port: 5432,
});
