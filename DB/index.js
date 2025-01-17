const { Pool } = require("pg");
exports.pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mcalab",
  password: "Deba_Satish_Astik_Pratham_Astik_Nikhil_Sourabh_Rahul",
  port: 5432,
});

// exports.pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "mcalab",
//   password: "root",
//   port: 5432,
// });
