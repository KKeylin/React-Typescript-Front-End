// src/modules/tasks/ui/TaskCard.tsx
import { useEffect, useState, useCallback } from "react";
import type { Task, TaskPatch, Priority } from "../model/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import PrioritySwitcher from "@/modules/tasks/ui/PrioritySwitcher";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, AlertTriangle, CheckCircle2, Circle, X } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ymdToLocalDate } from "@/lib/date";
import { getDueInfo } from "@/lib/date";
import { DESC_MAX, TITLE_MAX } from "@/modules/tasks/constants.ts";

interface TaskCardProps {
	task: Task;
	isEditing: boolean;
	onStartEdit: () => void;
	onCancelEdit: () => void;
	onSave: (patch: TaskPatch) => void;
	onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
																										task,
																										isEditing,
																										onStartEdit,
																										onCancelEdit,
																										onSave,
																										onDelete,
																									}) => {
	const [currentValue, setCurrentValue] = useState<Task>(() => task);

	const [dueOpen, setDueOpen] = useState(false);

	useEffect(() => {
		if (isEditing) setCurrentValue(task);
	}, [isEditing, task]);

	const handleChange = useCallback(<K extends keyof Task>(key: K, value: Task[K]) => {
		setCurrentValue((d) => ({...d, [key]: value}));
	}, []);

	const handleInputChange = useCallback(
		<K extends keyof Task>(key: K, parser: (v: string) => Task[K] = (v) => v as Task[K]) =>
			(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
				handleChange(key, parser(e.target.value)),
		[handleChange]
	);

	const titleLen = currentValue.title?.length ?? 0;
	const descLen = (currentValue.description ?? '').length;

	const titleTooLong = titleLen > TITLE_MAX;
	const descTooLong = descLen > DESC_MAX;
	const titleEmpty = currentValue.title.trim().length === 0;

	const canSubmit = !titleEmpty && !titleTooLong && !descTooLong;

	const handleSubmit = useCallback(
		(e?: React.FormEvent) => {
			e?.preventDefault?.();
			if (!canSubmit) return;
			const patch: TaskPatch = {
				title: currentValue.title.trim(),
				description: currentValue.description?.trim() || "",
				isComplete: currentValue.isComplete,
				priority: currentValue.priority ?? undefined,
				dueDate: currentValue.dueDate
			};

			console.log('patch', patch)
			onSave(patch);
		},
		[canSubmit, currentValue, onSave]
	);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onCancelEdit();
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
	};

	const due = getDueInfo(task.dueDate);

	return (
		<Card className="shadow-sm mt-6">
			<CardContent className="p-4 sm:p-5">
				{!isEditing ? (
					<div className="flex flex-col gap-3">
						<div className="flex items-start justify-between gap-3">
							<div className="w-full">


								<div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 w-full">
									<h3 className="order-2 sm:order-1 flex-1 min-w-0 sm:max-w-[75%] break-words">{task.title}</h3>
									{task.dueDate && (
										<Badge
											variant={(due?.past ? "destructive" : "secondary") as "destructive" | "secondary"}
											className="order-4 sm:order-2 shrink-0 sm:ml-auto"
										>
											<CalendarIcon className="h-3.5 w-3.5 shrink-0"/>
											<span className={due?.past ? "font-medium" : ""}>
												{due ? format(due.date, "MMM d, yyyy") : task.dueDate}
											</span>
										</Badge>
									)}
								</div>

								{task.description && (
									<p className="mt-1 text-sm text-muted-foreground whitespace-pre-line ">
										{task.description}
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-wrap justify-between">
							<div className="flex flex-wrap items-center gap-3 text-sm">
								{typeof task.priority !== "undefined" && (
									<span
										className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 capitalize text-muted-foreground">
        					Priority: {task.priority}
      					</span>
								)}

								<span
									className={`inline-flex items-center gap-1 ${
										task.isComplete ? "text-emerald-600" : "text-amber-600"
									}`}
								>
      					{task.isComplete ? (
									<CheckCircle2 className="h-4 w-4"/>
								) : (
									<Circle className="h-4 w-4"/>
								)}
									{task.isComplete ? "Completed" : "In progress"}
    					</span>
							</div>

							<div className="flex justify-end gap-2">
								{onDelete && (
									<Button variant="outline" onClick={onDelete}>
										Delete
									</Button>
								)}
								<Button variant="secondary" onClick={onStartEdit}>
									Edit
								</Button>
							</div>
						</div>
						{due?.past && !task.isComplete && (
							<div
								className="mt-1 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-sm text-destructive">
								<AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/>
								<span>
									{`Due date passed ${due.daysLate > 0 && " by"} ${due.daysLate} day${due.daysLate === 1 ? "" : "s"}`}.
									Update the date or mark as completed.
								</span>
							</div>
						)}
					</div>

				) : (
					<form onSubmit={handleSubmit} onKeyDown={onKeyDown} className="flex flex-col gap-4">

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
							<div className="sm:col-span-2">
								<Label htmlFor={`title-${task.id}`} className="">Title *</Label>
								<Input
									id={`title-${task.id}`}
									autoFocus
									type="text"
									onChange={handleInputChange("title")}
									required
									value={currentValue.title}
								/>

								<div className="flex justify-between text-xs">
									<span className={titleEmpty ? "text-destructive" : "text-muted-foreground"}>
										{titleEmpty ? "Title is required" : " "}
									</span>
									<span className={titleTooLong ? "text-destructive" : "text-muted-foreground"}>
										{titleLen}/{TITLE_MAX}
									</span>
								</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="due-date">Due date</Label>

							<div className="flex items-center gap-2">
								<Popover open={dueOpen} onOpenChange={setDueOpen}>
									<PopoverTrigger asChild>
										<Button
											id="due-date"
											variant="outline"
											className="w-40 justify-start"
										>
											<CalendarIcon className="mr-2 h-4 w-4 shrink-0"/>
												{currentValue.dueDate ? currentValue.dueDate : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>

										<PopoverContent className="p-0" align="start">
											<Calendar
												mode="single"
												selected={currentValue.dueDate ? ymdToLocalDate(currentValue.dueDate) : undefined}
												onSelect={(date) => {

													handleChange("dueDate", date ? format(date, "yyyy-MM-dd") : "")
													setDueOpen(false);
												}}
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									{currentValue.dueDate && (
										<Button
											type="button"
											variant="ghost"
											size="icon"
											aria-label="Clear date"
											onClick={() => handleChange("dueDate", "")}
										>
											<X className="h-4 w-4"/>
										</Button>
									)}
								</div>
							</div>
						</div>


						<div className="grid gap-2">
							<Label htmlFor={`desc-${task.id}`}>Description</Label>
							<Textarea
								id={`desc-${task.id}`}
								rows={3}
								value={currentValue.description ?? ""}
								onChange={handleInputChange("description")}
								placeholder="Optional details"
							/>
							<div id="description-help" className="flex justify-end text-xs">
								<span className={descTooLong ? "text-destructive" : "text-muted-foreground"}>
									{descLen}/{DESC_MAX}
								</span>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-4 md:gap-6 md:justify-between">
							<div className="flex items-center gap-4 md:order-0 order-1">
								<PrioritySwitcher
									id={`priority-${task.id}`}
									value={currentValue.priority}
									onChange={(p: Priority) => handleChange("priority", p)}
								/>
							</div>

							<div className="flex items-center gap-2 md:order-2 order-2">
								<Label htmlFor={`complete-${task.id}`} className="cursor-pointer">
									Complete
								</Label>
								<Switch
									id={`is-complete-${task.id}`}
									checked={currentValue.isComplete}
									onCheckedChange={(v) => handleChange("isComplete", v)}
								/>
							</div>

							<div className="w-full md:w-auto md:ml-auto md:order-3 order-3">
								<div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full justify-end mt-3 md:mt-0">
									<Button type="submit" disabled={!canSubmit} className="w-full md:w-auto">
										Save
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={onCancelEdit}
										className="w-full md:w-auto"
									>
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</form>
				)}
			</CardContent>
		</Card>
	);
};
