const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("./models/Feedback");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.send("Saved to MongoDB");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log("Server running"));