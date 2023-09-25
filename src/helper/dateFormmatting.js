'use strict';

function getDatesInDateRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

const getRangeDate = (endDate, startDate) => {
    let formattedDates;
    // Define your date range
    const start = new Date(startDate);
    const end = new Date(endDate); // Adjust this to your desired end date

    // Get all the days in the date range
    const allDaysInRange = getDatesInDateRange(start, end);

    // Format and print the dates
    formattedDates = allDaysInRange.map((date) => date.toISOString().slice(0, 10)); // yyyy-mm-dd

    return formattedDates
}

//date formatting
const formatDate = (date) => {

    let newDate = new Date(date)
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
    ];

    const month = months[newDate.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
}
module.exports = { getRangeDate, formatDate };