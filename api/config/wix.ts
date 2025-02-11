import axios from 'axios';

const WIX_API_KEY = process.env.WIX_API_KEY;
const WIX_CLIENT_ID = process.env.WIX_CLIENT_ID;
const WIX_CLIENT_SECRET = process.env.WIX_CLIENT_SECRET;

const wixInstance = axios.create({
    baseURL: 'https://www.wixapis.com/',
    headers: {
        Authorization: `Bearer ${WIX_API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export async function checkWixSubscription(userEmail: string): Promise<boolean> {
    const response = await wixInstance.get(`/v1/memberships/subscriptions`, {
        params: { email: userEmail }
    });
    const data = response.data;
    return data.status === "active";
}