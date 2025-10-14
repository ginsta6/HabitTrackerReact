import styles from "./HabitListItem.module.css";

interface Props {
  habitName: string;
  habitCompleted: boolean;
  habitActive: boolean;
}

function HabitListItem({habitName, habitCompleted, habitActive}: Props) {
  return (
    <div className={styles.habitItem}>
      <button className={styles.roundButton}>
        <i className="bi bi-check-circle-fill" />
      </button>
      <span className={styles.habitName}>
        {habitName}<span className={styles.pauseIndicator}>(Paused)</span>
      </span>
    </div>
  );
}

export default HabitListItem;
