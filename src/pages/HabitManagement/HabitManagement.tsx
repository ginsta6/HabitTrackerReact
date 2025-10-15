import styles from "./HabitManagement.module.css";
import HabitItem from "../../components/HabitManagement/HabitItem/HabitItem";
import { useHabits } from "../../queries/habits";

function HabitManagement() {

  const {data: habits} = useHabits();

  return (
    <div className={`${styles.habitManagement} container`}>
      <h2>Habit Management</h2>
      {/* <AddHabitForm /> */}
      <div className={styles.habitList}>
        {/* <div v-if="store.hobbies.length === 0" className="empty-state">
        <p>No habits added yet. Add your first habit above!</p>
      </div> */}
        {habits?.map((habit) => <HabitItem key={habit.id} habit={habit}/>)}
      </div>
    </div>
  );
}

export default HabitManagement;
