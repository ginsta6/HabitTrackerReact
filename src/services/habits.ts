import { http } from "../lib/http";

export type Habit = {
  id: number;
  name: string;
  active: boolean;
  created_at?: string;
};

// GET /habits
export async function listHabits(): Promise<Habit[]> {
  return http<Habit[]>("/habits");
}

// POST /habits
export async function createHabit(name: string): Promise<Habit> {
  return http<Habit>("/habits", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

// PATCH /habits/:id
export async function renameHabit(id: number, name: string): Promise<void> {
  await http<void>(`/habits/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
}

/** PATCH /habits/:id/status */
export async function updateHabitStatus(
  id: number,
  active: boolean
): Promise<void> {
  await http<void>(`/habits/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ active }),
  });
}

// PATCH /habits/:id/creation-date
export async function updateCreationDate(
  id: number,
  createdAt: string
): Promise<void> {
  await http<void>(`/habits/${id}/creation-date`, {
    method: "PATCH",
    body: JSON.stringify({ createdAt }),
  });
}

// DELETE /habits/:id
export async function deleteHabit(id: number): Promise<void> {
  await http<void>(`/habits/${id}`, {
    method: "DELETE",
  });
}
