import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/constants";
import { formatDateForInput, formatTimeForInput, formatDisplayDate, formatDisplayTime } from "../utils/helpers";
import FormField from "./FormField";
import CalendarPicker from "./CalendarPicker";
import TimePicker from "./TimePicker";

interface DateTimeInputsProps {
  dateValue: string;
  timeValue: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  dateError?: string;
  timeError?: string;
  selectedDate?: Date | null;
  selectedTime?: Date | null;
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (date: Date) => void;
}

function DateTimeInputs({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
  selectedDate: externalSelectedDate,
  selectedTime: externalSelectedTime,
  onDateSelect,
  onTimeSelect,
}: DateTimeInputsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);
  const [internalSelectedTime, setInternalSelectedTime] = useState<Date | null>(null);

  // Use external state if provided, otherwise use internal state
  const selectedDate = externalSelectedDate !== undefined ? externalSelectedDate : internalSelectedDate;
  const selectedTime = externalSelectedTime !== undefined ? externalSelectedTime : internalSelectedTime;

  const handleDateSelect = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    } else {
      setInternalSelectedDate(date);
    }
    onDateChange(formatDateForInput(date));
  };

  const handleTimeSelect = (date: Date) => {
    if (onTimeSelect) {
      onTimeSelect(date);
    } else {
      setInternalSelectedTime(date);
    }
    onTimeChange(formatTimeForInput(date));
  };

  return (
    <View style={styles.row}>
      <View style={styles.halfInput}>
        <FormField label="Date" error={dateError}>
          <Pressable
            style={({ pressed }) => [
              styles.pickerButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[
              styles.pickerButtonText,
              !selectedDate && styles.placeholderText
            ]}>
              {selectedDate ? formatDisplayDate(selectedDate) : "Select Date"}
            </Text>
            <Ionicons
              name="calendar"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </FormField>
      </View>

      <View style={styles.halfInput}>
        <FormField label="Time" error={timeError}>
          <Pressable
            style={({ pressed }) => [
              styles.pickerButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={[
              styles.pickerButtonText,
              !selectedTime && styles.placeholderText
            ]}>
              {selectedTime ? formatDisplayTime(selectedTime) : "Select Time"}
            </Text>
            <Ionicons
              name="time"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </FormField>
      </View>

      {/* Calendar Picker Modal */}
      <CalendarPicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={handleDateSelect}
        selectedDate={selectedDate}
      />

      {/* Time Picker Modal */}
      <TimePicker
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSelect={handleTimeSelect}
        selectedTime={selectedTime}
      />
    </View>
  );
}

export default DateTimeInputs;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  pickerButton: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    paddingTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerButtonText: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
  placeholderText: {
    color: colors.textLight,
  },
  pressed: {
    opacity: 0.7,
  },
});
