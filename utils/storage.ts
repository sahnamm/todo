import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../models/task";
import { Priority } from "../models/priority";

const TASKS_KEY = "todo_tasks";

export interface StoredTask {
  id: string;
  title: string;
  priority: Priority | string; // string for backward compatibility with stored data
  dueDate: string;
  notes: string | null;
  completed: boolean;
}

// Convert Task to storable format
const taskToStorable = (task: Task): StoredTask => ({
  id: task.id,
  title: task.title,
  priority: task.priority,
  dueDate: task.dueDate.toISOString(),
  notes: task.notes,
  completed: task.completed,
});

// Convert stored data back to Task
const storableToTask = (stored: StoredTask): Task => {
  const task = new Task(
    stored.id,
    stored.title,
    stored.priority as Priority, // Cast to Priority enum
    new Date(stored.dueDate),
    stored.notes
  );
  if (stored.completed) {
    task.toggle();
  }
  return task;
};

// Save all tasks to storage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const storable = tasks.map(taskToStorable);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(storable));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// Load all tasks from storage
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    if (data) {
      const stored: StoredTask[] = JSON.parse(data);
      return stored.map(storableToTask);
    }
    return [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

// Clear all tasks from storage
export const clearTasks = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error("Error clearing tasks:", error);
  }
};

