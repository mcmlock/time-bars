export const calcDateValue = (month, day, year) => {
    let monthValue;
    if (year % 4 === 0) {
        switch (month - 1) {
            case 1:
                monthValue = 31;
                break;
            case 2:
                monthValue = 60;
                break;
            case 3:
                monthValue = 91;
                break;
            case 4:
                monthValue = 121;
                break;
            case 5:
                monthValue = 152;
                break;
            case 6:
                monthValue = 182;
                break;
            case 7:
                monthValue = 213;
                break;
            case 8:
                monthValue = 243;
                break;
            case 9:
                monthValue = 274;
                break;
            case 10:
                monthValue = 304;
                break;
            case 11:
                monthValue = 335;
                break;
            default:
                monthValue = 0;
                break;
        }
    } else {
        switch (month - 1) {
            case 1:
                monthValue = 31;
                break;
            case 2:
                monthValue = 59;
                break;
            case 3:
                monthValue = 90;
                break;
            case 4:
                monthValue = 120;
                break;
            case 5:
                monthValue = 151;
                break;
            case 6:
                monthValue = 181;
                break;
            case 7:
                monthValue = 212;
                break;
            case 8:
                monthValue = 242;
                break;
            case 9:
                monthValue = 273;
                break;
            case 10:
                monthValue = 303;
                break;
            case 11:
                monthValue = 334;
                break;
            default:
                monthValue = 0;
                break;
        }
    }

    let dayValue = day;
    let yearValue = (year - 1) * 365;
    const leapYears = Math.floor((year - 1) / 4);
    yearValue += leapYears;
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
    
    const todayNum = currentDate.getDay() + 1;
    if (todayNum === repeatDay) {
        return 1 + currentDateValue;
    } else if (todayValue < repeatDay) {
        // Adding one to the sum, because we want to account for the fact the reset should happen at midnight the next day
        return (repeatDay - todayNum + 1) + currentDateValue;
    } else {
        // Gets days left in the week, adds how far out into the next week the repeat day is, and then adds an extra one because the reset should happen at midnight the next day
        return (7 - todayNum + repeatDay + 1) + currentDateValue;
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