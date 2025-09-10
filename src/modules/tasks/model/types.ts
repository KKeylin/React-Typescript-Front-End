export type TaskId = string;
export enum Priority { High = 'high', Medium = 'medium', Low = 'low'}

export const TaskStatusLabel: Record<Priority, string> = {
	[Priority.High]: "High",
	[Priority.Medium]: "Medium",
	[Priority.Low]: "Low",
};

export const taskStatusOptions = Object.entries(TaskStatusLabel).map(([value, label]) => ({
	value: value as Priority,
	label
}));

export interface Task {
	id: TaskId;
	title: string;
	description?: string;
	priority: Priority;
	isComplete: boolean;
	dueDate?: string;
	createdAt: string;
	updatedAt: string;
}

export const defaultTaskId: TaskId = "0";

export type NewTask   = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type TaskPatch = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;
