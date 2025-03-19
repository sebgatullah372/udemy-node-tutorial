const express = require('express');
const path = require('path');

const router = express.Router();

//Make sure exact match with / [GET]
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;