import { Pool } from "pg";
import { config } from "dotenv";

config();

/**
 * Connection pool to the PostgreSQL database.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT!),
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
