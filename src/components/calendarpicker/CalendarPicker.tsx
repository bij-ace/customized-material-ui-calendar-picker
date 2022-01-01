import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import styles from './calendarpicker.module.css';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import { disableDates, getDateFormatMMDDYYYY, getDayElement, getMinHeight, getMonthAndYear, indicesToShow, LocalizedUtils, navigateMonth } from './utils';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type CustomType = {
  MuiPickersBasePicker: {
    pickerView: {
      maxWidth?: string;
    };
  };
};

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends overridesNameToClassKey { }
  export interface ComponentNameToClassKey extends CustomType { }
}

interface CalendarPickerProps {
  /** callback function for first date change **/
  setFirstSelectedDate: any;
  /** callback function for last date change **/
  setLastSelectedDate: any;
  /** actual data that will drive the calendar days **/
  calendarData: any[];
  /** min date to select range **/
  minDt: Date;
  /** max date to select range **/
  maxDt: Date;
  /** legends to display **/
  indices: any[];
  /** legends to display at top of calendar **/
  showBlackoutLegend: boolean;
}

const CalendarPicker = (props: CalendarPickerProps) => {
  const {
    setFirstSelectedDate,
    setLastSelectedDate,
    calendarData,
    minDt,
    maxDt,
    indices,
    showBlackoutLegend,
  } = props;

  const [navMonth, setNavMonth] = useState(new Date().toString());
  const [firstSelectedDate, setFirstSelectedDateInside] = useState(
    new Date().toString()
  );
  const [lastSelectedDate, setLastSelectedDateInside] = useState(
    new Date().toString()
  );

  const materialThemeDateRangeSelector = () =>
    createTheme({
      overrides: {
        MuiPickersCalendar: {
          transitionContainer: {
            minHeight: getMinHeight(navMonth),
            overflowY: "overlay",
            marginTop: "0px",
            transition: "min-height 0.4s linear",
          },
        },
        MuiPickersToolbar: {
          toolbar: {
            display: "none",
          },
        },
        MuiPickersCalendarHeader: {
          dayLabel: {
            width: "12.35vw",
            margin: "0 2px",
            color: "#fff",
            fontFamily: "NHaasGroteskDSStd-65Md",
            fontSize: "12px",
          },
          daysHeader: {
            maxHeight: "35px",
            height: "35px",
            backgroundColor: "#4CAEE3",
          },
          switchHeader: {
            width: "50%",
            right: "0",
            fontFamily: "NHaasGroteskDSStd-65Md",
            marginRight: "15px",
            display: "none",
          },
          iconButton: {
            paddingRight: "0px",
            paddingLeft: "0px",
          },
        },
        MuiTypography: {
          body1: {
            fontFamily: "NHaasGroteskDSStd-65Md",
            fontSize: "14px",
            fontWeight: "normal",
            marginTop: "2px",
          },
        },
        MuiSvgIcon: {
          root: {
            fill: "black",
            fontSize: "2.5em",
            height: "0.5em",
            width: "0.5em",
          },
        },
        MuiPickersBasePicker: {
          pickerView: {
            maxWidth: "100%",
            minHeight: "250px",
            marginTop: "5px",
          },
        },
      },
    });

  const handleDateChange = (day: Date) => {
    if (lastSelectedDate != "") {
      setFirstSelectedDateInside(day.toString());
      setLastSelectedDateInside("");
      if (setFirstSelectedDate) {
        setFirstSelectedDate(day.toString());
      }
      if (setLastSelectedDate) {
        setLastSelectedDate(day.toString());
      }
    } else {
      if (new Date(day) < new Date(firstSelectedDate)) {
        setLastSelectedDateInside(firstSelectedDate);
        setFirstSelectedDateInside(day.toString());
        if (setFirstSelectedDate) {
          setFirstSelectedDate(day.toString());
        }
        if (setLastSelectedDate) {
          setLastSelectedDate(firstSelectedDate);
        }
      } else {
        setLastSelectedDateInside(day.toString());
        if (setLastSelectedDate) {
          setLastSelectedDate(day.toString());
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          id="startDate"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
            width: "50%",
            alignItems: "center"
          }}
        >
          <span className={styles.startDateLabel}>Start Date</span>
          <span className={styles.startDateTxt}>
            {getDateFormatMMDDYYYY(firstSelectedDate)}{" "}
          </span>
        </div>
        <div
          id="endDate"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
            width: "50%",
            alignItems: "center"
          }}
        >
          <span className={styles.endDateLabel}>End Date</span>
          <span className={styles.endDateTxt}>
            {" "}
            {getDateFormatMMDDYYYY(
              lastSelectedDate ? lastSelectedDate : firstSelectedDate
            )}
          </span>
        </div>
      </div>
      <div
        id="navDate"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "15px"
        }}
      >
        <span className={styles.nav}>
          <i
            id="leftNav"
            className={styles.leftArrow}
            onClick={() =>
              navigateMonth(-1, navMonth, setNavMonth, minDt, maxDt)
            }
          ></i>
          <span className={styles.navText}>{getMonthAndYear(navMonth)}</span>
          <i
            id="rightNav"
            className={styles.rightArrow}
            onClick={() =>
              navigateMonth(1, navMonth, setNavMonth, minDt, maxDt)
            }
          ></i>
        </span>
      </div>
      <div
        id="dateRangeComponent"
        className={styles.calendarBase}
        style={{
          display: "grid",
          placeItems: "center",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)",
          backgroundColor: "var(--white)",
          paddingBottom: "11px",
        }}
      >
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
          <ThemeProvider
            theme={materialThemeDateRangeSelector()}
          >
            <div>
              <DatePicker
                id="dateRangePicker"
                value={navMonth}
                onChange={(dt: any) => handleDateChange(new Date(dt))}
                variant="static"
                renderDay={(day, selectedDate, isInCurrentMonth) =>
                  getDayElement(day, selectedDate, isInCurrentMonth, firstSelectedDate, lastSelectedDate, calendarData, minDt, maxDt)
                }
                minDate={minDt}
                maxDate={maxDt}
                shouldDisableDate={(day) =>
                  disableDates(day, calendarData, new Date())
                }
              />
              <div className={styles.legendDiv}>
                <div className={styles.legendText}>Legend</div>
                {showBlackoutLegend ? (
                  <div
                    className={styles.blackoutDiv}
                  >
                    <div className={styles.blackoutLegend}></div>
                    <span className={styles.blackoutText}>
                      Blackout Dates
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div style={{ marginLeft: "8px", textAlign: "left" }}>
                  {indices && indices.length > 0
                    ? indices.map((it: any, key: any) => {
                      return indicesToShow(it, key)
                    })
                    : ""}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
}

export default CalendarPicker;
