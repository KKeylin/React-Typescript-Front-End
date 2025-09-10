import { useCallback, useEffect, useState } from "react";
import type { Task, NewTask, TaskPatch } from "../model/types";
import * as repo from "../model/store";
import { TASKS_STORAGE_KEY } from "../constants";

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>(() => repo.loadTasks());

	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === TASKS_STORAGE_KEY) setTasks(repo.loadTasks());
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	const create = useCallback((data: NewTask) => {
		setTasks(prev => repo.createTask(prev, data));
	}, []);
	const update = useCallback((id: string, patch: TaskPatch) => {
		setTasks(prev => repo.updateTask(prev, id, patch));
	}, []);
	const remove = useCallback((id: string) => {
		setTasks(prev => repo.deleteTask(prev, id));
	}, []);

	return { tasks, create, update, remove };
};
