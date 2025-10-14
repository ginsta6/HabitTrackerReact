import styles from "./HabitListItem.module.css";
import { useToggleCompleted } from "../../../queries/progress";
import { useParams } from "react-router-dom";

interface Props {
  habitId: number;
  habitName: string;
  habitCompleted: boolean;
  habitActive: boolean;
}

function HabitListItem({
  habitId,
  habitName,
  habitCompleted,
  habitActive,
}: Readonly<Props>) {
  const toggleCompleted = useToggleCompleted();
  const { date = "" } = useParams();

  return (
    <div
      className={`${styles.habitItem}
      ${habitCompleted ? styles.completed : ""}
      ${!habitActive ? styles.paused : ""}`}
    >
      <button
        className={`${styles.roundButton}
      ${habitCompleted ? styles.completed : ""}
      ${!habitActive ? styles.paused : ""} `}
        onClick={() =>
          toggleCompleted.mutate({ habitId, date, completed: !habitCompleted })
        }
      >
        <i
          className={`bi ${
            habitCompleted ? "bi-check-circle-fill" : "bi-check"
          }`}
        />
      </button>
      <span
        className={`${styles.habitName}
      ${habitCompleted ? styles.completedText : ""}
      ${!habitActive ? styles.pausedText : ""} `}
      >
        {habitName}
        {!habitActive && (
          <span className={styles.pauseIndicator}>(Paused)</span>
        )}
      </span>
    </div>
  );
}

export default HabitListItem;
