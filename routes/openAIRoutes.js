const express = require('express');
const router = express.Router();
const openAIController = require('../controllers/openAIController');

router.get('/color',openAIController.colorDesc);
router.get('/music',openAIController.basedOnState);
router.get('/suggestions',openAIController.suggestions);
router.get('/summarize',openAIController.summarize)
module.exports = router