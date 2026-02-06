import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "blog",
  password: process.env.PG_PASSWORD || "12345",
  port: Number(process.env.PG_PORT) || 5432,
});

console.log("Database connected successfully");

export default db;