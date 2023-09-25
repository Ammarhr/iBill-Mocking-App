const express = require('express');
const router = express.Router();

router.get('/', getHome);

function getHome(req, res) {

    console.log("hehehe");
    res.status(200).send("Hello");
}


module.exports = router;