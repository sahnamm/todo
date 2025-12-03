import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors } from "../utils/constants";

interface CalendarPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedDate: Date | null;
  minimumDate?: Date;
}

function CalendarPicker({
  visible,
  onClose,
  onSelect,
  selectedDate,
  minimumDate,
}: CalendarPickerProps) {
  // State is automatically reset when key prop changes (handled by parent)
  // No need for useEffect or manual reset logic - the key prop ensures fresh state
  const [tempDate, setTempDate] = useState<Date>(selectedDate || new Date());

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      // Android: picker closes automatically
      if (event.type === "set" && date) {
        onSelect(date);
      }
      onClose();
    } else {
      // iOS: update temp date, user must confirm
      if (date) {
        setTempDate(date);
      }
    }
  };

  const handleConfirm = () => {
    onSelect(tempDate);
    onClose();
  };

  // Android: render picker directly (it shows as a dialog)
  if (Platform.OS === "android") {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="default"
        onChange={handleChange}
        minimumDate={minimumDate || new Date()}
      />
    );
  }

  // iOS: wrap in modal with confirm/cancel buttons
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Date</Text>

          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={handleChange}
            minimumDate={minimumDate || new Date()}
            style={styles.picker}
          />

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.confirmBtn,
                pressed && styles.pressed,
              ]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CalendarPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 350,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
    textAlign: "center",
    marginBottom: 10,
  },
  picker: {
    height: 200,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 16,
    color: colors.textMedium,
  },
  confirmBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  confirmBtnText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
