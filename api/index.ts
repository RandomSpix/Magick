import express from "express";
import * as cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth"; // ✅ Correct Import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register Authentication Routes
app.use('/auth', authRoutes);

app.get("/auth/status", (req, res) => {
    res.json({ message: "API is running" });
});

// ✅ Set Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});