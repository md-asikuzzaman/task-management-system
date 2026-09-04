import { mockTaskApi } from "./mockTaskApi";
import type {
  CreateTaskInput,
  Task,
  TaskListResponse,
  TaskQuery,
  TaskStatus,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error("No API URL configured");
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json() as Promise<T>;
}

export const taskApi = {
  async getTasks(query: TaskQuery = {}): Promise<TaskListResponse> {
    // throw new Error("Failed to load tasks");

    if (!API_URL) {
      
      return mockTaskApi.getTasks(query);
    }

    const search = new URLSearchParams();
    if (query.search) search.set("search", query.search);
    if (query.status && query.status !== "all")
      search.set("status", query.status);
    if (query.priority && query.priority !== "all")
      search.set("priority", query.priority);
    if (query.owner && query.owner !== "all") search.set("owner", query.owner);
    if (query.sort) search.set("sort", query.sort);
    if (query.order) search.set("order", query.order);
    if (query.page) search.set("page", String(query.page));
    if (query.pageSize) search.set("pageSize", String(query.pageSize));

    return request<TaskListResponse>(`/tasks?${search.toString()}`);
  },

  async getTask(taskId: string): Promise<Task> {
    if (!API_URL) {
      return mockTaskApi.getTask(taskId);
    }

    return request<Task>(`/tasks/${taskId}`);
  },

  async createTask(input: CreateTaskInput): Promise<Task> {
    if (!API_URL) {
      return mockTaskApi.createTask(input);
    }

    return request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updateTask(
    taskId: string,
    input: Partial<CreateTaskInput>,
  ): Promise<Task> {
    if (!API_URL) {
      return mockTaskApi.updateTask(taskId, input);
    }

    return request<Task>(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    if (!API_URL) {
      return mockTaskApi.updateTaskStatus(taskId, status);
    }

    return request<Task>(`/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  async deleteTask(taskId: string): Promise<void> {
    if (!API_URL) {
      return mockTaskApi.deleteTask(taskId);
    }

    await request<void>(`/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
};
