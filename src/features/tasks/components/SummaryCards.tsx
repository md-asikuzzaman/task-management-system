import {
  AlertTriangle,
  CircleDashed,
  ListTodo,
  UserRoundX,
} from "lucide-react";

import type { TaskSummary } from "../types";

interface SummaryCardsProps {
  summary: TaskSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards: Array<{
    label: string;
    value: number;
    icon: typeof ListTodo;
    accent: keyof typeof accentMap;
  }> = [
    { label: "Total", value: summary.total, icon: ListTodo, accent: "primary" },
    {
      label: "In Progress",
      value: summary.inProgress,
      icon: CircleDashed,
      accent: "blue",
    },
    {
      label: "Overdue",
      value: summary.overdue,
      icon: AlertTriangle,
      accent: "red",
    },
    {
      label: "Unassigned",
      value: summary.unassigned,
      icon: UserRoundX,
      accent: "amber",
    },
  ];

  const accentMap = {
    primary: "bg-violet-100 text-violet-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-700",
  } as const;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, accent }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {value}
              </p>
            </div>
            <div className={`rounded-lg p-2.5 ${accentMap[accent]}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
