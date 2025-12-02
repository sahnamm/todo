import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPriorityIcon, formatTime } from "../utils/helpers";
import { colors } from "../utils/constants";
import { Priority } from "../models/priority";

interface TaskItemProps {
  id: string;
  title: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  onToggle: () => void;
  onPress: () => void;
  isLast?: boolean;
}

function TaskItem({
  id,
  title,
  priority,
  dueDate,
  completed,
  onToggle,
  onPress,
  isLast = false,
}: TaskItemProps) {
  const icon = getPriorityIcon(priority);

  return (
    <Pressable 
      style={[
        styles.taskItem,
        !isLast && styles.taskItemBorder,
      ]} 
      onPress={onPress}
    >
      <View style={styles.taskLeft}>
        <View style={[styles.iconContainer, { backgroundColor: icon.color }]}>
          <Ionicons name={icon.name} size={24} color={colors.primary} />
        </View>
        <View style={styles.taskContent}>
          <Text
            style={[styles.taskTitle, completed && styles.completedTaskTitle]}
          >
            {title}
          </Text>
          <Text style={[styles.taskTime, completed && styles.completedTaskTime]}>
            {formatTime(dueDate)}
          </Text>
        </View>
      </View>
      
      <View style={styles.taskRight}>
        <Pressable
          style={({ pressed }) => [
            styles.checkbox,
            completed && styles.checkboxCompleted,
            pressed && styles.checkboxPressed,
          ]}
          onPress={onToggle}
        >
          {completed && (
            <Ionicons name="checkmark" size={20} color={colors.white} />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 16,
  },
  taskItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  completedTaskTitle: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  taskTime: {
    fontSize: 14,
    color: colors.textMedium,
    marginTop: 4,
  },
  completedTaskTime: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  taskRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderPurple,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
});
