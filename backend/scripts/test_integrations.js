const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
let authToken = '';

async function runTests() {
    console.log('--- Starting Integration Tests ---');

    // 1. Health Check
    try {
        const res = await axios.get(`${BASE_URL}/health`);
        if (res.data.status === 'ok') console.log('✅ Health Check: PASSED');
        else console.error('❌ Health Check: FAILED', res.data);
    } catch (e) {
        console.error('❌ Health Check: FAILED (Server verification)', e.message);
        process.exit(1);
    }

    // 2. Auth (Mock)
    try {
        const res = await axios.post(`${BASE_URL}/auth/google`, {
            email: 'test@example.com',
            name: 'Test User',
            picture: 'http://example.com/pic.jpg',
            idToken: 'mock_token'
        });
        if (res.data.token) {
            authToken = res.data.token;
            console.log('✅ Auth Login: PASSED');
        } else {
            console.error('❌ Auth Login: FAILED (No token returned)');
        }
    } catch (e) {
        console.error('❌ Auth Login: FAILED', e.response?.data || e.message);
    }

    if (!authToken) {
        console.log('Skipping protected tests due to auth failure.');
        return;
    }

    const authHeaders = { headers: { Authorization: `Bearer ${authToken}` } };

    // 3. Scan (Mock Hive)
    try {
        const res = await axios.post(`${BASE_URL}/scans/analyze`, {
            imageUrl: 'http://example.com/fake.jpg',
            category: 'sneakers'
        }, authHeaders);

        if (res.data.result && (res.data.result === 'authentic' || res.data.result === 'fake')) {
            console.log(`✅ Scan Analysis: PASSED (Result: ${res.data.result})`);
        } else {
            console.error('❌ Scan Analysis: FAILED (Unexpected structure)', res.data);
        }
    } catch (e) {
        console.error('❌ Scan Analysis: FAILED', e.response?.data || e.message);
    }

    // 4. Design (Mock OpenAI)
    try {
        const res = await axios.post(`${BASE_URL}/designs/generate`, {
            prompt: 'A futuristic poster',
            type: 'poster'
        }, authHeaders);

        if (res.data.imageUrl) {
            console.log('✅ Design Generation: PASSED');
        } else {
            console.error('❌ Design Generation: FAILED', res.data);
        }
    } catch (e) {
        console.error('❌ Design Generation: FAILED', e.response?.data || e.message);
    }

    // 5. Payments (Mock Stripe)
    try {
        // Get packages first to find a valid ID
        const pkgRes = await axios.get(`${BASE_URL}/credits/packages`);
        const packageId = pkgRes.data[0].id;

        const res = await axios.post(`${BASE_URL}/credits/create-payment-intent`, {
            packageId
        }, authHeaders);

        if (res.data.clientSecret && res.data.mock) {
            console.log('✅ Payment Intent: PASSED (Mock Secret Returned)');
        } else {
            console.error('❌ Payment Intent: FAILED', res.data);
        }
    } catch (e) {
        console.error('❌ Payment Intent: FAILED', e.response?.data || e.message);
    }

    console.log('--- Tests Completed ---');
}

// Wait for server to boot?
setTimeout(runTests, 2000);
