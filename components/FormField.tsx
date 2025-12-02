import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/constants";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 0,
    marginLeft: 4,
  },
});
