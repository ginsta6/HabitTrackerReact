import styles from "./DayButton.module.css"

interface Props {
  dayLabel: string;
  monLabel: string;
  dayNum: string;
}

function DayButton({dayLabel, monLabel, dayNum}: Readonly<Props>) {
  return (
    <div className={styles.square}>
        <div className={styles.dayLabel}>{dayLabel}</div>
        <div className={styles.monthLabel}>{monLabel}</div>
        <div className={styles.dateNumber}>{dayNum}</div>
    </div>
  )
}

export default DayButton