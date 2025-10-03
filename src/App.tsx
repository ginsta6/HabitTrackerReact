import { useState } from "react";
import DayPicker from "./components/DayPicker/DayPicker";
import { useCalendar } from "./components/DayPicker/hooks/useCalendar";

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const dates = useCalendar(selectedDay);

  return (
    <DayPicker
      days={dates}
      selectedDay={selectedDay}
      onChange={setSelectedDay}
    />
  );
}

export default App;
