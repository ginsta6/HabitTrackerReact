import type { Habit } from "../../../services/habits";
import styles from "./HabitItem.module.css"

interface Props {
  habit: Habit;
}

function HabitItem({ habit }: Readonly<Props>) {
  return (
    <div className={styles.habitItem}>
      {/* {if (isEditing)} */}
      <div className={styles.editMode}>
        <div className={styles.editFields}>
          <input
            // v-model="newHobbyName"
            type="text"
            className="form-control"
            title="Edit habit name"
            //   @keydown.enter="saveEdit"
          />
          <input
            // v-model="newCreationDate"
            type="date"
            className="form-control"
            title="Edit creation date"
          />
        </div>
        <div className={styles.editButtons}>
          <button
            className="btn btn-success"
            //   onClick={saveEdit}
            title="Save changes"
            aria-label="Save changes"
          >
            <i className="bi bi-check-lg"></i>
          </button>
          <button
            className="btn btn-danger"
            //   onClick={cancelEdit}
            title="Cancel editing"
            aria-label="Cancel editing"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <div className={styles.viewMode}>
        <div className={`${styles.habitName} ${!habit.active ? "inactive" : ""}`}>
          {habit.name}
        </div>
        <div className={styles.habitMeta}>
          <div className={styles.metaInfo}>
            <span
              className={`${styles.statusIndicator} ${habit.active ? "active" : ""}`}
            >
              {habit.active ? "Active" : "Paused"}
            </span>
            <span className={styles.creationDate}>
              {/* Created: { new Date(habit.createdAt).toLocaleDateString() } */}
            </span>
          </div>
          <div className={styles.habitActions}>
            <button
              className="btn btn-outline-primary"
              // onClick={startEditing}
              title="Edit habit"
              aria-label="Edit habit"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className={`btn ${habit.active ? "btn-warning" : "btn-siccess"}`}
              // onClick={stopHabit}
              title="Stop/Resume habit"
              aria-label="Stop/Resume habit"
            >
              <i className={`bi ${habit.active ? "bi-pause" : "bi-play"}`}></i>
            </button>
            <button
              className="btn btn-outline-danger"
              // onClick={deleteHabit}
              title="Delete habit"
              aria-label="Delete habit"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitItem;
