import type {
  CreateTaskInput,
  Task,
  TaskListResponse,
  TaskPriority,
  TaskQuery,
  TaskStatus,
} from "../types";
import { isTaskOverdue } from "../utils/taskUtils";

const statusOptions: TaskStatus[] = ["todo", "in_progress", "review", "done"];
const priorityOptions: TaskPriority[] = ["low", "medium", "high", "urgent"];

const users = [
  {
    id: "u-1",
    name: "Alyssa Thompson",
    email: "alyssa@team.com",
    avatar: "AT",
  },
  { id: "u-2", name: "Marcus Chen", email: "marcus@team.com", avatar: "MC" },
  { id: "u-3", name: "Nadia Patel", email: "nadia@team.com", avatar: "NP" },
  { id: "u-4", name: "Daniel Brooks", email: "daniel@team.com", avatar: "DB" },
  {
    id: "u-5",
    name: "Jasmine Alvarez",
    email: "jasmine@team.com",
    avatar: "JA",
  },
  { id: "u-6", name: "Ethan Walker", email: "ethan@team.com", avatar: "EW" },
  { id: "u-7", name: "Priya Nair", email: "priya@team.com", avatar: "PN" },
  { id: "u-8", name: "Samuel Ortiz", email: "samuel@team.com", avatar: "SO" },
  { id: "u-9", name: "Olivia Martin", email: "olivia@team.com", avatar: "OM" },
  { id: "u-10", name: "Noah Kim", email: "noah@team.com", avatar: "NK" },
  {
    id: "u-11",
    name: "Sophia Rodriguez",
    email: "sophia@team.com",
    avatar: "SR",
  },
  {
    id: "u-12",
    name: "Alexander Johnson",
    email: "alex@team.com",
    avatar: "AJ",
  },
  { id: "u-13", name: "Ming Long", email: "ming@team.com", avatar: "ML" },
  {
    id: "u-14",
    name: "Rebecca Nguyen",
    email: "rebecca@team.com",
    avatar: "RN",
  },
  {
    id: "u-15",
    name: "Christopher Evans",
    email: "christopher@team.com",
    avatar: "CE",
  },
  { id: "u-16", name: "Hannah Patel", email: "hannah@team.com", avatar: "HP" },
  { id: "u-17", name: "Zoe Richardson", email: "zoe@team.com", avatar: "ZR" },
  {
    id: "u-18",
    name: "Benjamin Lopez",
    email: "benjamin@team.com",
    avatar: "BL",
  },
  {
    id: "u-19",
    name: "Avery Elizabeth Thompson-Smith",
    email: "avery@team.com",
    avatar: "AT",
  },
  { id: "u-20", name: "Lucas Grant", email: "lucas@team.com", avatar: "LG" },
];

const longTitles = [
  "Finalize the payroll export validation for the Q4 global operations handoff",
  "Review the customer retention experiment and confirm rollout readiness for the north region",
  "Create a cleanup plan for stale support tickets and overdue follow-ups across all product pods",
  "Prepare the launch communication brief for the new invoicing workflow and internal rollout checklist",
  "Audit the onboarding checklist for contractor accounts and update the handoff requirements for HR",
  "Reconcile cross-border payment exceptions from the last two billing cycles before the audit closeout",
  "Update the design system tokens for dark mode accessibility and document the contrast review notes",
  "Coordinate seasonal campaign assets with marketing and verify final signoff for the landing page launch",
  "Document the incident summary for the API latency spike and confirm mitigation steps with engineering",
  "Revise the warehouse handoff checklist for fulfillment turnover and confirm inventory ownership by site",
  "Plan the migration sequence for the legacy support portal and define cutover safeguards for customer data",
  "Benchmark the new sprint planning board process and capture improvements for team retrospectives",
  "Validate review comments on the client portal redesign and merge the approved edits before Friday",
  "Track the open bug backlog across the mobile app and prioritize blockers by severity and customer impact",
  "Publish the customer success recap with next-step actions and highlight dependencies for product ops",
  "Review the launch readiness checklist for the new analytics dashboard and confirm integration testing status",
  "Refresh the knowledge base for recurring support issues and update the escalation path for billing cases",
  "Prepare the sales handoff package for enterprise accounts and verify required proof points before meetings",
  "Confirm security patch coverage for shared infrastructure and schedule the change review window",
  "Resolve duplicate task ownership for the compliance review queue and align owners by department",
  "Draft the policy update for remote work equipment reimbursement and finalize final reviewer notes",
  "Align the roadmap for marketplace integrations and validate dependencies with platform engineering",
  "Validate the customer feedback taxonomy and standardize tagging before the next reporting cycle",
  "Map the contract renewal timeline for strategic accounts and review exit clauses with legal",
  "Clean up the approval matrix for vendor onboarding and update archived exceptions for audit readiness",
  "Finalize the release checklist for the payment retry flow and confirm staging signoff by product",
  "Prepare the internal handoff for the operations dashboard and capture stakeholder feedback in one place",
  "Groom the backlog for the customer support automation project and confirm acceptance criteria with the team",
  "Review finance inputs for the Q1 forecast and confirm assumptions for restructuring project costs",
  "Document API deprecation risks for the partner integration and prepare the migration schedule for teams",
  "Standardize the PR checklist for infra changes and confirm whether the rollout steps match production policy",
  "Review the architecture notes for the supplier portal redesign and capture open questions for the next sync",
  "Prepare a summary of customer health indicators for executive review and confirm the latest account updates",
];

const descriptions = [
  "This task requires coordination across product, engineering, and operations before the next release gate.",
  "Needs final review and follow-up on open blockers before the work can move to completion.",
  "The owner should review the existing checklist, confirm assumptions, and provide any missing context.",
  "This is a high-visibility request that needs stakeholder alignment and a documented plan.",
  "Draft the final summary, clarify open decisions, and capture required signoff before the deadline.",
  "Please confirm whether the current implementation covers all edge cases and customer scenarios.",
  "The work needs a careful pass on dependencies and final validation before release.",
  "Follow up on any unresolved issues from the last review and ensure no blockers remain open.",
  undefined,
  "This includes risk review, communication updates, and final ownership assignment for execution.",
  "Validate all linked tasks and dependencies before the next milestone handoff.",
  "Review the latest notes and confirm the priority order against the broader roadmap.",
  "Recommended to start with a quick triage and confirm whether this should be delegated or completed in-house.",
  "Key decision points are documented; the remaining work is focused on cleanup and final verification.",
  undefined,
  "Requires review of impacted systems and a concise communication update to all relevant stakeholders.",
];

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

const datasetCreatedAt = new Date();

function buildISODate(offsetDays: number) {
  const date = new Date(datasetCreatedAt);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function makeTask(index: number): Task {
  const createdDaysAgo = (index * 11) % 90;
  const createdAt = new Date(datasetCreatedAt);
  createdAt.setDate(createdAt.getDate() - createdDaysAgo);

  const status = statusOptions[index % statusOptions.length];
  const priority = priorityOptions[(index * 3) % priorityOptions.length];
  const isOwnerMissing = index % 9 === 0;
  const isLongTitle = index % 5 === 0;
  const owner = isOwnerMissing ? undefined : users[index % users.length];
  const hasDescription = index % 11 !== 0;
  const hasDueDate = index % 7 !== 0;

  const dueOffset =
    index % 18 === 0
      ? -7
      : index % 23 === 0
        ? 0
        : index % 29 === 0
          ? 8
          : (index % 12) - 3;
  const dueDate = hasDueDate ? buildISODate(dueOffset) : undefined;

  const openedAt = new Date(createdAt);
  openedAt.setDate(openedAt.getDate() + (index % 6));

  return {
    id: `task-${index + 1}`,
    title: isLongTitle
      ? longTitles[index % longTitles.length]
      : `Task ${index + 1}: ${longTitles[index % longTitles.length].slice(0, 45)}`,
    description: hasDescription
      ? descriptions[index % descriptions.length]
      : undefined,
    status,
    priority,
    owner,
    dueDate,
    createdAt: openedAt.toISOString(),
    updatedAt: new Date(
      openedAt.getTime() + (index % 8) * 86400000,
    ).toISOString(),
  };
}

const tasks: Task[] = Array.from({ length: 248 }, (_, index) =>
  makeTask(index),
);

async function wait(ms = 300) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const mockTaskApi = {
  async getTasks(query: TaskQuery = {}): Promise<TaskListResponse> {
    await wait();

    const search = (query.search ?? "").trim().toLowerCase();
    const status = query.status ?? "all";
    const priority = query.priority ?? "all";
    const owner = query.owner ?? "all";
    const sort = query.sort ?? "updatedAt";
    const order = query.order ?? "desc";
    const page = Math.max(1, Number(query.page ?? 1));
    const pageSize = Math.max(1, Number(query.pageSize ?? 10));

    const summary = {
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      overdue: tasks.filter((task) => isTaskOverdue(task)).length,
      unassigned: tasks.filter((task) => !task.owner).length,
    };

    let filtered = [...tasks];

    if (search) {
      filtered = filtered.filter((task) => {
        const ownerName = task.owner?.name ?? "";
        return (
          task.title.toLowerCase().includes(search) ||
          ownerName.toLowerCase().includes(search) ||
          task.description?.toLowerCase().includes(search)
        );
      });
    }

    if (status !== "all") {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (priority !== "all") {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    if (owner !== "all") {
      filtered = filtered.filter((task) => task.owner?.id === owner);
    }

    filtered.sort((a, b) => {
      const direction = order === "asc" ? 1 : -1;

      if (sort === "priority") {
        return (
          ((priorityOptions.indexOf(a.priority) ?? 0) -
            (priorityOptions.indexOf(b.priority) ?? 0)) *
          direction
        );
      }

      if (sort === "title") {
        return a.title.localeCompare(b.title) * direction;
      }

      const aValue = a[sort] ?? "";
      const bValue = b[sort] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return comparison !== 0
          ? comparison * direction
          : a.id.localeCompare(b.id);
      }

      const comparison =
        (new Date(aValue as string).getTime() || 0) -
        (new Date(bValue as string).getTime() || 0);
      return comparison !== 0
        ? comparison * direction
        : a.id.localeCompare(b.id);
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      tasks: paginated,
      total,
      page: safePage,
      pageSize,
      totalPages,
      summary,
    };
  },

  async getTask(taskId: string): Promise<Task> {
    await wait();
    const task = tasks.find((item) => item.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  },

  async createTask(input: CreateTaskInput): Promise<Task> {
    await wait(450);

    const owner = users.find((person) => person.id === input.ownerId);
    const createdAt = new Date().toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      status: input.status,
      priority: input.priority,
      owner,
      dueDate: input.dueDate || undefined,
      createdAt,
      updatedAt: createdAt,
    };

    tasks.unshift(newTask);
    return newTask;
  },

  async updateTask(
    taskId: string,
    input: Partial<CreateTaskInput>,
  ): Promise<Task> {
    await wait(350);
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }

    const current = tasks[index];
    const updated: Task = {
      ...current,
      ...input,
      title: input.title?.trim() || current.title,
      description:
        input.description !== undefined
          ? input.description?.trim() || undefined
          : current.description,
      updatedAt: new Date().toISOString(),
      owner: input.ownerId
        ? users.find((person) => person.id === input.ownerId)
        : current.owner,
    };

    tasks[index] = updated;
    return updated;
  },

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    await wait(250);
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }

    const updated = {
      ...tasks[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = updated;
    return updated;
  },

  async deleteTask(taskId: string): Promise<void> {
    await wait(200);
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
  },
};

export const mockUsers = users;
