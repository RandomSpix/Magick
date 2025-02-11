import express from 'express';
import { checkWixSubscription } from "../config/wix";

const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ message: 'Auth API is working!' });
});

router.post("/wix-login", async (req, res) => {
    const { code } = req.body;

    try {
        const tokenResponse = await fetch("https://www.wixapis.com/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.WIX_CLIENT_ID,  // 🔒 Kept secret in backend
                client_secret: process.env.WIX_CLIENT_SECRET, // 🔒 Kept secret in backend
                code,
                redirect_uri: process.env.WIX_REDIRECT_URI,
            }),
        });

        if (!tokenResponse.ok) {
            return res.status(400).json({ message: "Failed to get Wix access token" });
        }

        const tokens = await tokenResponse.json();
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ message: "Error communicating with Wix", error: error.message });
    }
});


export default router;