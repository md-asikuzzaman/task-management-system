import { create } from "zustand";

interface TaskUiState {
  createTaskOpen: boolean;
  filterSheetOpen: boolean;
  detailDialogOpen: boolean;
  selectedTaskId: string | null;
  setCreateTaskOpen: (open: boolean) => void;
  setFilterSheetOpen: (open: boolean) => void;
  setDetailDialogOpen: (open: boolean) => void;
  setSelectedTaskId: (id: string | null) => void;
}

export const useTaskUiStore = create<TaskUiState>((set) => ({
  createTaskOpen: false,
  filterSheetOpen: false,
  detailDialogOpen: false,
  selectedTaskId: null,
  setCreateTaskOpen: (open) => set({ createTaskOpen: open }),
  setFilterSheetOpen: (open) => set({ filterSheetOpen: open }),
  setDetailDialogOpen: (open) => set({ detailDialogOpen: open }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
}));
