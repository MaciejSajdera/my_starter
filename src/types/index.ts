import type { DateTime } from "luxon";

// Core project management types following B.R.E.A.K methodology

export type ProjectStatus =
  | "planning"
  | "active"
  | "on-hold"
  | "completed"
  | "cancelled";

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "review"
  | "completed"
  | "blocked";

export type Priority = "low" | "medium" | "high" | "critical";

export type BoundaryDefinition = {
  inScope: string[];
  outOfScope: string[];
  acceptanceCriteria: string[];
  dependencies: string[];
  blockers: string[];
};

export type RequirementSet = {
  functional: string[];
  nonFunctional: string[];
  businessGoals: string[];
  integrations: string[];
  constraints: string[];
};

export type EdgeCase = {
  id: string;
  scenario: string;
  impact: "low" | "medium" | "high" | "critical";
  mitigation: string;
  status: "identified" | "planned" | "mitigated";
};

export type ArchitectureDecision = {
  id: string;
  decision: string;
  rationale: string;
  alternatives: string[];
  consequences: string[];
  status: "proposed" | "accepted" | "superseded";
};

export type Metric = {
  id: string;
  name: string;
  description: string;
  target: string;
  measurement: string;
  frequency: string;
  status: "defined" | "tracking" | "achieved";
};

export type Risk = {
  id: string;
  description: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high" | "critical";
  mitigation: string;
  owner?: string;
  status: "identified" | "planned" | "mitigating" | "mitigated";
};

export type BreakAnalysis = {
  boundaries: BoundaryDefinition;
  requirements: RequirementSet;
  edgeCases: EdgeCase[];
  architecture: ArchitectureDecision[];
  keyMetrics: Metric[];
  lastUpdated: DateTime;
  completeness: number; // 0-100 percentage
};

export type Task = {
  id: string;
  parentId: string | null;
  projectId: string;
  title: string;
  description: string;
  subtasks: Task[];
  estimatedEffort: number; // in hours
  actualEffort: number | null;
  priority: Priority;
  status: TaskStatus;
  dependencies: string[]; // task IDs
  risks: Risk[];
  assignee?: string;
  dueDate?: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
  tags: string[];
  notes: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  breakAnalysis: BreakAnalysis;
  tasks: Task[];
  createdAt: DateTime;
  updatedAt: DateTime;
  status: ProjectStatus;
  owner: string;
  collaborators: string[];
  tags: string[];
  dueDate?: DateTime;
  progress: {
    completedTasks: number;
    totalTasks: number;
    completedEffort: number;
    totalEstimatedEffort: number;
  };
};

export type PlanningChecklist = {
  problemStatement: string;
  keyQuestions: string[];
  potentialRisks: string[];
  approach: string;
  alternative: string;
  definitionOfDone: string;
};

// UI State types
export type ViewMode = "list" | "kanban" | "gantt" | "hierarchy";

export type FilterOptions = {
  status?: TaskStatus[];
  priority?: Priority[];
  assignee?: string[];
  tags?: string[];
  dueDateRange?: {
    start: DateTime;
    end: DateTime;
  };
};

export type SortOptions = {
  field: "title" | "priority" | "dueDate" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
};
