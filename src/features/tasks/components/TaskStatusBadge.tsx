import { getStatusBadgeClasses, statusLabels } from "../utils/taskUtils";
import type { TaskStatus } from "../types";

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClasses(status)}`}
    >
      {statusLabels[status]}
    </span>
  );
}
