export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type SortField =
  | "createdAt"
  | "updatedAt"
  | "dueDate"
  | "title"
  | "priority";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  owner?: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  ownerId?: string;
  dueDate?: string;
}

export interface TaskQuery {
  search?: string;
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
  owner?: string | "all";
  sort?: SortField;
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  summary: TaskSummary;
}

export interface TaskSummary {
  total: number;
  inProgress: number;
  overdue: number;
  unassigned: number;
}
