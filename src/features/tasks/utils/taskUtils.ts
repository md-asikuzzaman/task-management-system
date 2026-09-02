import type { Task, TaskPriority, TaskStatus } from "../types";

export const statusLabels: Record<TaskStatus, string> = {
  todo: "Todo",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const statusOrder: Record<TaskStatus, number> = {
  todo: 0,
  in_progress: 1,
  review: 2,
  done: 3,
};

export const priorityOrder: Record<TaskPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  urgent: 3,
};

export function formatDate(date?: string) {
  if (!date) return "No due date";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "No due date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function formatDateTime(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

export function isTaskOverdue(task: Task) {
  if (!task.dueDate) return false;

  const due = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due < today && task.status !== "done";
}

export function isTaskDueSoon(task: Task) {
  if (!task.dueDate) return false;

  const due = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((due.getTime() - today.getTime()) / 86400000);
  return diffDays >= 0 && diffDays <= 2 && task.status !== "done";
}

export function getPriorityBadgeClasses(priority: TaskPriority) {
  switch (priority) {
    case "low":
      return "bg-slate-100 text-slate-700 ring-slate-200";
    case "medium":
      return "bg-amber-100 text-amber-700 ring-amber-200";
    case "high":
      return "bg-orange-100 text-orange-700 ring-orange-200";
    case "urgent":
      return "bg-red-100 text-red-700 ring-red-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

export function getStatusBadgeClasses(status: TaskStatus) {
  switch (status) {
    case "todo":
      return "bg-slate-100 text-slate-700 ring-slate-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 ring-blue-200";
    case "review":
      return "bg-violet-100 text-violet-700 ring-violet-200";
    case "done":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

export function getOwnerName(owner?: { name?: string }) {
  return owner?.name ?? "Unassigned";
}
