'use strict';

const express = require('express');
const { faker } = require('@faker-js/faker');
const { getRangeDate, formatDate } = require('../helper/dateFormmatting');

const router = express.Router();
router.post('/daily-data-usage', getDailyDataUsage);

// create array of usge days
function dailyUsageCreateHelper(days, dtoun, dtouf, sdt, edt) {
    let usageArr = [];
    let formattedDates = getRangeDate(edt, sdt);
    for (let i = 0; i < days; i++) {

        let type = "";

        if (dtoun == "x") {
            type = "dtoun";
        } else if (dtouf == "x") {
            type = "dtouf";
        } else if (dtoun == "x" && dtouf == "x") {
            if (i % 2 == 0) {
                type = "dtoun";
            } else {
                type = "dtouf";
            }
        } else {
            type = "kw";
        }

        let dayUsage =
        {
            FullDate: formattedDates[i],
            Perioddate: formatDate(new Date(formattedDates[i])),
            Temperature: Math.floor(Math.random() * (90 - -20) + -20).toString(),
            UOM: "kw",
            Usage: Math.floor(Math.random() * (10000 - 0) + 0).toString(),
            status: "A",
            CloudIcon: "",
            Dtype: type,
            ToolTipEstimated: ""
        };
        usageArr.push(dayUsage);
    }

    let usageDataObj = {
        DailyUsage: {
            AVGTemp: "80",
            AVGCost: "6",
            FooterDisclaimer: "<p>The data on this graph is represented for informational purposes</p>\n",
            HitPeakDemand: "June 12 2023",
            TempTooltip: "<div style=\"max-width:314px\"><span style=\"font-size:20px\"><span style=\"color:#005faa\">Temperature - How does it work </span></span></div>\n\n<div>\n<hr /></div>\n\n<p><span style=\"color:#000000; font-family:'Interstate'; font-size:14px\">The weather conditions and temperature outside can affect your usage. We provide you with the ability to see fluctuations in temperatures outside and how it may affect your energy consumptions</span></p>\n\n<div><span style=\"font-size:11px\"><em>This application uses your local weather and energy rates. The weather data provided is specific to this tool and is for informational purposes only.</em></span></div>\n",
            MaxUsage: "10000",
            DailyDetails: usageArr
        }
    };

    return usageDataObj;
}

function getDailyDataUsage(req, res) {

    const { sdt, edt, dtoun, dtouf } = req.body;
    let jsonResponse = dailyUsageCreateHelper(30, dtoun, dtouf, sdt, edt);

    res.status(201).json(jsonResponse);
}


module.exports = router;