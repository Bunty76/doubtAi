const express = require('express');
const router = express.Router();
const doubtController = require('../controllers/doubtController');

router.post('/ask', doubtController.askDoubt);
router.get('/history', doubtController.getHistory);

module.exports = router;
