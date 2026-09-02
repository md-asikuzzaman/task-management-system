import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  SortAsc,
  X,
} from "lucide-react";
import { useMemo } from "react";

import { useTaskQueryState } from "../hooks/useTaskQueryState";
import { mockUsers } from "../api/mockTaskApi";
import type { TaskPriority, TaskStatus } from "../types";

const statusOptions: Array<{ value: TaskStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

const priorityOptions: Array<{ value: TaskPriority | "all"; label: string }> = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const sortOptions = [
  { value: "updatedAt", label: "Updated" },
  { value: "createdAt", label: "Created" },
  { value: "dueDate", label: "Due date" },
  { value: "title", label: "Title" },
  { value: "priority", label: "Priority" },
] as const;

interface FilterSelectProps {
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  "aria-label": string;
}

function FilterSelect({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
}: FilterSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 text-left text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          sideOffset={4}
          className="z-60 max-h-60 min-w-(--radix-select-trigger-width) overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-xl"
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-slate-700 outline-none data-highlighted:bg-slate-100"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function TaskToolbar({ onCreateTask }: { onCreateTask: () => void }) {
  const {
    query,
    setSearch,
    setStatus,
    setPriority,
    setOwner,
    setSort,
    clearFilters,
    hasActiveFilters,
  } = useTaskQueryState();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query.search) count += 1;
    if (query.status !== "all") count += 1;
    if (query.priority !== "all") count += 1;
    if (query.owner !== "all") count += 1;
    if (query.sort !== "updatedAt" || query.order !== "desc") count += 1;
    return count;
  }, [query]);

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query.search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks or owner"
            aria-label="Search tasks or owner"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="flex items-center gap-2 lg:justify-end">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {activeFilterCount > 0 ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-100 px-1 text-[10px] font-semibold text-violet-700">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-slate-900/35" />
              <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:inset-y-0 sm:left-auto sm:right-4 sm:top-4 sm:mx-0 sm:max-w-sm sm:rounded-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-slate-900">
                      Filters
                    </Dialog.Title>
                    <p className="text-sm text-slate-500">
                      Refine your task list
                    </p>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Status
                    </label>
                    <FilterSelect
                      value={query.status ?? "all"}
                      onChange={(value) =>
                        setStatus(value as TaskStatus | "all")
                      }
                      options={statusOptions}
                      aria-label="Status"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Priority
                    </label>
                    <FilterSelect
                      value={query.priority ?? "all"}
                      onChange={(value) =>
                        setPriority(value as TaskPriority | "all")
                      }
                      options={priorityOptions}
                      aria-label="Priority"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Owner
                    </label>
                    <FilterSelect
                      value={query.owner ?? "all"}
                      onChange={setOwner}
                      options={[
                        { value: "all", label: "All owners" },
                        ...mockUsers.map((user) => ({
                          value: user.id,
                          label: user.name,
                        })),
                      ]}
                      aria-label="Owner"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Sort
                    </label>
                    <FilterSelect
                      value={query.sort ?? "updatedAt"}
                      onChange={(value) =>
                        setSort(value as typeof query.sort, query.order)
                      }
                      options={sortOptions}
                      aria-label="Sort"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => clearFilters()}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
                    >
                      Apply
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
              >
                <SortAsc className="h-4 w-4" />
                <span>Sort</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="z-50 min-w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
              >
                {sortOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    onSelect={() => setSort(option.value, query.order)}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-100 focus:bg-slate-100"
                  >
                    {option.label}
                    {query.sort === option.value ? (
                      <SlidersHorizontal className="h-3.5 w-3.5 text-violet-600" />
                    ) : null}
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="my-1 h-px bg-slate-200" />
                <DropdownMenu.Item
                  onSelect={() =>
                    setSort(query.sort, query.order === "asc" ? "desc" : "asc")
                  }
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-100 focus:bg-slate-100"
                >
                  {query.order === "asc"
                    ? "Switch to descending"
                    : "Switch to ascending"}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            type="button"
            onClick={onCreateTask}
            className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
            disabled
          >
            New task
          </button>
        </div>
      </div>

      {hasActiveFilters ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-medium">Active:</span>
          {query.search ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">Search</span>
          ) : null}
          {query.status !== "all" ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">Status</span>
          ) : null}
          {query.priority !== "all" ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">
              Priority
            </span>
          ) : null}
          {query.owner !== "all" ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">Owner</span>
          ) : null}
          {query.sort !== "updatedAt" || query.order !== "desc" ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">Sort</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
