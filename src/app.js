const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const dotEnv = require("dotenv");

// use .env variables
dotEnv.config()
const PORT = process.env.PORT || 3030;

// routes:
const home = require("./routes/home");
const meterTable = require("./routes/MeterTable")
const dailyUsage = require("./routes/DailyDataUsage");
const monthlyUsage = require("./routes/MonthlyDataUsage");
const simulatorError = require("./routes/ErrorSimulator");

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(home);
app.use(meterTable);
app.use(dailyUsage);
app.use(monthlyUsage);
app.use(simulatorError);

module.exports = {
    server: app,
    start: () => {
        app.listen(PORT, () => { console.log(`listining on PORT ${PORT} .*.*.*.`); });
    },
};