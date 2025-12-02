import { useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Task } from "../models/task";
import TaskPreviewModal from "../components/TaskPreviewModal";
import TaskSection from "../components/TaskSection";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../utils/constants";
import { loadTasks, saveTasks } from "../utils/storage";

interface TodoListScreenProps {
  navigation: NavigationProp<any>;
}

function TodoListScreen({ navigation }: TodoListScreenProps) {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from storage whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        console.log("Loading tasks from storage...");
        const storedTasks = await loadTasks();
        console.log("Loaded tasks:", storedTasks.length);
        setTasks(storedTasks);
        setIsLoading(false);
      };
      loadData();
    }, [])
  );

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // Create new task object
        const newTask = new Task(
          task.id,
          task.title,
          task.priority,
          task.dueDate,
          task.notes
        );
        // Toggle to opposite state
        if (!task.completed) {
          newTask.toggle();
        }
        return newTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setPreviewModalVisible(true);
  };

  const handleToggleFromModal = () => {
    if (selectedTask) {
      toggleTask(selectedTask.id);
    }
  };

  const handleAddTask = () => {
    navigation.navigate("TaskForm");
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>My Todo List</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>My Todo List</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Active Tasks */}
        <TaskSection
          title="Todo"
          tasks={activeTasks}
          emptyStateIcon="checkmark-done-circle-outline"
          emptyStateText="No tasks yet"
          emptyStateSubtext='Tap "Add New Task" to get started'
          onToggle={toggleTask}
          onPress={handleTaskPress}
        />

        {/* Completed Tasks */}
        <TaskSection
          title="Completed"
          tasks={completedTasks}
          emptyStateIcon="time-outline"
          emptyStateText="No completed tasks"
          emptyStateSubtext="Complete a task to see it here"
          onToggle={toggleTask}
          onPress={handleTaskPress}
        />
      </ScrollView>

      {/* Add Button */}
      <PrimaryButton title="Add New Task" onPress={handleAddTask} />

      {/* Task Preview Modal */}
      <TaskPreviewModal
        visible={previewModalVisible}
        onClose={() => setPreviewModalVisible(false)}
        task={selectedTask as Task}
        onToggle={handleToggleFromModal}
      />
    </SafeAreaView>
  );
}

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});
