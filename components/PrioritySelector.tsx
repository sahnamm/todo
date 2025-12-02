import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/constants";
import { Priority, getPriorities } from "../models/priority";

interface PrioritySelectorProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  const priorities = getPriorities();

  return (
    <View style={styles.container}>
      {priorities.map((priority) => (
        <Pressable
          key={priority.value}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: priority.color },
            value === priority.value && styles.selected,
            pressed && styles.pressed,
          ]}
          onPress={() => onChange(priority.value)}
        >
          <Ionicons
            name="flag-outline"
            size={28}
            color={priority.iconColor}
          />
          <Text style={styles.label}>{priority.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default PrioritySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    width: 85,
    height: 75,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textDark,
    marginTop: 4,
  },
});

