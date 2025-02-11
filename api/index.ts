import authRoutes from "./routes/auth"; // <-- ADD THIS

import express from "express";
import * as cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes); // <-- ADD THIS

app.get("/auth/status", (req, res) => {
    res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
