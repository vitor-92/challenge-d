const express = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const cors = require("cors");

const allowedOrigins = ["http://react-app:3000", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "sentry-trace", "baggage"],
  credentials: true,
};

app.use(cors(corsOptions));

const db = new Pool({
  host: "postgres-db",
  user: "main",
  password: "Main123123",
  database: "challenge",
  port: 5432,
});

const createUsersTable = async () => {
  const client = await db.connect();
  try {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    await client.query(sql);
    console.log("Tabela de usuários criada com sucesso.");
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

createUsersTable();

app.post("/login", (req, res) => {
  const user = req.body.user;
  db.query(
    "SELECT * FROM users WHERE username = $1",
    [user],
    (err, results) => {
      if (err) throw err;

      if (results.rows.length === 0) {
        db.query(
          "INSERT INTO users (username) VALUES ($1) RETURNING *",
          [user],
          (err, results) => {
            if (err) throw err;

            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            });
            res.json({ token });
          }
        );
      } else {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.json({ token });
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
