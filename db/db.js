const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on("connect", () => {
  console.log("Database is connected!");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); 
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connection successful!");
    client.release(); 
  } catch (err) {
    console.error("Error connecting to the database", err.message);
  }
})();

module.exports = {pool}
