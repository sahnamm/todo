import { StyleSheet, Text, View, Pressable, StyleProp, ViewStyle } from "react-native";
import { colors } from "../utils/constants";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
