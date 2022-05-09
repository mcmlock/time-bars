export const calcDateValue = (month, day, year) => {
    let monthValue;
    switch (month) {
        case 1:
            monthValue = 31 * 1440;
            break;
        case 2:
            monthValue = 59 * 1440;
            break;
        case 3:
            monthValue = 90 * 1440;
            break;
        case 4:
            monthValue = 120 * 1440;
            break;
        case 5:
            monthValue = 151 * 1440;
            break;
        case 6:
            monthValue = 181 * 1440;
            break;
        case 7:
            monthValue = 212 * 1440;
            break;
        case 8:
            monthValue = 242 * 1440;
            break;
        case 9:
            monthValue = 273 * 1440;
            break;
        case 10:
            monthValue = 303 * 1440;
            break;
        case 11:
            monthValue = 334 * 1440;
            break;
        default:
            monthValue = 0;
            break;
    }
    let dayValue;
    if (day > 1) {
        dayValue = (day - 1) * 1440;
    } else {
        dayValue = 0;
    }
    let yearValue = year * 1440 * 365;
    const leapYears = Math.floor(year / 4);
    yearValue += leapYears * 1440;
    return monthValue + dayValue + yearValue;
}

export const calcTodayValue = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear() - 2000;
    return calcDateValue(month, day, year);
}

export const calcFirstReset = repeatDay => {
    const currentDate = new Date();

    const currentDateValue = calcTodayValue();
    
    const todayValue = currentDate.getDay() + 1;
    if (todayValue === repeatDay) {
        return 1440 + currentDateValue;
    } else if (todayValue < repeatDay) {
        // Adding one to the sum, because we want to account for the fact the reset should happen at midnight the next day
        return (repeatDay - todayValue + 1) * 1440 + currentDateValue;
    } else {
        // Gets days left in the week, adds how far out into the next week the repeat day is, and then adds an extra one because the reset should happen at midnight the next day
        return (7 - todayValue + repeatDay + 1) * 1440 + currentDateValue;
    }
}

export const getDayName = repeatDay => {
    switch (repeatDay) {
        case 1: 
            return 'Sunday';
            break;
        case 2:
            return 'Monday';
            break;
        case 3:
            return 'Tuesday';
            break;
        case 4: 
            return 'Wednesday';
            break;
        case 5:
            return 'Thursday';
            break;
        case 6:
            return 'Friday';
            break;
        default:
            return 'Saturday';
            break;
    }
}