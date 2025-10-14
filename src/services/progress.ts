import { http } from "../lib/http";

export type HabitProgress = {
  name: string;
  completed: boolean;
  active: boolean;
  wasActiveOnDate: boolean;
};

export type ProgressForDate = Record<number, HabitProgress>; //key = habitID
export type AllProgress = Record<string, ProgressForDate>; //key = "YYYY-MM-DD"

// GET /progress
export async function getAllProgress(): Promise<AllProgress> {
  return http<AllProgress>("/progress");
}

// GET /progress/:date
export async function getProgressForDate(
  date: string
): Promise<ProgressForDate> {
  //using any because API shape is not defined
  const rows = await http<any[]>(`/progress/${date}`);

  return rows.reduce((acc: ProgressForDate, h: any) => {
    acc[h.id as number] = {
      name: String(h.name),
      completed: Boolean(h.completed),
      active: Boolean(h.active),
      wasActiveOnDate: Boolean(h.was_active_on_date),
    };
    return acc;
  }, {});
}

// POST /progress
export async function setCompleted(params: {
  habitId: number;
  date: string;
  completed: boolean;
}): Promise<void> {
  await http<void>("/progress", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
