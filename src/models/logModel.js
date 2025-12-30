import pool from "../config/db.js";

export const insertLog = async () => {
  const query = `
    INSERT INTO baby_kick_log DEFAULT VALUES;
  `;

  await pool.query(query);
};

export const findTodaySummary = async () => {
  const query = `
    SELECT COUNT(*) AS count
    FROM baby_kick_log
    WHERE created_at >= CURRENT_DATE
      AND created_at < CURRENT_DATE + INTERVAL '1 day'
  `;

  const { rows } = await pool.query(query);
  return Number(rows[0].count);
};

export const findSummary = async (date) => {
  const query = `
    SELECT COUNT(*) AS count
    FROM baby_kick_log
    WHERE created_at >= $1::date
      AND created_at < $1::date + INTERVAL '1 day'
  `;

  const values = [date];

  const { rows } = await pool.query(query, values);
  return Number(rows[0].count);
};
