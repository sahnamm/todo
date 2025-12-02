import { useEffect, useState } from "react";
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

interface TimePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedTime: Date | null;
}

function TimePicker({
  visible,
  onClose,
  onSelect,
  selectedTime,
}: TimePickerProps) {
  const getInitialTime = () => {
    if (selectedTime) return selectedTime;
    const now = new Date();
    now.setHours(9, 0, 0, 0);
    return now;
  };

  const [tempTime, setTempTime] = useState<Date>(getInitialTime());

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      // Android: picker closes automatically
      if (event.type === "set" && date) {
        onSelect(date);
      }
      onClose();
    } else {
      // iOS: update temp time, user must confirm
      if (date) {
        setTempTime(date);
      }
    }
  };

  const handleConfirm = () => {
    onSelect(tempTime);
    onClose();
  };

  // Reset temp time when modal opens
  useEffect(() => {
    if (visible) {
      setTempTime(getInitialTime());
    }
  }, [visible, selectedTime]);

  // Android: render picker directly (it shows as a dialog)
  if (Platform.OS === "android") {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={tempTime}
        mode="time"
        display="default"
        onChange={handleChange}
        is24Hour={false}
      />
    );
  }

  // iOS: wrap in modal with confirm/cancel buttons
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Time</Text>

          <DateTimePicker
            value={tempTime}
            mode="time"
            display="spinner"
            onChange={handleChange}
            is24Hour={false}
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

export default TimePicker;

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
