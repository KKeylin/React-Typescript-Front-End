// TODO: Create the TaskForm component
// Requirements:
// - Form fields: title (required), description (optional), priority dropdown, due date
// - Form validation with error messages
// - Handle form submission
// - Clear form after successful submission
// - Use controlled components

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultTaskId, NewTask, Priority, Task } from "../model/types.ts";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import PrioritySwitcher from "@/modules/tasks/ui/PrioritySwitcher.tsx";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { toYMD, ymdToLocalDate } from "@/lib/date";
import { DESC_MAX, TITLE_MAX } from "@/modules/tasks/constants.ts";

interface TaskFormProps {
	tasks: Task[];
	onCreate: (data: NewTask) => void;
	onCancel?: () => void;
}

const defaultNewTask = (): Task => ({
	id: defaultTaskId,
	title: '',
	description: '',
	priority: Priority.Low,
	isComplete: false,
	dueDate: '',
	createdAt: '',
	updatedAt: ''
});

export const TaskForm = ({
													 tasks,
													 onCreate, onCancel,
												 }: TaskFormProps) => {

	const [currentValue, setCurrentValue] = useState<Task>(() => defaultNewTask());
	const [dueOpen, setDueOpen] = useState(false);

	useEffect(() => {
		setCurrentValue(defaultNewTask());
	}, [setCurrentValue, tasks]);

	const titleLen = currentValue.title?.length ?? 0;
	const descLen = (currentValue.description ?? '').length;

	const titleTooLong = titleLen > TITLE_MAX;
	const descTooLong = descLen > DESC_MAX;
	const titleEmpty = currentValue.title.trim().length === 0;

	const canSubmit = !titleEmpty && !titleTooLong && !descTooLong;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;

		onCreate({
			isComplete: currentValue.isComplete,
			title: currentValue.title.trim(),
			description: currentValue.description?.trim() || '',
			priority: currentValue.priority ?? undefined,
			dueDate: currentValue.dueDate
		});

	}

	const handleChange = <K extends keyof Task>(key: K, value: Task[K]) => {
		setCurrentValue(d => ({...d, [key]: value}));
	};

	const handleInputChange = <K extends keyof Task>(
		key: K,
		parser: (v: string) => Task[K] = v => v as Task[K]
	) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			handleChange(key, parser(e.target.value));
		};

	return (

		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Add New Task</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start mb-2">
							<div className="sm:col-span-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									autoFocus
									type="text"
									onChange={handleInputChange("title")}
									required
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
												aria-expanded={dueOpen}
											>
												<CalendarIcon className="mr-2 h-4 w-4 shrink-0"/>
												{currentValue.dueDate ? currentValue.dueDate : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>

										<PopoverContent
											className="p-0"
											align="start"
											onEscapeKeyDown={() => setDueOpen(false)}
											onPointerDownOutside={() => setDueOpen(false)}
										>
											<Calendar
												mode="single"
												selected={currentValue.dueDate ? ymdToLocalDate(currentValue.dueDate) : undefined}
												onSelect={(date) => {
													handleChange("dueDate", date ? toYMD(date) : "");
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

						<div className="grid gap-2 mb-4">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Optional details"
								rows={3}
								onChange={handleInputChange("description")}
							/>
							<div id="description-help" className="flex justify-end text-xs">
								<span className={descTooLong ? "text-destructive" : "text-muted-foreground"}>
									{descLen}/{DESC_MAX}
								</span>
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-4 md:gap-6 md:justify-between mb-4">
							<div className="flex items-center gap-4 md:order-0 order-1">
								<PrioritySwitcher
									value={currentValue.priority}
									id="priority"
									onChange={(e) => handleChange("priority", e)}
								/>
							</div>
							<div className="flex items-center gap-2 md:order-2 order-2">
								<div className="flex space-x-2 items-center">
									<Label htmlFor="is-completeis">Complete</Label>
									<Switch id="airplane-mode"
													onCheckedChange={() => handleChange("isComplete", !currentValue.isComplete)}
													checked={currentValue.isComplete}/>
								</div>
							</div>
							<div className="w-full md:w-auto md:ml-auto md:order-3 order-3">
								<div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full justify-end mt-3 md:mt-0">
									<Button className="w-full" type="submit" disabled={!canSubmit} onClick={handleSubmit}>Add
										Task</Button>
									<Button className="w-full" type="button" variant="outline" onClick={onCancel}>Cancel</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
