import DayPicker from "../../components/DayPicker/DayPicker";
import HabitList from "../../components/HabitList/HabitList";
import { useCalendar } from "../../components/DayPicker/hooks/useCalendar";
import { useNavigate, useLoaderData } from "react-router-dom";
import { toISO } from "../../utils/date";

function HabitViewer() {
  const selectedDay = useLoaderData();
  const dates = useCalendar(selectedDay);
  const navigate = useNavigate();

  return (
    <>
      <DayPicker
        days={dates}
        selectedDay={selectedDay}
        onDayChange={(d) => navigate(`/${toISO(d)}`)}
      />
      <HabitList />
    </>
  );
}

export default HabitViewer;
