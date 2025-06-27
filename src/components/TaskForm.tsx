// TODO: Create the TaskForm component
// Requirements:
// - Form fields: title (required), description (optional), priority dropdown, due date
// - Form validation with error messages
// - Handle form submission
// - Clear form after successful submission
// - Use controlled components

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskFormProps {
  // Define your props here
}

export const TaskForm = ({ }: TaskFormProps) => {
  // TODO: Add form state management

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement form fields here */}
        <div className="space-y-4">
          <div>
            <Input placeholder="Task title..." />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">Add Task</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};