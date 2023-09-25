const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();


// routes:
const home = require("./routes/home");
const meterTable = require("./routes/MeterTable")
const dailyUsage = require("./routes/DailyDataUsage");

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(home)
app.use(meterTable)
app.use(dailyUsage)

module.exports = {
    server: app,
    start: () => {
        const PORT = process.env.PORT || 3030;
        app.listen(PORT, () => { console.log(`listining on PORT ${PORT}`); });
    },
};