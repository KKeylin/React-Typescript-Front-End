import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TaskStatusLabel, taskStatusOptions } from "../model/types.ts";
import { Label } from "@/components/ui/label";

const PrioritySwitcher = ({value, onChange, id}) => {
	return (
		<>
			<Label htmlFor={id}>Priority</Label>

			<DropdownMenu id={id}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="w-48 justify-between"
					>
      <span className="truncate whitespace-nowrap overflow-hidden">
        {TaskStatusLabel[value]}
      </span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-48">
					<DropdownMenuRadioGroup value={value} onValueChange={onChange}>
						{taskStatusOptions.map(({value, label}) => (
							<DropdownMenuRadioItem key={value} value={value}>
								{label}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

export default PrioritySwitcher;
