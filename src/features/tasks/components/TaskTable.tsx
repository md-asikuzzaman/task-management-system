import { AlertTriangle, ChevronDown, MoreHorizontal, PencilLine } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { Task, TaskStatus } from "../types";
import { formatDate, getOwnerName, isTaskOverdue, statusLabels } from "../utils/taskUtils";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";

const statusCycle: TaskStatus[] = ["todo", "in_progress", "review", "done"];

interface TaskTableProps {
  tasks: Task[];
  isLoading?: boolean;
  onOpenTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export function TaskTable({ tasks, isLoading, onOpenTask, onStatusChange }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Due Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const overdue = isTaskOverdue(task);
              return (
                <tr key={task.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => onOpenTask(task.id)}
                      className="max-w-[280px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
                    >
                      <div className="flex items-start gap-2">
                        {overdue ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> : null}
                        <div>
                          <div className="truncate font-medium text-slate-900">{task.title}</div>
                          {task.description ? (
                            <div className="mt-1 max-w-[240px] truncate text-xs text-slate-500">{task.description}</div>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      {task.owner ? (
                        <>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                            {task.owner.avatar ?? task.owner.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="max-w-[140px] truncate text-sm text-slate-700">{task.owner.name}</span>
                        </>
                      ) : (
                        <span className="text-sm text-slate-400">Unassigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
                          aria-label={`Change status for ${task.title}`}
                        >
                          <TaskStatusBadge status={task.status} />
                          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content align="start" className="z-50 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                          {statusCycle.map((status) => (
                            <DropdownMenu.Item
                              key={status}
                              onSelect={() => onStatusChange(task.id, status)}
                              className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-100 focus:bg-slate-100"
                            >
                              <span>{statusLabels[status]}</span>
                              {task.status === status ? <span className="text-violet-600">✓</span> : null}
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <TaskPriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="space-y-1 text-sm text-slate-700">
                      <div className={overdue ? "font-medium text-red-600" : ""}>{formatDate(task.dueDate)}</div>
                      {task.dueDate ? (
                        <div className="text-xs text-slate-500">
                          {new Date(task.dueDate).toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenTask(task.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button type="button" aria-label={`Open actions for ${task.title}`} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3 p-3">
        {tasks.map((task) => {
          const overdue = isTaskOverdue(task);
          return (
            <article key={task.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <button type="button" onClick={() => onOpenTask(task.id)} className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200">
                  <div className="flex items-start gap-2">
                    {overdue ? <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-red-500" /> : null}
                    <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
                  </div>
                </button>
                <TaskPriorityBadge priority={task.priority} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                <span>Owner</span>
                <span className="font-medium text-slate-700">{getOwnerName(task.owner)}</span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                <span>Due</span>
                <span className={overdue ? "font-medium text-red-600" : "font-medium text-slate-700"}>{formatDate(task.dueDate)}</span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200">
                      <TaskStatusBadge status={task.status} />
                      <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="start" className="z-50 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                    {statusCycle.map((status) => (
                      <DropdownMenu.Item
                        key={status}
                        onSelect={() => onStatusChange(task.id, status)}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-100 focus:bg-slate-100"
                      >
                        <span>{statusLabels[status]}</span>
                        {task.status === status ? <span className="text-violet-600">✓</span> : null}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                <button type="button" onClick={() => onOpenTask(task.id)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200">
                  Details
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {isLoading ? <div className="p-4 text-sm text-slate-500">Loading tasks…</div> : null}
    </div>
  );
}
