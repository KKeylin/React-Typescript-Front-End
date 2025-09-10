import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus } from "lucide-react";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
import { TaskForm } from "./TaskForm";
import { TaskCard } from "./TaskCard";
import { useCallback, useState } from "react";
import { TaskPatch } from "@/modules/tasks";
import { Card, CardContent } from "@/components/ui/card";

export const TasksSection = () => {
	const {tasks, create, update, remove} = useTasks()
	const [editingId, setEditingId] = useState<string | null>(null);
	const [showCreate, setShowCreate] = useState(false)

	const startEdit = useCallback((id: string) => setEditingId(id), []);
	const cancelEdit = useCallback(() => setEditingId(null), []);
	const save = useCallback((id: string, patch: TaskPatch) => {
		update(id, patch);
		setEditingId(null);
	}, [update]);

	const onCreate = data => {
		create(data);
		setShowCreate(false)

	}

	return (
		<div>
			<div className="flex items-center justify-between space-y-4">
				<div>
					<h2 className="text-2xl font-semibold">My Tasks</h2>
					<p className="text-muted-foreground">
						{tasks.length === 0 ? "No tasks yet" : `${tasks.length} tasks`}
					</p>
				</div>
				<Button onClick={() => setShowCreate(v => !v)}
								className="bg-primary hover:bg-primary/90"
				>
					<Plus className={["w-4", "h-4", "mr-2", "transform-gpu", showCreate ? "rotate-45" : "rotate-0"].join(" ")}/>
					{showCreate ? "Close" : "Add Task"}
				</Button>
			</div>

			{showCreate && (
				<TaskForm
					tasks={tasks}
					onCreate={onCreate}
					onCancel={() => setShowCreate(false)}
				/>)}

			{tasks.length === 0 ?
				(
					<Card className="border-dashed mt-6">
						<CardContent className="flex flex-col items-center justify-center py-12">
							<CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4"/>
							<h3 className="text-lg font-medium mb-2">No tasks yet</h3>
							<p className="text-muted-foreground text-center max-w-sm">
								Get started by creating your first task. Click the "Add Task" button above.
							</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4">
						{tasks.map((t) => (
							<TaskCard
								key={t.id}
								task={t}
								isEditing={editingId === t.id}
								onStartEdit={() => startEdit(t.id)}
								onCancelEdit={cancelEdit}
								onSave={(patch) => save(t.id, patch)}
								onDelete={() => remove(t.id)}
							/>
						))}
					</div>)}
		</div>
	);
}
