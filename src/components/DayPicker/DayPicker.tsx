import styles from "./DayPicker.module.css";
import DayButton from "./DayButton/DayButton";
import { useRef, useEffect} from "react";

interface Props {
  days: Date[];
  selectedDay: Date;
  onDayChange: (d: Date) => void;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function DayPicker({ days, selectedDay, onDayChange }: Readonly<Props>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToMiddle = () => {
    const container = containerRef.current;
    if (container) {
      const middlePosition =
        container.scrollWidth / 2 - container.clientWidth / 2;
      container.scrollLeft = middlePosition;
    }
  };

  useEffect(() => {
    scrollToMiddle();
  }, [selectedDay])

  return (
    <>
      <div className={styles.scrollingContainer} ref={containerRef}>
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
              onClick={() => onDayChange(day)}
              selected={isSameDay(day, selectedDay)}
              disabled={day > new Date()}
            />
          ))}
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button>Pick a Date</button>
        <button onClick={() => onDayChange(new Date())}>Today</button>
      </div>
    </>
  );
}

export default DayPicker;
