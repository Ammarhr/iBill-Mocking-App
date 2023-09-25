const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();
router.post('/monthly-data-usage', getMonthlyDataUsage);

// create array of usge days
function monthlyUsageCreateHelper(days, dtoun, dtouf, sdt, edt) {

    let monthlyObj = {
        "Perioddate": "MAR",
        "FullDate": "March 2022",
        "Temperature": "62",
        "UOM": "KW",
        "Usage": "0.00",
        "Cost": "0.0",
        "CloudIcon": "",
        "Switcher": "",
        "Operand": "HIST_OFKWH",
        "Days": "31",
        "ToolTipEstimated": ""
    };


}

function getMonthlyDataUsage(req, res) {

    res.status(201).joson({})
}

module.exports = router;