import styles from "./HabitList.module.css";
import HabitListItem from "./HabitListItem/HabitListItem";

function HabitList() {
  return (
    <div className={styles.habitListContainer}>
      {/* if loading */}
      <div
        //   v-if="isLoading"
        className={styles.loadingState}
      >
        <div className={styles.spinner}></div>
        <p>Loading habits...</p>
      </div>
      {/* else this */}
      <div>
        {/* if empty */}
        <div
          // v-if="currentHabits.length === 0"
          className={styles.emptyState}
        >
          <p>
            No habits for this day. Add habits in the Habit Management
            section.
          </p>
        </div>
        {/* else this */}
        {/* list of entry components mapped with a list from backend */}
        <div className={styles.habitList}>
          <HabitListItem />
        </div>
      </div>
    </div>
  );
}

export default HabitList;
