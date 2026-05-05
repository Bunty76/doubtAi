const Doubt = require('../models/Doubt');
const aiService = require('../services/aiService');

const askDoubt = async (req, res) => {
    try {
        const { question, subject, modelId } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        // Get AI response with fallback
        const { content, modelUsed } = await aiService.askAI(question, subject, modelId);

        // Save to DB
        const newDoubt = new Doubt({
            question,
            answer: content,
            subject,
            modelUsed: modelUsed || modelId // Store which model actually answered
        });

        await newDoubt.save();

        res.status(200).json(newDoubt);
    } catch (error) {
        console.error('Ask Doubt Controller Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await Doubt.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json(history);
    } catch (error) {
        console.error('Get History Controller Error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

module.exports = {
    askDoubt,
    getHistory
};
