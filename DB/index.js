const { Pool } = require("pg");
exports.pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mcalab",
  password: "root",
  port: 5432,
});
