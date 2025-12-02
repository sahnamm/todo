export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

interface PriorityMetadata {
  label: string;
  color: string;
  iconColor: string;
}

const PRIORITY_METADATA: Record<Priority, PriorityMetadata> = {
  [Priority.LOW]: {
    label: "Low",
    color: "#C8E6C9",
    iconColor: "#2E7D32",
  },
  [Priority.MEDIUM]: {
    label: "Medium",
    color: "#FFF9C4",
    iconColor: "#F57C00",
  },
  [Priority.HIGH]: {
    label: "High",
    color: "#FFCDD2",
    iconColor: "#C62828",
  },
};

interface PriorityOption {
  value: Priority;
  label: string;
  color: string;
  iconColor: string;
}

// Get all priorities with their metadata
export function getPriorities(): PriorityOption[] {
  return (Object.values(Priority) as Priority[]).map((priority) => ({
    value: priority,
    ...PRIORITY_METADATA[priority],
  }));
}

