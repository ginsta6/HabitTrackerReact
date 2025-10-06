import styles from "./DayButton.module.css";

interface Props {
  dayLabel: string;
  monLabel: string;
  dayNum: number;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

function DayButton({
  dayLabel,
  monLabel,
  dayNum,
  onClick,
  selected,
  disabled,
}: Readonly<Props>) {
  return (
    <div
      className={`${styles.square} ${selected ? styles.selected : ""}
        ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      <div className={styles.dayLabel}>{dayLabel}</div>
      <div className={styles.monthLabel}>{monLabel}</div>
      <div className={styles.dateNumber}>{dayNum}</div>
    </div>
  );
}

export default DayButton;
