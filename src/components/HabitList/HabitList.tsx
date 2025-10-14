import styles from "./HabitList.module.css";
import HabitListItem from "./HabitListItem/HabitListItem";
import { useProgressForDate } from "../../queries/progress";
import { useParams } from "react-router-dom";

function HabitList() {
  const { date } = useParams();
  const { data: progress, isLoading } = useProgressForDate(date ?? "");
  const entries = progress ? Object.entries(progress) : [];

  if (isLoading)
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading habits...</p>
      </div>
    );

  if (entries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>
          No habits for this day. Add habits in the Habit Management section.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.habitListContainer}>
      <div>
        <div className={styles.habitList}>
          {entries.map(([id, p]) => (
            <HabitListItem
              key={id}
              habitId={Number(id)}
              habitName={p.name}
              habitCompleted={p.completed}
              habitActive={p.wasActiveOnDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitList;
