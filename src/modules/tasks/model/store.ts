import { Task, NewTask, TaskPatch } from "./types";
import { TASKS_STORAGE_KEY } from "@/modules/tasks/constants.ts";

export const loadTasks = (): Task[] => {
	try { return JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || "[]"); }
	catch { return []; }
};
export const saveTasks = (tasks: Task[]) =>
	localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

let counter = 0;
const genId = () => `${Date.now()}-${++counter}`;

export const createTask = (tasks: Task[], data: NewTask): Task[] => {
	const now = new Date().toISOString();
	const t: Task = { id: genId(), createdAt: now, updatedAt: now, ...data };
	const next = [t, ...tasks]; saveTasks(next); return next;
};

export const updateTask = (tasks: Task[], id: string, patch: TaskPatch): Task[] => {
	const now = new Date().toISOString();
	const next = tasks.map(t => t.id === id ? { ...t, ...patch, updatedAt: now } : t);
	saveTasks(next); return next;
};

export const deleteTask = (tasks: Task[], id: string): Task[] => {
	const next = tasks.filter(t => t.id !== id); saveTasks(next); return next;
};
