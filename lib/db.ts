import sql from "mssql";

const config = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  server: process.env.DB_SERVER ?? "",
  database: process.env.DB_NAME ?? "",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const db = async () => {
  try {
    return await sql.connect(config);
  } catch (err) {
    console.error("SQL connection error:", err);
    throw err;
  }
};

export default db;
