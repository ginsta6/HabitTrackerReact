import styles from "./HabitListItem.module.css";

function HabitListItem() {
  return (
    <div className={styles.habitItem}>
      <button className={styles.roundButton}>
        <i className="bi bi-check-circle-fill" />
      </button>
      <span className={styles.habitName}>
        HabitListItem
        <span className={styles.pauseIndicator}>(Paused)</span>
      </span>
    </div>
  );
}

export default HabitListItem;
