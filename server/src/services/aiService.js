const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const SITE_NAME = 'AI Doubt Solver';

const askAI = async (question, subject = 'General') => {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'google/gemini-2.0-flash:free',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert ${subject} teacher. Provide clear, concise, and accurate explanations for student doubts. Use markdown for formatting.`
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': SITE_URL,
                    'X-Title': SITE_NAME,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenRouter AI Error:', error.response?.data || error.message);
        throw new Error('Failed to get response from AI');
    }
};

module.exports = { askAI };
