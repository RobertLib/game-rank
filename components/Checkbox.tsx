import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";

const Checkbox = ({
  label,
  onChange,
  value,
}: Readonly<{
  label?: string;
  onChange?: () => void;
  value?: boolean;
}>) => {
  const [isChecked, setIsChecked] = useState(value ?? false);

  const colorScheme = useColorScheme();

  const handlePress = () => {
    setIsChecked((prev) => !prev);
    onChange?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Ionicons
        color={colorScheme === "light" ? "#000" : "#fff"}
        name={isChecked ? "checkbox" : "square-outline"}
        size={24}
      />
      <ThemedText>{label}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});

export default Checkbox;
