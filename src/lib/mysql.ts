import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'jaikeerthi07a',
  database: process.env.DB_NAME || 'reddot_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, values?: any[]) {
  const [results] = await pool.execute(sql, values);
  return results;
}
