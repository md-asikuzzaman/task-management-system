import { getPriorityBadgeClasses, priorityLabels } from "../utils/taskUtils";
import type { TaskPriority } from "../types";

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getPriorityBadgeClasses(priority)}`}
    >
      {priorityLabels[priority]}
    </span>
  );
}
