const express = require('express');

const router = express.Router();

//Make sure exact match with / [GET]
router.get('/', (req, res, next) => {
    res.send('<h1>Express Home Page</h1>')
});

module.exports = router;