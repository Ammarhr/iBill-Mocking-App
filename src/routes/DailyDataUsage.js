'use strict';

const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();
router.post('/daily-data-usage', getDailyDataUsage);

function getDatesInDateRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

// Define your date range
const startDate = new Date('2023-01-01');
const endDate = new Date('2023-01-30'); // Adjust this to your desired end date

// Get all the days in the date range
const allDaysInRange = getDatesInDateRange(startDate, endDate);

// Format and print the dates
const formattedDates = allDaysInRange.map((date) => date.toISOString().slice(0, 10)); // yyyy-mm-dd
// console.log(formattedDates, "formattedDates");


//date formatting
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
}
1
// create array of usge days
function dailyUsageCreateHelper(days) {
    let usageArr = [];

    for (let i = 0; i < days; i++) {
        let dayUsage =
        {
            Perioddate: formatDate(new Date(formattedDates[i])),
            FullDate: formattedDates[i],
            Temperature: Math.floor(Math.random() * (90 - -20) + -20).toString(),
            UOM: "kw",
            Usage: Math.floor(Math.random() * (10000 - 0) + 0).toString(),
            status: "A",
            CloudIcon: "",
            Dtype: "kw",
            ToolTipEstimated: ""
        };
        usageArr.push(dayUsage);
    }

    let usageDataObj = {
        "DailyUsage": {
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

    res.status(200).json(dailyUsageCreateHelper(30));
}


module.exports = router;