import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import styles from './calendarpicker.module.css';
import { isSameDay } from "date-fns";

export const getMonthAndYear = (navMonth) => {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let date = new Date(navMonth);
    return months[date.getMonth()] + " " + date.getFullYear();
};

export const getMinHeight = (navMonth) => {
    let year = new Date(navMonth).getFullYear();
    let month_number = new Date(navMonth).getMonth() + 1;

    // month_number is in the range 1..12

    let firstOfMonth = new Date(year, month_number - 1, 1);
    let lastOfMonth = new Date(year, month_number, 0);

    let used = firstOfMonth.getDay() + lastOfMonth.getDate();

    let numberOfMonth = Math.ceil(used / 7);

    if (numberOfMonth > 5) return "300px";
    return "250px";
};

export const getDayElement = (day, selectedDate, isInCurrentMonth, firstSelectedDate, lastSelectedDate, calendarData, minDt, maxDt) => {
    const isSelected =
        isSameDay(day, new Date(firstSelectedDate)) ||
        (day >= new Date(firstSelectedDate) && day <= new Date(lastSelectedDate));
    let dateTile;
    dateTile = (
        <div
            className={
                !isInCurrentMonth ||
                    getMinAndMax(day, minDt, maxDt) ||
                    day < new Date(getDateFormatMMDDYYYY())
                    ? styles.disabledDay
                    : isSelected && !disableDates(day, calendarData, new Date())
                        ? styles.selectedDay
                        : styles.normalDay
            }
        >
            <div className={styles.col}>
                {getAvailability(day, calendarData)}
                <div
                    style={{
                        display: "block",
                        position: "absolute",
                        top: "20%",
                        width: "100%",
                    }}
                >
                    {("0" + day.getDate()).slice(-2)}
                </div>
                <div className={styles.dotSpan} style={{ width: "100%" }}>
                    {getIndices(day, calendarData, new Date())}
                </div>
            </div>
        </div>
    );
    return dateTile;
};

export const getMinAndMax = (day, minDt, maxDt) => {
    if (!minDt || !maxDt) return false;
    let mMinDate =
        minDt.getMonth() + "/" + minDt.getDate() + "/" + minDt.getYear();
    let mMaxDate =
        maxDt.getMonth() + "/" + maxDt.getDate() + "/" + maxDt.getYear();
    let mDay = day.getMonth() + "/" + day.getDate() + "/" + day.getYear();
    if (
        new Date(mDay).getTime() < new Date(mMinDate).getTime() ||
        new Date(mDay).getTime() > new Date(mMaxDate).getTime()
    ) {
        return true;
    }
    return false;
};

export class LocalizedUtils extends DateFnsUtils {
    getWeekdays() {
        return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    }
}

export const getIndices = (day, calendarData, currentDate) => {
    if (
        new Date(getDateFormatMMDDYYYY(day)).getTime() <
        new Date(getDateFormatMMDDYYYY(currentDate)).getTime()
    ) {
        return (
            <div>
                <span className={styles.greyDot}></span>
            </div>
        );
    }
    let obj = calendarData
        ? calendarData.find((it) => new Date(it.date).getTime() == day.getTime())
        : {};
    let elem = <div></div>;
    if (obj && Object.prototype.hasOwnProperty.call(obj, "index")) {
        if (obj.index.includes("Available")) {
            elem = (
                <div>
                    <span className={styles.greenDot}></span>
                </div>
            );
        }
        if (obj.index.includes("Limited")) {
            elem = (
                <div>
                    <span className={styles.yellowDot}></span>
                </div>
            );
        }
        if (obj.index.includes("Available") && obj.index.includes("Limited")) {
            elem = (
                <div>
                    <span className={styles.greenDot}></span>
                    <span className={styles.yellowDot}></span>
                </div>
            );
        }
        if (obj.index.includes("Unavailable")) {
            elem = (
                <div>
                    <span className={styles.redDot}></span>
                </div>
            );
        }
    }
    return elem;
};

export const getAvailability = (day, calendarData) => {
    let obj = calendarData
        ? calendarData.find((it) => new Date(it.date).getTime() == day.getTime())
        : {};
    let elem = <div></div>;
    if (obj && Object.prototype.hasOwnProperty.call(obj, "availability")) {
        if (obj.availability == "blackout") {
            elem = <div className={styles.blackout}></div>;
        }
    }
    return elem;
};

export const disableDates = (day, calendarData, currentDate) => {
    if (day < new Date(getDateFormatMMDDYYYY(currentDate))) return true;
    let obj = calendarData
        ? calendarData.find((it) => new Date(it.date).getTime() == day.getTime())
        : {};
    if (obj && Object.prototype.hasOwnProperty.call(obj, "index")) {
        if (obj.index.includes("Unavailable")) {
            return true;
        }
    }
    return false;
};

export const indicesToShow = (obj, key) => {
    let style = ""
    if (obj.color == "red") {
        style = styles.redDot
    } else if (obj.color == "green") {
        style = styles.greenDot
    } else if (obj.color == "yellow") {
        style = styles.yellowDot
    } else if (obj.color == "grey") {
        style = styles.greyDot
    } else if (obj.color == "blue") {
        style = styles.blueDot
    }
    return (
        <span key={key}>
            <span className={style} style={{ marginBottom: "2px" }}></span>{" "}
            <span className={styles.indexText}>{obj.legend}</span>
        </span>
    );
};

export const getDateFormatMMDDYYYY = (date) => {
    const d = date && date !== null ? new Date(date) : new Date();
    const day = d?.getDate() < 10 ? "0" + d?.getDate() : d?.getDate();
    const month = d?.getMonth() + 1;

    return `${month < 10 ? "0" + month : month}/${day}/${d?.getFullYear()}`;
};

export const navigateMonth = (
    position,
    navMonth,
    setNavMonth,
    minDt,
    maxDt
) => {
    if (
        (new Date(navMonth).getFullYear() == new Date(maxDt).getFullYear() &&
            new Date(navMonth).getMonth() == new Date(maxDt).getMonth() &&
            position == 1) ||
        (new Date(navMonth).getFullYear() == new Date(minDt).getFullYear() &&
            new Date(navMonth).getMonth() == new Date(minDt).getMonth() &&
            position == -1)
    ) {
        return 0;
    }
    let date = new Date(navMonth);
    date.setMonth(date.getMonth() + position);
    setNavMonth(date.toString());
    return 1;
};