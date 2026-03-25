const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public")); // serves index.html, admin.html

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ✅ Create table
pool.query(`
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    message TEXT
);
`);


// ✅ FEEDBACK ROUTE (already exists)
app.post("/feedback", async (req, res) => {
    const { name, email, message } = req.body;

    await pool.query(
        "INSERT INTO feedback (name, email, message) VALUES ($1,$2,$3)",
        [name, email, message]
    );

    res.send("Saved!");
});


// ✅ 👉 ADD ADMIN ROUTE RIGHT HERE 👇
app.get("/admin/feedback", async (req, res) => {
    const result = await pool.query("SELECT * FROM feedback");
    res.json(result.rows);
});


// ✅ Start server (ALWAYS KEEP THIS AT BOTTOM)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));