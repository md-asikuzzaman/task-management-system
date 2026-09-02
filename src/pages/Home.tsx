import { useMemo } from "react";

import Container from "../components/Container";
import { CreateTaskDialog } from "../features/tasks/components/CreateTaskDialog";
import { EmptyState } from "../features/tasks/components/EmptyState";
import { ErrorState } from "../features/tasks/components/ErrorState";
import { LoadingSkeleton } from "../features/tasks/components/LoadingSkeleton";
import { Pagination } from "../features/tasks/components/Pagination";
import { SummaryCards } from "../features/tasks/components/SummaryCards";
import { TaskDetailsDialog } from "../features/tasks/components/TaskDetailsDialog";
import { TaskTable } from "../features/tasks/components/TaskTable";
import { TaskToolbar } from "../features/tasks/components/TaskToolbar";
import { useTaskQueryState } from "../features/tasks/hooks/useTaskQueryState";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { useUpdateTaskStatus } from "../features/tasks/hooks/useTaskMutations";
import { useTaskUiStore } from "../stores/taskUiStore";

const Home = () => {
  const { query, setPage, clearFilters } = useTaskQueryState();
  const { data, isLoading, isError, refetch } = useTasks(query);
  const updateStatus = useUpdateTaskStatus();
  const createTaskOpen = useTaskUiStore((state) => state.createTaskOpen);
  const detailDialogOpen = useTaskUiStore((state) => state.detailDialogOpen);
  const selectedTaskId = useTaskUiStore((state) => state.selectedTaskId);
  const setCreateTaskOpen = useTaskUiStore((state) => state.setCreateTaskOpen);
  const setDetailDialogOpen = useTaskUiStore(
    (state) => state.setDetailDialogOpen,
  );
  const setSelectedTaskId = useTaskUiStore((state) => state.setSelectedTaskId);

  const tasks = data?.tasks ?? [];
  const page = data?.page ?? query.page ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const summary = data?.summary ?? {
    total: 0,
    inProgress: 0,
    overdue: 0,
    unassigned: 0,
  };

  const hasResults = useMemo(() => tasks.length > 0, [tasks.length]);

  const handleStatusChange = (
    taskId: string,
    status: "todo" | "in_progress" | "review" | "done",
  ) => {
    updateStatus.mutate({ taskId, status });
  };

  const handleOpenTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDetailDialogOpen(true);
  };

  return (
    <Container className="space-y-6 py-6">
      <SummaryCards summary={summary} />

      <TaskToolbar onCreateTask={() => setCreateTaskOpen(true)} />

      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorState
          message="Please check your connection and try again."
          onRetry={() => refetch()}
        />
      ) : !hasResults ? (
        <EmptyState
          title={
            query.search ||
            query.status !== "all" ||
            query.priority !== "all" ||
            query.owner !== "all"
              ? "No tasks match your filters"
              : "No tasks yet"
          }
          description={
            query.search ||
            query.status !== "all" ||
            query.priority !== "all" ||
            query.owner !== "all"
              ? "Try adjusting the filters to widen the results."
              : "Get started by adding your first team task."
          }
          actionLabel={
            query.search ||
            query.status !== "all" ||
            query.priority !== "all" ||
            query.owner !== "all"
              ? "Clear filters"
              : "Add task"
          }
          onAction={() => {
            if (
              query.search ||
              query.status !== "all" ||
              query.priority !== "all" ||
              query.owner !== "all"
            ) {
              clearFilters();
              return;
            }
            setCreateTaskOpen(true);
          }}
        />
      ) : (
        <>
          <TaskTable
            tasks={tasks}
            onOpenTask={handleOpenTask}
            onStatusChange={handleStatusChange}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <CreateTaskDialog
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
      />
      <TaskDetailsDialog
        taskId={selectedTaskId}
        open={detailDialogOpen}
        onOpenChange={(open) => {
          setDetailDialogOpen(open);
          if (!open) setSelectedTaskId(null);
        }}
      />
    </Container>
  );
};

export default Home;
