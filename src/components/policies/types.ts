export type PriorityValue = "HIGH" | "MEDIUM" | "LOW";
export type StatusValue = "TODO" | "IN_PROGRESS" | "DONE";

export type Policy = {
  id: number;
  name: string;
  requesterName: string;
  ownerName: string;
  priority: PriorityValue;
  status: StatusValue;
  pastIssues: string;
  systemDescription: string;
  effect: string;
  estimatedDuration: string;
  actualDuration: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type PolicyInput = Omit<Policy, "id" | "createdAt" | "updatedAt">;
