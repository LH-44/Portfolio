const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("./models/feedback");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"));

// API Route
app.post("/api/feedback", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            message
        });

        await newFeedback.save();

        res.status(200).json({ message: "Feedback saved ✅" });
    } catch (error) {
        res.status(500).json({ error: "Error saving feedback" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));