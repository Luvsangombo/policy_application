import mysql from 'mysql';
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME
});
connection.connect();
export default connection;

