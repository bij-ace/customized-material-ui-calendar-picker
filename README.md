# Customized material-ui calendar date range picker reactjs
This project is based on ReactJS framework (TypeScript + JavaScript) and extensively customizes the material-ui calendar picker (https://material-ui-pickers.dev/) to suit different needs.

![Calendar demo gif](https://github.com/bij-ace/customized-material-ui-calendar-picker/blob/main/Customized%20material-ui%20calendar%20picker.gif)

## Available features
- Date range selector
- Add different indices to different days
- Disable past dates and enable future dates upto desired date
- Dynamic width
- Dynamic height (height changes according to number of weeks in a month) with animation

## Usage
```react.js
<CalendarPicker
  /** callback function to set first selected date **/
  setFirstSelectedDate={setFirstSelectedDate}
  /** callback function to set last selected date **/
  setLastSelectedDate={setLastSelectedDate}
  /** data that shows different indices in the calendar days **/
  calendarData={[
    {
      availability: "blackout", // shows blackout index
      date: "01/05/2022",
      index: ["Available"]
    },
    {
      availability: "",
      date: "01/06/2022",
      index: ["Available", "Limited"]
    },
    {
      availability: "",
      date: "01/07/2022",
      index: ["Available"]
    },
    {
      availability: "",
      date: "01/08/2022",
      index: ["Unavailable"] // day will not be selectable
    },
    {
      availability: "",
      date: "01/09/2022",
      index: ["Unavailable"]
    }
  ]}
  /** date that can be viewed in past **/
  minDt={new Date("01/01/2021")}
  /** maximum date that can be selected in future **/
  maxDt={new Date("01/01/2023")}
  /** indices to be shown in the Legend box **/
  indices={[
    {
      color: "red",
      legend: "Unavailable"
    },
    {
      color: "green",
      legend: "Available"
    },
    {
      color: "yellow",
      legend: "Limited"
    },
    {
      color: "grey",
      legend: "Past Dates"
    }
  ]}
  /** Blackout Dates text to be shown in the Legend box **/
  showBlackoutLegend={true}
/>
```

## Comments
Feel free to play around with the code and make modifications as per your need.
