import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskApi } from "../api/taskApi";
import type { CreateTaskInput, Task, TaskStatus } from "../types";
import { taskKeys } from "./useTasks";

type TaskListCache = {
  tasks?: Task[];
  pageSize?: number;
  total?: number;
};

export function useCreateTask() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => taskApi.createTask(input),
    onSuccess: (newTask) => {
      client.setQueryData(taskKeys.all, (current: TaskListCache | undefined) => {
        if (!current) return current;
        if (!current.tasks) return { ...current, tasks: [newTask] };
        return {
          ...current,
          tasks: [newTask, ...current.tasks].slice(0, current.pageSize ?? 10),
          total: (current.total ?? 0) + 1,
        };
      });
      client.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useUpdateTaskStatus() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      taskApi.updateTaskStatus(taskId, status),
    onSuccess: (updatedTask) => {
      client.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
      client.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useDeleteTask() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskApi.deleteTask(taskId),
    onSuccess: (_, taskId) => {
      client.setQueryData(taskKeys.all, (current: TaskListCache | undefined) => {
        if (!current || !current.tasks) return current;
        return {
          ...current,
          tasks: current.tasks.filter((task: Task) => task.id !== taskId),
          total: Math.max((current.total ?? 1) - 1, 0),
        };
      });
      client.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
