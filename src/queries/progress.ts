import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Progress from "../services/progress";


export function useProgressForDate(date: string) {
  return useQuery({
    queryKey: ["progress", date],
    enabled: !!date,
    queryFn: () => Progress.getProgressForDate(date),
  });
}

export function useAllProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: Progress.getAllProgress,
  });
}

/** Toggle completion with optimistic UI */
export function useToggleCompleted() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { habitId: number; date: string; completed: boolean }) =>
      Progress.setCompleted(p),

    // Optimistic update for snappy checkbox toggles
    onMutate: async ({ habitId, date, completed }) => {
      await qc.cancelQueries({ queryKey: ["progress", date] });

      const prev = qc.getQueryData<Progress.ProgressForDate>(["progress", date]);
      if (prev) {
        qc.setQueryData<Progress.ProgressForDate>(["progress", date], {
          ...prev,
          [habitId]: { ...(prev[habitId] ?? {}), completed },
        });
      }

      return { prev, date };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["progress", ctx.date], ctx.prev);
    },

    onSettled: (_data, _err, vars) => {
      qc.invalidateQueries({ queryKey: ["progress", vars.date] });
    },
  });
}
