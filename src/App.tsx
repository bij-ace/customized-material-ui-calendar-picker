import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarPicker from './components/calendarpicker/CalendarPicker';

function App() {
  const [firstSelectedDate, setFirstSelectedDate] = useState(
    new Date().toString()
  );
  const [lastSelectedDate, setLastSelectedDate] = useState(
    new Date().toString()
  );

  console.log(firstSelectedDate)
  console.log(lastSelectedDate)

  let minDt = new Date();
  minDt.setFullYear(minDt.getFullYear() - 1);
  let maxDt = new Date();
  maxDt.setFullYear(maxDt.getFullYear() + 1);

  return (
    <React.Fragment>
      <CalendarPicker
        setFirstSelectedDate={setFirstSelectedDate}
        setLastSelectedDate={setLastSelectedDate}
        calendarData={[
          {
            availability: "blackout",
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
            index: ["Unavailable"]
          },
          {
            availability: "",
            date: "01/09/2022",
            index: ["Unavailable"]
          }
        ]}
        minDt={minDt}
        maxDt={maxDt}
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
        showBlackoutLegend={true}
      />
    </React.Fragment>
  );
}

export default App;
