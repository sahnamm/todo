import { Task } from '../models/task';

export const DUMMY_TASKS: Task[] = [
  // Active Tasks
  new Task(
    '1',
    'Study lesson',
    'high',
    new Date(2024, 11, 2, 9, 0), // December 2, 2024, 9:00 AM
    'Chapter 5: Advanced React Native',
    false
  ),
  new Task(
    '2',
    'Run 5k',
    'medium',
    new Date(2024, 11, 2, 16, 0), // December 2, 2024, 4:00 PM
    'Don\'t forget running shoes!',
    false
  ),
  new Task(
    '3',
    'Team meeting',
    'high',
    new Date(2024, 11, 2, 14, 30), // December 2, 2024, 2:30 PM
    'Discuss project timeline and deliverables',
    false
  ),
  new Task(
    '4',
    'Grocery shopping',
    'low',
    new Date(2024, 11, 3, 10, 0), // December 3, 2024, 10:00 AM
    'Milk, eggs, bread, vegetables',
    false
  ),
  new Task(
    '5',
    'Submit report',
    'high',
    new Date(2024, 11, 2, 17, 0), // December 2, 2024, 5:00 PM
    'Q4 financial summary - due by end of day',
    false
  ),

  // Completed Tasks
  new Task(
    '6',
    'Morning workout',
    'medium',
    new Date(2024, 11, 1, 7, 0), // December 1, 2024, 7:00 AM
    '30 min cardio + stretching',
    true
  ),
  new Task(
    '7',
    'Take out trash',
    'low',
    new Date(2024, 11, 1, 8, 0), // December 1, 2024, 8:00 AM
    null,
    true
  ),
];
