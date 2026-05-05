const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const doubtRoutes = require('./routes/doubtRoutes');

const path = require('path');

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for easier deployment unless specifically needed
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/doubts', doubtRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Serve Static Files in Production
if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientPath));

    // Catch-all route to serve the frontend
    app.use((req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

module.exports = app;
