import { ENV } from "./env.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

export default pool;
