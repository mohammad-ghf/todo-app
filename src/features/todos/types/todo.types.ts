export type Filter = "all" | "active" | "completed" 
export type Priority = "low" | "medium" | "high";

export interface TodoType {
    id: number
    title: string
    description:string
    completed: boolean
    priority: Priority
}
