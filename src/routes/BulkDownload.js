const express = require('express');

const router = express.Router();
router.get('/bulk-download', getBulkDownload);


function getBulkDownload(req, res) {

    console.log("hehehe");
    res.status(200).json({
        "BlkDownload": `https://account.tecoenergy.com/BillSearchDownload`
    });
}


module.exports = router;