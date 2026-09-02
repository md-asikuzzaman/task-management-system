import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { TaskPriority, TaskQuery, TaskStatus } from "../types";

const validStatus = ["all", "todo", "in_progress", "review", "done"] as const;
const validPriority = ["all", "low", "medium", "high", "urgent"] as const;
const validSort = ["updatedAt", "createdAt", "dueDate", "title", "priority"] as const;

function getValue<T extends string>(value: string | null, options: readonly T[], fallback: T) {
  if (!value) return fallback;
  return options.includes(value as T) ? (value as T) : fallback;
}

export function useTaskQueryState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query: TaskQuery = useMemo(() => {
    const rawPage = Number(searchParams.get("page") ?? "1");
    const rawSize = Number(searchParams.get("pageSize") ?? "10");

    return {
      search: searchParams.get("search") ?? "",
      status: getValue(searchParams.get("status"), validStatus, "all"),
      priority: getValue(searchParams.get("priority"), validPriority, "all"),
      owner: searchParams.get("owner") ?? "all",
      sort: getValue(searchParams.get("sort"), validSort, "updatedAt"),
      order: searchParams.get("order") === "asc" ? "asc" : "desc",
      page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
      pageSize: Number.isFinite(rawSize) && rawSize > 0 ? rawSize : 10,
    };
  }, [searchParams]);

  const setQuery = (next: Partial<TaskQuery>) => {
    const params = new URLSearchParams(searchParams);

    const entries: Array<[string, string | undefined]> = Object.entries(next).map(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === "all") {
        params.delete(key);
        return [key, undefined];
      }

      if (key === "page" || key === "pageSize") {
        const numericValue = Number(value);
        if (Number.isFinite(numericValue) && numericValue > 0) {
          params.set(key, String(numericValue));
        } else {
          params.delete(key);
        }
        return [key, String(value)];
      }

      params.set(key, String(value));
      return [key, String(value)];
    });

    const shouldResetPage = entries.some(([key]) => key === "search" || key === "status" || key === "priority" || key === "owner" || key === "sort" || key === "order");
    if (shouldResetPage) {
      params.delete("page");
    }

    setSearchParams(params, { replace: true });
  };

  const setSearch = (search: string) => setQuery({ search, page: 1 });
  const setStatus = (status: TaskStatus | "all") => setQuery({ status, page: 1 });
  const setPriority = (priority: TaskPriority | "all") => setQuery({ priority, page: 1 });
  const setOwner = (owner: string | "all") => setQuery({ owner, page: 1 });
  const setSort = (sort: TaskQuery["sort"], order: TaskQuery["order"] = "desc") => setQuery({ sort, order, page: 1 });
  const setPage = (page: number) => setQuery({ page });
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("status");
    params.delete("priority");
    params.delete("owner");
    params.delete("sort");
    params.delete("order");
    params.delete("page");
    setSearchParams(params, { replace: true });
  };

  const hasActiveFilters = Boolean(
    query.search ||
      query.status !== "all" ||
      query.priority !== "all" ||
      query.owner !== "all" ||
      query.sort !== "updatedAt" ||
      query.order !== "desc",
  );

  return {
    query,
    setSearch,
    setStatus,
    setPriority,
    setOwner,
    setSort,
    setPage,
    clearFilters,
    hasActiveFilters,
  };
}
