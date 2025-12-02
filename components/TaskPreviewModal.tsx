import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/constants";
import { formatDate, formatTime, getPriorityIcon } from "../utils/helpers";
import { Task } from "../models/task";
import { getPriorities, Priority } from "../models/priority";
interface TaskPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
  onToggle: () => void;
}

function TaskPreviewModal({ visible, onClose, task, onToggle }: TaskPreviewModalProps) {
  const navigation: any = useNavigation();

  if (!task) return null;

  const priorities = getPriorities();

  const icon = getPriorityIcon(task.priority);

  const handleEdit = () => {
    onClose();
    navigation.navigate("TaskForm", { task });
  };

  const handleToggle = () => {
    onToggle();
    onClose();
  };

  const getPriorityLabel = (priority: Priority) => {
    return priorities.find(p => p.value === priority)?.label;
  };

  const getPriorityColor = (priority: Priority) => {
    return priorities.find(p => p.value === priority)?.color;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconBadge, { backgroundColor: icon.color }]}>
              <Ionicons name={icon.name} size={20} color={colors.primary} />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color={colors.textMedium} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <Text
              style={[styles.title, task.completed && styles.titleCompleted]}
            >
              {task.title}
            </Text>

            {/* Priority */}
            <View style={styles.infoRow}>
              <Ionicons
                name="flag"
                size={16}
                color={getPriorityColor(task.priority)}
              />
              <Text
                style={[
                  styles.infoText,
                  { color: getPriorityColor(task.priority) },
                ]}
              >
                {getPriorityLabel(task.priority)} Priority
              </Text>
            </View>

            {/* Date & Time */}
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.textMedium} />
              <Text style={styles.infoText}>
                {formatDate(task.dueDate)} at {formatTime(task.dueDate)}
              </Text>
            </View>

            {/* Notes */}
            {task.notes && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{task.notes}</Text>
              </View>
            )}

            {!task.notes && <Text style={styles.noNotes}>No notes added</Text>}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.toggleButton,
                task.completed && styles.toggleButtonCompleted,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleToggle}
            >
              <Ionicons
                name={
                  task.completed
                    ? "close-circle-outline"
                    : "checkmark-circle-outline"
                }
                size={20}
                color={task.completed ? colors.textMedium : colors.primary}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  task.completed && styles.toggleButtonTextCompleted,
                ]}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.editButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleEdit}
            >
              <Ionicons name="create-outline" size={20} color={colors.white} />
              <Text style={styles.editButtonText}>Edit Task</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default TaskPreviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 20,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.textMedium,
    marginLeft: 8,
  },
  notesSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMedium,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
  },
  noNotes: {
    fontSize: 14,
    color: colors.gray,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    gap: 6,
  },
  toggleButton: {
    backgroundColor: colors.backgroundPurple,
  },
  toggleButtonCompleted: {
    backgroundColor: colors.lightGray,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  toggleButtonTextCompleted: {
    color: colors.textMedium,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
});
