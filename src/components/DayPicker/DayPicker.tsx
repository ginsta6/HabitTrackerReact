import styles from "./DayPicker.module.css";
import DayButton from "./DayButton/DayButton";

interface Props {
  days: Date[];
  selectedDay: Date;
  onChange: (d: Date) => void;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function DayPicker({ days, selectedDay, onChange}: Readonly<Props>) {
  return (
    <div className={styles.scrollingContainer}>
      <div className={styles.scrollingRow + " d-flex"}>
        {days.map((day, i) => (
          //index as key is okay. Array is only changed as a whole
          <DayButton
            key={i}
            dayLabel={day.toLocaleDateString(undefined, {
              weekday: "short",
            })}
            monLabel={day.toLocaleDateString(undefined, {
              month: "short",
            })}
            dayNum={day.getDate()}
            onClick={() => onChange(day)}
            selected={isSameDay(day, selectedDay)}
          />
        ))}
      </div>
    </div>
  );
}

export default DayPicker;
