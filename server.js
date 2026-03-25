app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// ✅ PostgreSQL (Railway)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// ✅ Create table safely
(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                name TEXT,
                email TEXT,
                message TEXT
            );
        `);
        console.log("Table ready");
    } catch (err) {
        console.error("DB Error:", err);
    }
})();

// ✅ ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ TEST ROUTE
app.get("/test", (req, res) => {
    res.send("Working!");
});

// ✅ FEEDBACK API
app.post("/feedback", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await pool.query(
            "INSERT INTO feedback (name, email, message) VALUES ($1,$2,$3)",
            [name, email, message]
        );

        res.send("Saved!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving feedback");
    }
});

// ✅ ADMIN ROUTE
app.get("/admin/feedback", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM feedback");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching feedback");
    }
});

// ✅ START SERVER (ALWAYS LAST)
const PORT = process.env.PORT;

console.log("PORT FROM RAILWAY:", process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});