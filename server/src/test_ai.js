const axios = require('axios');
require('dotenv').config({ path: '../server/.env' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const testAI = async () => {
    console.log('Testing with API Key:', OPENROUTER_API_KEY ? 'Present' : 'Missing');
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'nvidia/nemotron-3-nano-30b-a3b:free',
                messages: [{ role: 'user', content: 'Say hello' }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('AI Response:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('AI Error:', error.response?.data || error.message);
    }
};

testAI();
