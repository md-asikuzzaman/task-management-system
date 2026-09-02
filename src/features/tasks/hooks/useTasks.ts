import { useQuery, useQueryClient } from "@tanstack/react-query";

import { taskApi } from "../api/taskApi";
import type { TaskQuery, TaskStatus } from "../types";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (query: TaskQuery) => [...taskKeys.all, query] as const,
  detail: (taskId: string) => [...taskKeys.all, "detail", taskId] as const,
};

export function useTasks(query: TaskQuery) {
  return useQuery({
    queryKey: taskKeys.list(query),
    queryFn: () => taskApi.getTasks(query),
    staleTime: 60000,
  });
}

export function useTask(taskId: string) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => taskApi.getTask(taskId),
    enabled: Boolean(taskId),
    staleTime: 30000,
  });
}

export function useInvalidateTasks() {
  const client = useQueryClient();

  return () => {
    client.invalidateQueries({ queryKey: taskKeys.all });
  };
}

export function useTaskStatusUpdater() {
  const client = useQueryClient();

  type TaskListData = {
    tasks?: Array<{ id: string; status: TaskStatus; updatedAt: string }>;
    pageSize?: number;
    total?: number;
  };

  return async (taskId: string, status: TaskStatus) => {
    const previous = client.getQueryData<TaskListData>(taskKeys.all);
    await client.cancelQueries({ queryKey: taskKeys.all });
    client.setQueriesData(
      { queryKey: taskKeys.all },
      (current: TaskListData | undefined) => {
        if (!current || !current.tasks) return current;
        return {
          ...current,
          tasks: current.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status, updatedAt: new Date().toISOString() }
              : task,
          ),
        };
      },
    );

    try {
      await taskApi.updateTaskStatus(taskId, status);
    } catch (error) {
      client.setQueryData(taskKeys.all, previous);
      throw error;
    }

    client.invalidateQueries({ queryKey: taskKeys.all });
  };
}
