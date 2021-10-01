const calendar_month = document.getElementById("calendar-month");
const calendar = document.getElementById("book-calendar");
const calendar_price = document.getElementById("calendar-price");

const cur_date = new Date();
const year = cur_date.getFullYear();
// Month: 0 = January, 1 = Feburary, 3 = March . . . 
const month = cur_date.getMonth();
const today = cur_date.getDate();
const month_enum = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let month_day_enum = [31, 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
];

// Account for leap year - Add an extra date to Feburary
if (year % 4 === 0) {
    month_day_enum[1] = 29;
}

const days_in_week = 7;

const days_in_past_month = month_day_enum[month - 1];
const days_in_month = month_day_enum[month];
// Get starting day of calendar and negate it - this will fill the empty spaces and 
// show how the past calendar connects
const start = - (new Date(year, month, 0)).getDay();

let cells_filled = 0;
// Determine Sunday & Saturday initial day in month
let sun_start = (start + days_in_week) % days_in_week;
let sat_start = ((start - 1) + days_in_week) % days_in_week;
// Variable for holding positive date
let real_day = 0;

// Helper method determining a day falling on a Sunday/Saturday
const isWeekend = day => {
    let actual = day % days_in_week
    return (actual === sun_start) || (actual === sat_start);
}

// Helper method determining a day falling in the given month
const inMonth = day => {
    return (day > 0) && (day <= days_in_month);
}

// Helper method determining a day is in the past of the current day
const pastDay = day => {
    return day < today;
}

let month_str = month_enum[month];

// Insert Month & Days of Week
calendar_month.insertAdjacentHTML('beforeend', `<div>${month_str} ${year}</div>`);
calendar.insertAdjacentHTML('beforeend', `<div class="day days-of-week">Sun</div><div class="day days-of-week">Mon</div>
    <div class="day days-of-week">Tue</div><div class="day days-of-week">Wed</div>
    <div class="day days-of-week">Thurs</div><div class="day days-of-week">Fri</div>
    <div class="day days-of-week">Sat</div>`);

// Iterate over array recording dates for calendar
for (let day = start; !(day > days_in_month && cells_filled % days_in_week === 0); day++) {
    // Determine coresponding positive date
    if (day <= 0) {
        real_day = (day + days_in_past_month) % days_in_past_month;
    }
    else {
        real_day = (day + days_in_month) % days_in_month;
    }

    // Check for weekend
    const weekend = isWeekend(day);
    // Check for being a month date
    const in_month = inMonth(day);
    // Check for date in the past
    const past_day = pastDay(day);

    // If real date and past month, it is the last day of past month
    if (real_day === 0 && day <= 0) {
        real_day = days_in_past_month;
    }
    // If real date and not past month, it is the last day of the month
    else if (real_day === 0 && day > 0) {
        real_day = days_in_month;
    }

    // Insert Date
    calendar.insertAdjacentHTML('beforeend', `<div class="day ${!in_month ? "non-month-day" : "*"
        && past_day ? "past-day" : "*" && weekend ? "weekend" : "*"}">
        <div class="font-circle-container">${real_day}</div></div>`);

    // Increment accumulator: cells_filled
    cells_filled++;
}
