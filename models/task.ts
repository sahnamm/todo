import { Priority } from "./priority";

export class Task {
  constructor(
    public id: string,
    public title: string,
    public priority: Priority,
    public dueDate: Date,
    public notes: string | null = null,
    public completed: boolean = false
  ) {}

  // Helper method untuk toggle completion
  toggle(): void {
    this.completed = !this.completed;
  }

  // Check if overdue
  isOverdue(): boolean {
    return this.dueDate < new Date() && !this.completed;
  }
}
