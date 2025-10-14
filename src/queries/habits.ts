import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Habits from "../services/habits";

export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: Habits.listHabits,
  });
}

export function useCreateHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => Habits.createHabit(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useRenameHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      Habits.renameHabit(id, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useUpdateCreationDate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, created_at }: { id: number; created_at: string }) =>
      Habits.updateCreationDate(id, created_at),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useDeleteHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => Habits.deleteHabit(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
