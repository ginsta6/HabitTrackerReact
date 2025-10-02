import DayButton from "../DayButton/DayButton";

function DayPicker() {
  return (
    <div>
      <DayButton dayLabel="Mon" monLabel="Apr" dayNum="30" />
      <DayButton dayLabel="Tue" monLabel="Apr" dayNum="31" />
    </div>
  );
}

export default DayPicker;
