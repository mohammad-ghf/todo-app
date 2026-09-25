export type Filter = "all" | "active" | "completed";
export type priorityFilter = "all" | "low" | "medium" | "high";
export type Priority = "low" | "medium" | "high";

export interface TodoType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
}
