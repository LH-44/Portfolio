const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();   // ✅ FIRST create app

// ✅ THEN use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Routes
app.get("/test", (req, res) => {
  res.send("Working!");
});

app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  await pool.query(
    "INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );

  res.send("Saved!");
});

// ✅ Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});