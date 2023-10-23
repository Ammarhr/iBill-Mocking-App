const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/simulate-error', getMonthlyDataUsage);

function getMonthlyDataUsage(req, res) {

    res.status(0).send({ error: "error" })
}

module.exports = router;