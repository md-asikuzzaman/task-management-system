import type { ReactNode } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, Clock3, UserRound, X } from "lucide-react";

import { useTask } from "../hooks/useTasks";
import { formatDateTime, statusLabels } from "../utils/taskUtils";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";

interface TaskDetailsDialogProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-800">{value}</div>
    </div>
  );
}

export function TaskDetailsDialog({
  taskId,
  open,
  onOpenChange,
}: TaskDetailsDialogProps) {
  const { data: task, isLoading, isError } = useTask(taskId ?? "");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/35" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:inset-y-6 sm:left-1/2 sm:right-auto sm:max-h-[calc(100dvh-3rem)] sm:-translate-x-1/2 sm:rounded-2xl">
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-slate-900">
              Task details
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
                aria-label="Close task details dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {(isLoading || isError || !task) && !taskId ? (
              <div className="py-6 text-sm text-slate-500">
                No task selected.
              </div>
            ) : null}

            {isLoading ? (
              <div className="py-6 text-sm text-slate-500">Loading task…</div>
            ) : null}

            {isError ? (
              <div className="py-6 text-sm text-red-600">
                Couldn’t load task details.
              </div>
            ) : null}

            {task ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 break-words">
                      <h3 className="break-words text-xl font-semibold text-slate-900">
                        {task.title}
                      </h3>
                      <p className="mt-2 break-words text-sm text-slate-600">
                        {task.description || "No description provided."}
                      </p>
                    </div>
                    <TaskPriorityBadge priority={task.priority} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailRow
                    label="Owner"
                    value={
                      task.owner ? (
                        <span className="flex items-center gap-2">
                          <UserRound className="h-4 w-4 text-slate-500" />
                          {task.owner.name}
                        </span>
                      ) : (
                        "Unassigned"
                      )
                    }
                  />
                  <DetailRow
                    label="Status"
                    value={<TaskStatusBadge status={task.status} />}
                  />
                  <DetailRow
                    label="Priority"
                    value={<TaskPriorityBadge priority={task.priority} />}
                  />
                  <DetailRow
                    label="Due date"
                    value={
                      task.dueDate ? (
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-slate-500" />
                          {formatDateTime(task.dueDate)}
                        </span>
                      ) : (
                        "No due date"
                      )
                    }
                  />
                  <DetailRow
                    label="Created"
                    value={
                      <span className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-500" />
                        {formatDateTime(task.createdAt)}
                      </span>
                    }
                  />
                  <DetailRow
                    label="Updated"
                    value={
                      <span className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-500" />
                        {formatDateTime(task.updatedAt)}
                      </span>
                    }
                  />
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">
                    Status label:
                  </span>{" "}
                  {statusLabels[task.status]}
                </div>
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
