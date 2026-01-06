// Vercel Serverless Function - Referral Form Handler
// Sends email via Resend

export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers,
        });
    }

    try {
        const { profile, reason, referrerName } = await req.json();

        // Validate required fields
        if (!profile || !reason || !referrerName) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), {
                status: 400,
                headers,
            });
        }

        // Send email via Resend
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'WLF Referrals <onboarding@resend.dev>',
                to: process.env.NOTIFY_EMAIL,
                subject: `New CEO Referral from ${referrerName}`,
                html: `
                    <h2>New CEO Referral</h2>
                    <p><strong>Referred by:</strong> ${referrerName}</p>
                    <p><strong>Social Media Profile:</strong> <a href="${profile}">${profile}</a></p>
                    <p><strong>Why they would benefit:</strong></p>
                    <p>${reason}</p>
                    <hr>
                    <p style="color: #888; font-size: 12px;">Submitted via Wise Leaders Fellowship website</p>
                `,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Resend error:', error);
            return new Response(JSON.stringify({ error: 'Failed to send email' }), {
                status: 500,
                headers,
            });
        }

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
