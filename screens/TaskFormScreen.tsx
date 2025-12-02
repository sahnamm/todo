import { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Task } from "../models/task";
import { Priority } from "../models/priority";
import { colors } from "../utils/constants";
import { formatDateForInput, formatTimeForInput } from "../utils/helpers";
import { loadTasks, saveTasks } from "../utils/storage";
import FormField from "../components/FormField";
import PrioritySelector from "../components/PrioritySelector";
import DateTimeInputs from "../components/DateTimeInputs";
import PrimaryButton from "../components/PrimaryButton";
import { NavigationProp, RouteProp } from "@react-navigation/native";

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  priority: Yup.string().required("Priority is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  notes: Yup.string(),
});

interface TaskFormScreenProps {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}

function TaskFormScreen({ route, navigation }: TaskFormScreenProps) {
  // Check if we have a task (edit mode) or not (add mode)
  const task = route.params?.task;
  const isEditMode = !!task;

  // State for date/time pickers
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    isEditMode ? new Date(task.dueDate) : null
  );
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    isEditMode ? new Date(task.dueDate) : null
  );

  const initialValues = isEditMode
    ? {
        title: task.title,
        priority: task.priority,
        date: formatDateForInput(task.dueDate),
        time: formatTimeForInput(task.dueDate),
        notes: task.notes || "",
      }
    : {
        title: "",
        priority: "",
        date: "",
        time: "",
        notes: "",
      };

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          // Load current tasks and filter out the deleted one
          const currentTasks = await loadTasks();
          const updatedTasks = currentTasks.filter((t) => t.id !== task.id);
          await saveTasks(updatedTasks);

          console.log("Task deleted:", task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    // Update navigation title based on mode
    navigation.setOptions({
      title: isEditMode ? "Edit Task" : "Add New Task",
      // Only show delete button in edit mode
      headerRight: isEditMode
        ? () => (
            <Pressable
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={24} color={colors.delete} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditMode]);

  const handleSubmit = async (values: typeof initialValues) => {
    const dateTimeString = `${values.date}T${values.time}`;
    const dueDate = new Date(dateTimeString);

    // Load current tasks from storage
    const currentTasks = await loadTasks();

    if (isEditMode) {
      // Create updated task
      const updatedTask = new Task(
        task.id,
        values.title,
        values.priority as Priority,
        dueDate,
        values.notes || null
      );
      // Preserve completed status
      if (task.completed) {
        updatedTask.toggle();
      }

      // Update in storage
      const updatedTasks = currentTasks.map((t) =>
        t.id === task.id ? updatedTask : t
      );
      await saveTasks(updatedTasks);

      console.log("Task updated and saved:", updatedTask);
      navigation.goBack();
    } else {
      // Create new task
      const newTask = new Task(
        Date.now().toString(),
        values.title,
        values.priority as Priority,
        dueDate,
        values.notes || null
      );

      // Add to storage
      await saveTasks([newTask, ...currentTasks]);

      console.log("New Task created and saved:", newTask);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Task Title */}
              <FormField
                label="Task Title"
                error={
                  touched.title && errors.title
                    ? String(errors.title)
                    : undefined
                }
              >
                <TextInput
                  style={styles.input}
                  placeholder="Task Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
              </FormField>

              {/* Priority */}
              <FormField
                label="Priority"
                error={
                  touched.priority && errors.priority
                    ? String(errors.priority)
                    : undefined
                }
              >
                <PrioritySelector
                  value={values.priority}
                  onChange={(priority: string) =>
                    setFieldValue("priority", priority)
                  }
                />
              </FormField>

              {/* Date and Time */}
              <DateTimeInputs
                dateValue={values.date}
                timeValue={values.time}
                onDateChange={(date: string) => setFieldValue("date", date)}
                onTimeChange={(time: string) => setFieldValue("time", time)}
                dateError={
                  touched.date && errors.date ? String(errors.date) : undefined
                }
                timeError={
                  touched.time && errors.time ? String(errors.time) : undefined
                }
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
              />

              {/* Notes */}
              <FormField label="Notes">
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Notes"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  onChangeText={handleChange("notes")}
                  onBlur={handleBlur("notes")}
                  value={values.notes}
                />
              </FormField>
            </ScrollView>

            {/* Fixed Save Button */}
            <PrimaryButton
              title={isEditMode ? "Save Changes" : "Create Task"}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

export default TaskFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});
