const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/get-token',spotifyController.getToken)
router.get('/search',spotifyController.search)
router.get('/get-album',spotifyController.getAlbum)

module.exports = router