// Vercel Serverless Function - Referral Form Handler
// Stores referrals in Vercel KV (Redis)

export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    // GET - Retrieve all referrals (protected by secret)
    if (req.method === 'GET') {
        const url = new URL(req.url);
        const secret = url.searchParams.get('secret');

        if (secret !== process.env.ADMIN_SECRET) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers,
            });
        }

        try {
            const response = await fetch(`${process.env.KV_REST_API_URL}/get/referrals`, {
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
            });
            const data = await response.json();
            const referrals = data.result ? JSON.parse(data.result) : [];

            return new Response(JSON.stringify({ referrals }), { headers });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to fetch referrals' }), {
                status: 500,
                headers,
            });
        }
    }

    // POST - Submit new referral
    if (req.method === 'POST') {
        try {
            const { profile, reason, referrerName } = await req.json();

            // Validate required fields
            if (!profile || !reason || !referrerName) {
                return new Response(JSON.stringify({ error: 'All fields are required' }), {
                    status: 400,
                    headers,
                });
            }

            // Get existing referrals
            const getResponse = await fetch(`${process.env.KV_REST_API_URL}/get/referrals`, {
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
            });
            const getData = await getResponse.json();
            const referrals = getData.result ? JSON.parse(getData.result) : [];

            // Add new referral
            const newReferral = {
                id: Date.now(),
                profile,
                reason,
                referrerName,
                submittedAt: new Date().toISOString(),
            };
            referrals.push(newReferral);

            // Save back to KV
            await fetch(`${process.env.KV_REST_API_URL}/set/referrals`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSON.stringify(referrals)),
            });

            return new Response(JSON.stringify({ success: true, message: 'Referral submitted' }), {
                headers,
            });

        } catch (error) {
            console.error('Error:', error);
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers,
            });
        }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers,
    });
}
