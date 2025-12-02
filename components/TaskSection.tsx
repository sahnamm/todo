import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/constants";
import TaskItem from "./TaskItem";
import { Task } from "../models/task";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  emptyStateIcon: string;
  emptyStateText: string | undefined;
  emptyStateSubtext: string | undefined;
  onToggle: (id: string) => void;
  onPress: (task: Task) => void;
}

function TaskSection({
  title,
  tasks,
  emptyStateIcon,
  emptyStateText,
  emptyStateSubtext,
  onToggle,
  onPress,
}: TaskSectionProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.tasksContainer}>
        {tasks.length > 0 ? (
          <View style={styles.tasksGroup}>
            {tasks.map((task: Task, index: number) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                dueDate={task.dueDate}
                completed={task.completed}
                onToggle={() => onToggle(task.id)}
                onPress={() => onPress(task)}
                isLast={index === tasks.length - 1}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name={emptyStateIcon as any} size={48} color={colors.borderPurple} />
            <Text style={styles.emptyStateText}>{emptyStateText}</Text>
            <Text style={styles.emptyStateSubtext}>{emptyStateSubtext}</Text>
          </View>
        )}
      </View>
    </>
  );
}

export default TaskSection;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tasksContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tasksGroup: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textVeryLight,
    textAlign: "center",
  },
});
