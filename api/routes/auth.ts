import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ message: 'Auth API is working!' });
});

export default router;

import authRoutes from "./routes/auth.js";

app.use('/auth', authRoutes);
