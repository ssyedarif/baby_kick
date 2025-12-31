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

export const findSummaryWithHours = async (date) => {
  const query = `
    WITH hours AS (
      SELECT generate_series(0, 23) AS hour
    )
    SELECT 
      h.hour,
      COALESCE(COUNT(bkl.*), 0) AS count
    FROM hours h
    LEFT JOIN baby_kick_log bkl
      ON EXTRACT(HOUR FROM bkl.created_at) = h.hour
      AND bkl.created_at >= $1::date
      AND bkl.created_at < $1::date + INTERVAL '1 day'
    GROUP BY h.hour
    ORDER BY h.hour
  `;

  const values = [date];
  const { rows } = await pool.query(query, values);

  return rows.map((row) => {
    const startHour = String(row.hour).padStart(2, "0");
    const endHour = String((row.hour + 1) % 24).padStart(2, "0");

    return {
      time: `${startHour}:00 to ${endHour}:00`,
      count: Number(row.count),
    };
  });
};
