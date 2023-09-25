'use strict';

const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();
router.post('/meter-table', getMeterTable);

let meterReadStatus = ["Demand", "Normal", "Demand_Off", "Demand_On", "On_Peak", "Off_Peak", "On_Off_Peak", "Received", "Delivered", "Normal"]
let services = ["Gas", "Electric", "Gas", "Electric", "Gas", "Electric", "Gas", "Electric", "Gas", "Electric",]
let arrayOfMeters = [];

function createMeterTableArray() {
    let numsOfMeters = Math.floor(Math.random() * (90 - 1) + 1);

    for (let i = 0; i < numsOfMeters; i++) {
        // Initiaizing t=start and end date
        const startDate = new Date(faker.date.past({ years: 4 }));
        const randomDays = Math.floor(Math.random() * (90 - 1) + 1);

        // Clone the startDate to avoid modifying it
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + randomDays);

        // Format the endDate as a human-readable date string
        const formattedEndDate = endDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // Random meter status
        let randomReadStatus = Math.floor(Math.random() * (7 - 0) + 0)

        // Assign status values
        let DAP_dkwh = "",
            DAP_rkwh = meterReadStatus[randomReadStatus] == "Received" ? "x" : "",
            DAP_pf = "",
            DAP_kw = meterReadStatus[randomReadStatus] == "Demand" || meterReadStatus[randomReadStatus] == "Demand_Off" || meterReadStatus[randomReadStatus] == "Demand_On" ? "x" : "",
            DAP_dtoun = meterReadStatus[randomReadStatus] == "On_Peak" || meterReadStatus[randomReadStatus] == "On_Off_Peak" ? "x" : "",
            DAP_dtouf = meterReadStatus[randomReadStatus] == "Off_Peak" || meterReadStatus[randomReadStatus] == "On_Off_Peak" ? "x" : "",
            Operand = DAP_rkwh == "x" ? "YKWHRC" : meterReadStatus[randomReadStatus] == "Delivered" ? "YKWHDL" : "ss";

        // Random Service    
        let service = services[Math.ceil(Math.random() * (9 - 0) + 0)];

        // Random Meter Number    
        let MeterNumber = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

        // Create Meter Object
        let meterObj = {
            "Service": service,
            "MeterNumber": MeterNumber.toString(),
            "ReadDate": startDate,
            "BillingPeriod": "29 Days",
            "BilledAmount": Math.floor(Math.random() * (150000 - 0) + 0).toString(),
            "CurrentReading": Math.floor(Math.random() * (150000 - 0) + 0).toString(),
            "PreviousReading": Math.floor(Math.random() * (150000 - 0) + 0).toString(),
            "TotalUsed": `${Math.floor(Math.random() * (150000 - 0) + 0)} ${service == "Electric" ? "KWH" : "Therms"}`,
            "AMI_Flag": i % 2 === 0 ? "X" : "",
            "UOF": service == "Electric" ? "KWH" : "Therms",
            "DLN": "9000096243",
            "ZipCode": "33615",
            "MeterLocation": faker.word.noun(),
            "Contract": "5102201970",
            "Operand": Operand,
            "OperandLabel": "",
            "ReadType": "",
            "HistoricalFact": "HIST_KWH",
            "ChartColor": "044F8D",
            "DAP_StartDate": startDate,
            "DAP_EndDate": endDate,
            "DAP_dkwh": DAP_dkwh,
            "DAP_rkwh": DAP_rkwh,
            "DAP_pf": DAP_pf,
            "DAP_kw": DAP_kw,
            "DAP_dtoun": DAP_dtoun,
            "DAP_dtouf": DAP_dtouf
        }
        arrayOfMeters.push(meterObj);
    }
}

function getMeterTable(req, res) {
    createMeterTableArray();
    res.status(201).send({
        "EPFlag": "",
        "TempFlag": false,
        "MeterTabel": arrayOfMeters
    });
}

module.exports = router;